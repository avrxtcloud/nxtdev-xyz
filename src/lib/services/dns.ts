import { randomUUID } from "node:crypto";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { audit } from "@/lib/audit";
import { createDnsRecord, deleteDnsRecord, updateDnsRecord } from "@/lib/cloudflare/dns";
import type { CreateCfRecordInput } from "@/lib/cloudflare/dns";
import { env } from "@/lib/env";
import { assertNotRateLimited } from "@/lib/rateLimit";
import { checkAbuseIpdb } from "@/lib/safety/abuseipdb";
import { matchesPhishingKeyword } from "@/lib/safety/keywords";
import { bumpRiskScore } from "@/lib/safety/risk";
import { isDelegationEnabled, suspendSubdomain } from "@/lib/services/subdomains";
import { assertFqdnWithinBase, fqdnForHost } from "@/lib/validators/domain";
import {
  assertProxiedAllowed,
  createRecordSchema,
  normalizeTtl,
  type CreateRecordInput,
} from "@/lib/validators/dns";

function requireActiveSubdomain(status: string) {
  if (status !== "active") throw new Error("Subdomain is suspended");
}

async function enforceRecordLimit(subdomainId: string) {
  const [{ count: recordCount, error: recordError }, { count: delegatedCount, error: delegatedError }] =
    await Promise.all([
      supabaseAdmin
        .from("DnsRecord")
        .select("id", { head: true, count: "exact" })
        .eq("subdomainId", subdomainId),
      supabaseAdmin
        .from("DelegatedNameserver")
        .select("id", { head: true, count: "exact" })
        .eq("subdomainId", subdomainId),
    ]);

  if (recordError) throw new Error(recordError.message);
  if (delegatedError) throw new Error(delegatedError.message);

  if ((recordCount ?? 0) + (delegatedCount ?? 0) >= 100) {
    throw new Error("Record limit reached (max 100)");
  }
}

async function maybeSuspendAndPurge(params: {
  subdomainId: string;
  actorUserId: string | null;
  reason: string;
}) {
  const { data: sub, error } = await supabaseAdmin
    .from("Subdomain")
    .select("id,riskScore,status")
    .eq("id", params.subdomainId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!sub) return;
  if (sub.riskScore < env.RISK_SUSPEND_THRESHOLD) return;
  if (sub.status === "suspended") return;

  await suspendSubdomain({
    subdomainId: params.subdomainId,
    actorUserId: params.actorUserId,
    reason: params.reason,
  });

  const [{ data: dnsRows, error: dnsError }, { data: delegatedRows, error: delegatedError }] =
    await Promise.all([
      supabaseAdmin
        .from("DnsRecord")
        .select("cloudflareRecordId")
        .eq("subdomainId", params.subdomainId),
      supabaseAdmin
        .from("DelegatedNameserver")
        .select("cloudflareRecordId")
        .eq("subdomainId", params.subdomainId),
    ]);
  if (dnsError) throw new Error(dnsError.message);
  if (delegatedError) throw new Error(delegatedError.message);

  await Promise.all([
    supabaseAdmin.from("DnsRecord").delete().eq("subdomainId", params.subdomainId),
    supabaseAdmin
      .from("DelegatedNameserver")
      .delete()
      .eq("subdomainId", params.subdomainId),
  ]);

  const ids = [
    ...(dnsRows ?? []).map((r) => r.cloudflareRecordId as string),
    ...(delegatedRows ?? []).map((r) => r.cloudflareRecordId as string),
  ];

  await Promise.allSettled(ids.map((id) => deleteDnsRecord(id)));

  await audit({
    actorUserId: params.actorUserId,
    action: "subdomain.purge_records",
    targetType: "subdomain",
    targetId: params.subdomainId,
    metadata: { count: ids.length },
  });
}

function computeFqdnForInput(input: CreateRecordInput, baseFqdn: string): string {
  if (input.type === "SRV") {
    const baseName = fqdnForHost(input.host, baseFqdn);
    return `${input.service}.${input.proto}.${baseName}`;
  }
  return fqdnForHost(input.host, baseFqdn);
}

function buildCloudflareCreatePayload(
  input: CreateRecordInput,
  baseFqdn: string,
): CreateCfRecordInput {
  const ttl = normalizeTtl(input.ttl);
  const fqdn = computeFqdnForInput(input, baseFqdn);

  switch (input.type) {
    case "SRV": {
      const baseName = fqdnForHost(input.host, baseFqdn);
      return {
        type: "SRV",
        name: fqdn,
        ttl,
        data: {
          service: input.service,
          proto: input.proto,
          name: baseName,
          priority: input.priority,
          weight: input.weight,
          port: input.port,
          target: input.target,
        },
      };
    }
    case "MX":
      return {
        type: "MX",
        name: fqdn,
        content: input.content,
        ttl,
        priority: input.priority,
      };
    case "A":
    case "AAAA":
    case "CNAME":
      return {
        type: input.type,
        name: fqdn,
        content: input.content,
        ttl,
        proxied: input.proxied ?? false,
      };
    case "TXT":
      return { type: "TXT", name: fqdn, content: input.content, ttl };
    case "NS":
      return { type: "NS", name: fqdn, content: input.content, ttl };
    default: {
      const exhaustive: never = input;
      return exhaustive;
    }
  }
}

async function getOwnedSubdomainForDns(params: { subdomainId: string; userId: string }) {
  const { data, error } = await supabaseAdmin
    .from("Subdomain")
    .select("*")
    .eq("id", params.subdomainId)
    .eq("userId", params.userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Subdomain not found");
  return data;
}

export async function createUserDnsRecord(params: {
  actorUserId: string;
  userId: string;
  subdomainId: string;
  input: unknown;
}) {
  await assertNotRateLimited({
    actorUserId: params.actorUserId,
    actionPrefix: "dns.",
    maxPerHour: 60,
  });

  const parsed = createRecordSchema.safeParse(params.input);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid record");
  const input = parsed.data;

  if (input.type === "NS") {
    throw new Error("NS records can only be managed in Nameserver Settings");
  }

  const subdomain = await getOwnedSubdomainForDns({
    subdomainId: params.subdomainId,
    userId: params.userId,
  });

  requireActiveSubdomain(subdomain.status);

  if (await isDelegationEnabled(subdomain.id)) {
    throw new Error("DNS editing is disabled while delegation is enabled");
  }

  await enforceRecordLimit(subdomain.id);

  const proxied = "proxied" in input ? input.proxied : undefined;
  assertProxiedAllowed(input.type, proxied);

  const fqdn = computeFqdnForInput(input, subdomain.baseFqdn);
  assertFqdnWithinBase(fqdn, subdomain.baseFqdn);

  const contentForKeyword =
    input.type === "SRV"
      ? input.target
      : input.type === "MX"
        ? input.content
        : input.type === "TXT" || input.type === "CNAME" || input.type === "A" || input.type === "AAAA"
          ? input.content
          : "";

  const keyword =
    matchesPhishingKeyword(input.host) ??
    matchesPhishingKeyword(fqdn) ??
    matchesPhishingKeyword(contentForKeyword);
  if (keyword) {
    await bumpRiskScore({
      subdomainId: subdomain.id,
      actorUserId: params.actorUserId,
      delta: 10,
      reason: "blocked_keyword_record",
      metadata: { keyword, fqdn, type: input.type },
    });
    await maybeSuspendAndPurge({
      subdomainId: subdomain.id,
      actorUserId: params.actorUserId,
      reason: "keyword_block",
    });
    throw new Error("Record blocked by safety policy");
  }

  if (input.type === "A" || input.type === "AAAA") {
    const result = await checkAbuseIpdb(input.content);
    if (result.abuseConfidenceScore >= env.ABUSEIPDB_THRESHOLD) {
      await bumpRiskScore({
        subdomainId: subdomain.id,
        actorUserId: params.actorUserId,
        delta: 20,
        reason: "abuseipdb_block",
        metadata: { ip: input.content, score: result.abuseConfidenceScore },
      });
      await maybeSuspendAndPurge({
        subdomainId: subdomain.id,
        actorUserId: params.actorUserId,
        reason: "abuseipdb_block",
      });
      throw new Error("IP blocked by reputation check");
    }
  }

  const cfPayload = buildCloudflareCreatePayload(input, subdomain.baseFqdn);
  const created = await createDnsRecord(cfPayload);

  const ttl = normalizeTtl(input.ttl);
  const priority = input.type === "MX" ? input.priority : null;
  const data =
    input.type === "SRV"
      ? {
          service: input.service,
          proto: input.proto,
          priority: input.priority,
          weight: input.weight,
          port: input.port,
          target: input.target,
        }
      : null;
  const content = input.type === "SRV" ? input.target : input.content;
  const proxiedForDb =
    input.type === "A" || input.type === "AAAA" || input.type === "CNAME"
      ? input.proxied ?? false
      : null;

  const now = new Date().toISOString();
  const { data: db, error: dbError } = await supabaseAdmin
    .from("DnsRecord")
    .insert({
      id: randomUUID(),
      subdomainId: subdomain.id,
      cloudflareRecordId: created.id,
      type: input.type,
      host: input.host,
      fqdn,
      content,
      ttl,
      priority,
      proxied: proxiedForDb,
      data,
      createdAt: now,
      updatedAt: now,
    })
    .select("*")
    .single();
  if (dbError) throw new Error(dbError.message);

  await audit({
    actorUserId: params.actorUserId,
    action: "dns.create",
    targetType: "dns_record",
    targetId: db.id,
    metadata: { fqdn, type: input.type },
  });

  return db;
}

export async function updateUserDnsRecord(params: {
  actorUserId: string;
  userId: string;
  subdomainId: string;
  recordId: string;
  input: unknown;
}) {
  await assertNotRateLimited({
    actorUserId: params.actorUserId,
    actionPrefix: "dns.",
    maxPerHour: 60,
  });

  const subdomain = await getOwnedSubdomainForDns({
    subdomainId: params.subdomainId,
    userId: params.userId,
  });
  requireActiveSubdomain(subdomain.status);

  if (await isDelegationEnabled(subdomain.id)) {
    throw new Error("DNS editing is disabled while delegation is enabled");
  }

  const { data: record, error: recordError } = await supabaseAdmin
    .from("DnsRecord")
    .select("*")
    .eq("id", params.recordId)
    .eq("subdomainId", params.subdomainId)
    .maybeSingle();
  if (recordError) throw new Error(recordError.message);
  if (!record) throw new Error("Record not found");

  const parsed = createRecordSchema.safeParse(params.input);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid record");
  const input = parsed.data;

  if (input.type !== record.type) throw new Error("Record type cannot be changed");
  if (input.type === "NS") throw new Error("NS records cannot be edited here");

  const proxied = "proxied" in input ? input.proxied : undefined;
  assertProxiedAllowed(input.type, proxied);

  const fqdn = computeFqdnForInput(input, subdomain.baseFqdn);
  assertFqdnWithinBase(fqdn, subdomain.baseFqdn);

  const contentForKeyword =
    input.type === "SRV"
      ? input.target
      : input.type === "MX"
        ? input.content
        : input.type === "TXT" || input.type === "CNAME" || input.type === "A" || input.type === "AAAA"
          ? input.content
          : "";

  const keyword =
    matchesPhishingKeyword(input.host) ??
    matchesPhishingKeyword(fqdn) ??
    matchesPhishingKeyword(contentForKeyword);
  if (keyword) {
    await bumpRiskScore({
      subdomainId: subdomain.id,
      actorUserId: params.actorUserId,
      delta: 10,
      reason: "blocked_keyword_record_update",
      metadata: { keyword, fqdn, type: input.type },
    });
    await maybeSuspendAndPurge({
      subdomainId: subdomain.id,
      actorUserId: params.actorUserId,
      reason: "keyword_block",
    });
    throw new Error("Record blocked by safety policy");
  }

  if (input.type === "A" || input.type === "AAAA") {
    const result = await checkAbuseIpdb(input.content);
    if (result.abuseConfidenceScore >= env.ABUSEIPDB_THRESHOLD) {
      await bumpRiskScore({
        subdomainId: subdomain.id,
        actorUserId: params.actorUserId,
        delta: 20,
        reason: "abuseipdb_block_update",
        metadata: { ip: input.content, score: result.abuseConfidenceScore },
      });
      await maybeSuspendAndPurge({
        subdomainId: subdomain.id,
        actorUserId: params.actorUserId,
        reason: "abuseipdb_block",
      });
      throw new Error("IP blocked by reputation check");
    }
  }

  const cfPayload = buildCloudflareCreatePayload(input, subdomain.baseFqdn);
  const updatedCf = await updateDnsRecord(record.cloudflareRecordId, cfPayload);

  const ttl = normalizeTtl(input.ttl);
  const priority = input.type === "MX" ? input.priority : null;
  const data =
    input.type === "SRV"
      ? {
          service: input.service,
          proto: input.proto,
          priority: input.priority,
          weight: input.weight,
          port: input.port,
          target: input.target,
        }
      : null;
  const content = input.type === "SRV" ? input.target : input.content;
  const proxiedForDb =
    input.type === "A" || input.type === "AAAA" || input.type === "CNAME"
      ? input.proxied ?? false
      : null;

  const { data: db, error: dbError } = await supabaseAdmin
    .from("DnsRecord")
    .update({
      host: input.host,
      fqdn,
      content,
      ttl,
      priority,
      proxied: proxiedForDb,
      data,
      cloudflareRecordId: updatedCf.id,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", record.id)
    .select("*")
    .single();
  if (dbError) throw new Error(dbError.message);

  await audit({
    actorUserId: params.actorUserId,
    action: "dns.update",
    targetType: "dns_record",
    targetId: db.id,
    metadata: { fqdn, type: db.type },
  });

  return db;
}

export async function deleteUserDnsRecord(params: {
  actorUserId: string;
  userId: string;
  subdomainId: string;
  recordId: string;
}) {
  await assertNotRateLimited({
    actorUserId: params.actorUserId,
    actionPrefix: "dns.",
    maxPerHour: 120,
  });

  const subdomain = await getOwnedSubdomainForDns({
    subdomainId: params.subdomainId,
    userId: params.userId,
  });
  requireActiveSubdomain(subdomain.status);

  if (await isDelegationEnabled(subdomain.id)) {
    throw new Error("DNS editing is disabled while delegation is enabled");
  }

  const { data: record, error: recordError } = await supabaseAdmin
    .from("DnsRecord")
    .select("*")
    .eq("id", params.recordId)
    .eq("subdomainId", params.subdomainId)
    .maybeSingle();
  if (recordError) throw new Error(recordError.message);
  if (!record) throw new Error("Record not found");

  await Promise.allSettled([deleteDnsRecord(record.cloudflareRecordId)]);
  const { error: deleteError } = await supabaseAdmin
    .from("DnsRecord")
    .delete()
    .eq("id", record.id);
  if (deleteError) throw new Error(deleteError.message);

  await audit({
    actorUserId: params.actorUserId,
    action: "dns.delete",
    targetType: "dns_record",
    targetId: record.id,
    metadata: { fqdn: record.fqdn, type: record.type },
  });
}

export async function addDelegatedNameserver(params: {
  actorUserId: string;
  userId: string;
  subdomainId: string;
  nameserver: string;
}) {
  await assertNotRateLimited({
    actorUserId: params.actorUserId,
    actionPrefix: "dns.delegation",
    maxPerHour: 30,
  });

  const subdomain = await getOwnedSubdomainForDns({
    subdomainId: params.subdomainId,
    userId: params.userId,
  });
  requireActiveSubdomain(subdomain.status);

  await enforceRecordLimit(subdomain.id);

  const ns = params.nameserver.trim().toLowerCase();
  if (!/^[a-z0-9.-]+$/.test(ns) || ns.includes("..")) throw new Error("Invalid nameserver");

  const created = await createDnsRecord({
    type: "NS",
    name: subdomain.baseFqdn,
    content: ns,
    ttl: 3600,
  });

  const now = new Date().toISOString();
  const { data: db, error: dbError } = await supabaseAdmin
    .from("DelegatedNameserver")
    .insert({
      id: randomUUID(),
      subdomainId: subdomain.id,
      nameserver: ns,
      cloudflareRecordId: created.id,
      createdAt: now,
    })
    .select("*")
    .single();
  if (dbError) throw new Error(dbError.message);

  await audit({
    actorUserId: params.actorUserId,
    action: "dns.delegation.add",
    targetType: "delegated_ns",
    targetId: db.id,
    metadata: { baseFqdn: subdomain.baseFqdn, nameserver: ns },
  });

  return db;
}

export async function removeDelegatedNameserver(params: {
  actorUserId: string;
  userId: string;
  subdomainId: string;
  delegatedId: string;
}) {
  const subdomain = await getOwnedSubdomainForDns({
    subdomainId: params.subdomainId,
    userId: params.userId,
  });
  requireActiveSubdomain(subdomain.status);

  const { data: item, error: itemError } = await supabaseAdmin
    .from("DelegatedNameserver")
    .select("*")
    .eq("id", params.delegatedId)
    .eq("subdomainId", params.subdomainId)
    .maybeSingle();
  if (itemError) throw new Error(itemError.message);
  if (!item) throw new Error("Nameserver not found");

  await Promise.allSettled([deleteDnsRecord(item.cloudflareRecordId)]);
  const { error: deleteError } = await supabaseAdmin
    .from("DelegatedNameserver")
    .delete()
    .eq("id", item.id);
  if (deleteError) throw new Error(deleteError.message);

  await audit({
    actorUserId: params.actorUserId,
    action: "dns.delegation.remove",
    targetType: "delegated_ns",
    targetId: item.id,
    metadata: { baseFqdn: subdomain.baseFqdn, nameserver: item.nameserver },
  });
}

export async function switchBackToDefaultDns(params: {
  actorUserId: string;
  userId: string;
  subdomainId: string;
}) {
  await getOwnedSubdomainForDns({
    subdomainId: params.subdomainId,
    userId: params.userId,
  });

  const { data: items, error: itemsError } = await supabaseAdmin
    .from("DelegatedNameserver")
    .select("*")
    .eq("subdomainId", params.subdomainId);
  if (itemsError) throw new Error(itemsError.message);

  await Promise.allSettled((items ?? []).map((i) => deleteDnsRecord(i.cloudflareRecordId)));

  const { error: deleteError } = await supabaseAdmin
    .from("DelegatedNameserver")
    .delete()
    .eq("subdomainId", params.subdomainId);
  if (deleteError) throw new Error(deleteError.message);

  await audit({
    actorUserId: params.actorUserId,
    action: "dns.delegation.switch_back",
    targetType: "subdomain",
    targetId: params.subdomainId,
    metadata: { removed: (items ?? []).length },
  });
}


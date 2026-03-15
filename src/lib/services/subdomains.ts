import { audit } from "@/lib/audit";
import { env } from "@/lib/env";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { randomUUID } from "node:crypto";
import { deleteDnsRecord } from "@/lib/cloudflare/dns";
import {
  baseFqdnForLabel,
  subdomainLabelSchema,
} from "@/lib/validators/domain";
import { matchesPhishingKeyword } from "@/lib/safety/keywords";

export async function getOwnedSubdomainOrThrow(params: {
  userId: string;
  subdomainId: string;
}) {
  const { data: subdomain, error } = await supabaseAdmin
    .from("Subdomain")
    .select("*")
    .eq("id", params.subdomainId)
    .eq("userId", params.userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!subdomain) throw new Error("Subdomain not found");
  return subdomain;
}

export async function isDelegationEnabled(subdomainId: string): Promise<boolean> {
  const { count, error } = await supabaseAdmin
    .from("DelegatedNameserver")
    .select("id", { head: true, count: "exact" })
    .eq("subdomainId", subdomainId);
  if (error) throw new Error(error.message);
  return (count ?? 0) > 0;
}

export async function claimSubdomain(params: {
  userId: string;
  actorUserId: string;
  label: string;
}) {
  const parsed = subdomainLabelSchema.safeParse(params.label);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid label");

  const keyword = matchesPhishingKeyword(parsed.data);
  if (keyword) {
    await audit({
      actorUserId: params.actorUserId,
      action: "subdomain.claim_blocked",
      targetType: "user",
      targetId: params.userId,
      metadata: { keyword, label: parsed.data },
    });
    throw new Error("Subdomain label blocked by safety policy");
  }

  const { count: existingCount, error: countError } = await supabaseAdmin
    .from("Subdomain")
    .select("id", { head: true, count: "exact" })
    .eq("userId", params.userId);
  if (countError) throw new Error(countError.message);
  if ((existingCount ?? 0) >= 2) throw new Error("Subdomain limit reached (max 2)");

  const baseFqdn = baseFqdnForLabel(parsed.data, env.ROOT_DOMAIN);

  const { data: reserved, error: reservedError } = await supabaseAdmin
    .from("ReservedSubdomain")
    .select("id,createdByUserId,reservedForUserId")
    .eq("baseFqdn", baseFqdn)
    .maybeSingle();
  if (reservedError) {
    // If the table isn't set up yet, treat as not reserved.
    if (
      !reservedError.message?.includes("schema cache") &&
      !reservedError.message?.includes("Could not find the table")
    ) {
      throw new Error(reservedError.message);
    }
  }
  if (reserved) {
    await audit({
      actorUserId: params.actorUserId,
      action: "subdomain.claim_reserved",
      targetType: "subdomain",
      targetId: reserved.id as string,
      metadata: { baseFqdn, reservedForUserId: reserved.reservedForUserId ?? null },
    });
    throw new Error("This subdomain is reserved. Contact the administrator to claim it.");
  }

  const { count: existsCount, error: existsError } = await supabaseAdmin
    .from("Subdomain")
    .select("id", { head: true, count: "exact" })
    .eq("baseFqdn", baseFqdn);
  if (existsError) throw new Error(existsError.message);
  if ((existsCount ?? 0) > 0) throw new Error("That subdomain is already taken");

  const now = new Date().toISOString();
  const { data: created, error: createError } = await supabaseAdmin
    .from("Subdomain")
    .insert({
      id: randomUUID(),
      userId: params.userId,
      label: parsed.data,
      baseFqdn,
      status: "active",
      riskScore: 0,
      createdAt: now,
      updatedAt: now,
    })
    .select("*")
    .single();
  if (createError) throw new Error(createError.message);

  await audit({
    actorUserId: params.actorUserId,
    action: "subdomain.claim",
    targetType: "subdomain",
    targetId: created.id,
    metadata: { baseFqdn },
  });

  return created;
}

export async function suspendSubdomain(params: {
  subdomainId: string;
  actorUserId: string | null;
  reason: string;
}) {
  const { data: updated, error } = await supabaseAdmin
    .from("Subdomain")
    .update({ status: "suspended", updatedAt: new Date().toISOString() })
    .eq("id", params.subdomainId)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  await audit({
    actorUserId: params.actorUserId,
    action: "subdomain.suspend",
    targetType: "subdomain",
    targetId: params.subdomainId,
    metadata: { reason: params.reason },
  });
  return updated;
}

export async function unsuspendSubdomain(params: {
  subdomainId: string;
  actorUserId: string | null;
}) {
  const { data: updated, error } = await supabaseAdmin
    .from("Subdomain")
    .update({ status: "active", updatedAt: new Date().toISOString() })
    .eq("id", params.subdomainId)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  await audit({
    actorUserId: params.actorUserId,
    action: "subdomain.unsuspend",
    targetType: "subdomain",
    targetId: params.subdomainId,
  });
  return updated;
}

export async function deleteOwnedSubdomain(params: {
  userId: string;
  actorUserId: string;
  subdomainId: string;
}) {
  const subdomain = await getOwnedSubdomainOrThrow({
    userId: params.userId,
    subdomainId: params.subdomainId,
  });

  const [{ data: dns, error: dnsErr }, { data: delegated, error: delegatedErr }] =
    await Promise.all([
      supabaseAdmin
        .from("DnsRecord")
        .select("cloudflareRecordId")
        .eq("subdomainId", subdomain.id),
      supabaseAdmin
        .from("DelegatedNameserver")
        .select("cloudflareRecordId")
        .eq("subdomainId", subdomain.id),
    ]);
  if (dnsErr) throw new Error(dnsErr.message);
  if (delegatedErr) throw new Error(delegatedErr.message);

  const ids = [
    ...(dns ?? []).map((r) => r.cloudflareRecordId as string),
    ...(delegated ?? []).map((r) => r.cloudflareRecordId as string),
  ].filter(Boolean);

  const results = await Promise.allSettled(ids.map((id) => deleteDnsRecord(id)));
  const failed = results.filter((r) => r.status === "rejected").length;

  const { error: delErr } = await supabaseAdmin
    .from("Subdomain")
    .delete()
    .eq("id", subdomain.id)
    .eq("userId", params.userId);
  if (delErr) throw new Error(delErr.message);

  await audit({
    actorUserId: params.actorUserId,
    action: "subdomain.delete",
    targetType: "subdomain",
    targetId: subdomain.id,
    metadata: {
      baseFqdn: subdomain.baseFqdn,
      cloudflareRecordsAttempted: ids.length,
      cloudflareRecordsFailed: failed,
    },
  });

  return { deletedSubdomainId: subdomain.id };
}

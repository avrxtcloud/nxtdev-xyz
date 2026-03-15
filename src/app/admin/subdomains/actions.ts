"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { suspendSubdomain, unsuspendSubdomain } from "@/lib/services/subdomains";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { audit } from "@/lib/audit";
import { deleteDnsRecord } from "@/lib/cloudflare/dns";

export async function suspendSubdomainAction(subdomainId: string) {
  const admin = await requireAdmin();
  await suspendSubdomain({
    subdomainId,
    actorUserId: admin.id,
    reason: "admin_action",
  });
  revalidatePath("/admin/subdomains");
}

export async function unsuspendSubdomainAction(subdomainId: string) {
  const admin = await requireAdmin();
  await unsuspendSubdomain({ subdomainId, actorUserId: admin.id });
  revalidatePath("/admin/subdomains");
}

export async function purgeSubdomainRecordsAction(subdomainId: string) {
  const admin = await requireAdmin();

  const [{ data: dns, error: dnsErr }, { data: delegated, error: delErr }] =
    await Promise.all([
      supabaseAdmin
        .from("DnsRecord")
        .select("cloudflareRecordId")
        .eq("subdomainId", subdomainId),
      supabaseAdmin
        .from("DelegatedNameserver")
        .select("cloudflareRecordId")
        .eq("subdomainId", subdomainId),
    ]);
  if (dnsErr) throw new Error(dnsErr.message);
  if (delErr) throw new Error(delErr.message);

  const ids = [
    ...(dns ?? []).map((r) => r.cloudflareRecordId as string),
    ...(delegated ?? []).map((r) => r.cloudflareRecordId as string),
  ];

  const [{ error: delDnsErr }, { error: delNsErr }] = await Promise.all([
    supabaseAdmin.from("DnsRecord").delete().eq("subdomainId", subdomainId),
    supabaseAdmin
      .from("DelegatedNameserver")
      .delete()
      .eq("subdomainId", subdomainId),
  ]);
  if (delDnsErr) throw new Error(delDnsErr.message);
  if (delNsErr) throw new Error(delNsErr.message);

  await Promise.allSettled(ids.map((id) => deleteDnsRecord(id)));

  await audit({
    actorUserId: admin.id,
    action: "admin.subdomain.purge_records",
    targetType: "subdomain",
    targetId: subdomainId,
    metadata: { count: ids.length },
  });

  revalidatePath("/admin/subdomains");
}


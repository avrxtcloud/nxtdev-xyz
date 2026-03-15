"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { deleteDnsRecord } from "@/lib/cloudflare/dns";
import { audit } from "@/lib/audit";

export async function adminDeleteDnsRecordAction(recordId: string) {
  const admin = await requireAdmin();

  const { data: record, error } = await supabaseAdmin
    .from("DnsRecord")
    .select("*")
    .eq("id", recordId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!record) throw new Error("Record not found");

  await Promise.allSettled([deleteDnsRecord(record.cloudflareRecordId as string)]);

  const { error: delErr } = await supabaseAdmin
    .from("DnsRecord")
    .delete()
    .eq("id", record.id as string);
  if (delErr) throw new Error(delErr.message);

  await audit({
    actorUserId: admin.id,
    action: "admin.dns.delete",
    targetType: "dns_record",
    targetId: record.id as string,
    metadata: { fqdn: record.fqdn, type: record.type },
  });

  revalidatePath("/admin/records");
}


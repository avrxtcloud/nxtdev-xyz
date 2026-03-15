"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { audit } from "@/lib/audit";
import { deleteDnsRecord } from "@/lib/cloudflare/dns";

type UserStatus = "active" | "suspended" | "banned";

export async function setUserStatusAction(userId: string, status: UserStatus) {
  const admin = await requireAdmin();

  const { error } = await supabaseAdmin
    .from("User")
    .update({ status, updatedAt: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw new Error(error.message);

  await audit({
    actorUserId: admin.id,
    action: "admin.user.set_status",
    targetType: "user",
    targetId: userId,
    metadata: { status },
  });

  revalidatePath("/admin/users");
}

export async function deleteUserAction(userId: string) {
  const admin = await requireAdmin();
  if (admin.id === userId) {
    throw new Error("Cannot delete your own admin account");
  }

  const { data: subs, error: subErr } = await supabaseAdmin
    .from("Subdomain")
    .select("id")
    .eq("userId", userId);
  if (subErr) throw new Error(subErr.message);
  const subdomainIds = (subs ?? []).map((s) => s.id as string);

  const [{ data: dns, error: dnsErr }, { data: delegated, error: delErr }] =
    subdomainIds.length === 0
      ? [
          { data: [], error: null },
          { data: [], error: null },
        ]
      : await Promise.all([
          supabaseAdmin
            .from("DnsRecord")
            .select("cloudflareRecordId")
            .in("subdomainId", subdomainIds),
          supabaseAdmin
            .from("DelegatedNameserver")
            .select("cloudflareRecordId")
            .in("subdomainId", subdomainIds),
        ]);
  if (dnsErr) throw new Error(dnsErr.message);
  if (delErr) throw new Error(delErr.message);

  const ids = [
    ...(dns ?? []).map((r) => r.cloudflareRecordId as string),
    ...(delegated ?? []).map((r) => r.cloudflareRecordId as string),
  ];

  const { error: deleteErr } = await supabaseAdmin.from("User").delete().eq("id", userId);
  if (deleteErr) throw new Error(deleteErr.message);

  await Promise.allSettled(ids.map((id) => deleteDnsRecord(id)));

  await audit({
    actorUserId: admin.id,
    action: "admin.user.delete",
    targetType: "user",
    targetId: userId,
    metadata: { deletedRecords: ids.length },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin/subdomains");
  revalidatePath("/admin/records");
}


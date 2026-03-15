"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { audit } from "@/lib/audit";

type AbuseReportStatus = "open" | "resolved" | "ignored";

export async function setReportStatusAction(
  reportId: string,
  status: AbuseReportStatus,
) {
  const admin = await requireAdmin();

  const { error } = await supabaseAdmin
    .from("AbuseReport")
    .update({ status })
    .eq("id", reportId);
  if (error) throw new Error(error.message);

  await audit({
    actorUserId: admin.id,
    action: "admin.report.set_status",
    targetType: "abuse_report",
    targetId: reportId,
    metadata: { status },
  });

  revalidatePath("/admin/reports");
}

export async function deleteReportAction(reportId: string) {
  const admin = await requireAdmin();

  const { data: existing, error: findErr } = await supabaseAdmin
    .from("AbuseReport")
    .select("id,domain,reason,status")
    .eq("id", reportId)
    .maybeSingle();
  if (findErr) throw new Error(findErr.message);
  if (!existing) throw new Error("Report not found");

  const { error } = await supabaseAdmin.from("AbuseReport").delete().eq("id", reportId);
  if (error) throw new Error(error.message);

  await audit({
    actorUserId: admin.id,
    action: "admin.report.delete",
    targetType: "abuse_report",
    targetId: reportId,
    metadata: { domain: existing.domain, status: existing.status },
  });

  revalidatePath("/admin/reports");
}

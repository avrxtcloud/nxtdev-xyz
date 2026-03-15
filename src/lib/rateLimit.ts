import { supabaseAdmin } from "@/db/supabaseAdmin";

export async function assertNotRateLimited(params: {
  actorUserId: string;
  actionPrefix: string;
  maxPerHour: number;
}) {
  const since = new Date(Date.now() - 60 * 60 * 1000);
  const { count, error } = await supabaseAdmin
    .from("AuditLog")
    .select("id", { head: true, count: "exact" })
    .eq("actorUserId", params.actorUserId)
    .like("action", `${params.actionPrefix}%`)
    .gte("timestamp", since.toISOString());
  if (error) throw new Error(error.message);

  if ((count ?? 0) >= params.maxPerHour) {
    throw new Error("Too many changes recently. Please slow down and try again.");
  }
}

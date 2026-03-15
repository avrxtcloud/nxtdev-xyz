import { env } from "@/lib/env";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { audit } from "@/lib/audit";

export async function bumpRiskScore(params: {
  subdomainId: string;
  actorUserId: string | null;
  delta: number;
  reason: string;
  metadata?: Record<string, unknown>;
}) {
  const { data: current, error: currentError } = await supabaseAdmin
    .from("Subdomain")
    .select("riskScore,status")
    .eq("id", params.subdomainId)
    .single();
  if (currentError) throw new Error(currentError.message);

  const next = Math.max(0, Math.min(100, (current.riskScore ?? 0) + params.delta));

  const { data: updated, error: updateError } = await supabaseAdmin
    .from("Subdomain")
    .update({ riskScore: next, updatedAt: new Date().toISOString() })
    .eq("id", params.subdomainId)
    .select("id,riskScore,status")
    .single();
  if (updateError) throw new Error(updateError.message);

  await audit({
    actorUserId: params.actorUserId,
    action: "risk.bump",
    targetType: "subdomain",
    targetId: params.subdomainId,
    metadata: { delta: params.delta, reason: params.reason, ...params.metadata },
  });

  const shouldSuspend = updated.riskScore >= env.RISK_SUSPEND_THRESHOLD;
  return { ...updated, shouldSuspend };
}

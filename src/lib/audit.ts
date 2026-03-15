import { supabaseAdmin } from "@/db/supabaseAdmin";
import { randomUUID } from "node:crypto";

export async function audit(params: {
  actorUserId: string | null;
  action: string;
  targetType: string;
  targetId?: string | null;
  metadata?: unknown;
}) {
  const { error } = await supabaseAdmin.from("AuditLog").insert({
    id: randomUUID(),
    actorUserId: params.actorUserId,
    action: params.action,
    targetType: params.targetType,
    targetId: params.targetId ?? null,
    metadata: params.metadata ?? null,
    timestamp: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}

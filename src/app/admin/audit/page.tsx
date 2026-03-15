import { supabaseAdmin } from "@/db/supabaseAdmin";
import { Card } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";

export default async function AdminAuditPage() {
  const { data: logs, error } = await supabaseAdmin
    .from("AuditLog")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(300);
  if (error) throw new Error(error.message);

  const actorIds = Array.from(
    new Set((logs ?? []).map((l) => l.actorUserId as string).filter(Boolean)),
  );
  const { data: actors, error: actorErr } = actorIds.length
    ? await supabaseAdmin.from("User").select("id,email").in("id", actorIds)
    : { data: [], error: null };
  if (actorErr) throw new Error(actorErr.message);

  const emailByActorId = new Map(
    (actors ?? []).map((a) => [a.id as string, a.email as string]),
  );

  return (
    <div className="grid gap-4">
      <Card>
        <div className="text-sm font-semibold">Audit logs</div>
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Latest actions across the system.
        </div>
      </Card>
      <Card>
        <Table>
          <thead>
            <tr>
              <Th>Time</Th>
              <Th>Actor</Th>
              <Th>Action</Th>
              <Th>Target</Th>
            </tr>
          </thead>
          <tbody>
            {(logs ?? []).map((l) => (
              <tr key={l.id}>
                <Td className="text-xs text-zinc-500">
                  {new Date(l.timestamp as string).toISOString()}
                </Td>
                <Td className="font-mono text-xs">
                  {l.actorUserId
                    ? emailByActorId.get(l.actorUserId as string) ?? "unknown"
                    : "public"}
                </Td>
                <Td className="font-mono text-xs">{l.action}</Td>
                <Td className="font-mono text-xs">
                  {l.targetType}:{l.targetId ?? "-"}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}


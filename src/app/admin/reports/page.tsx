import { supabaseAdmin } from "@/db/supabaseAdmin";
import { Card } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteReportAction, setReportStatusAction } from "@/app/admin/reports/actions";

export default async function AdminReportsPage() {
  const { data: reports, error } = await supabaseAdmin
    .from("AbuseReport")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);

  return (
    <div className="grid gap-4">
      <Card>
        <div className="text-sm font-semibold">Abuse reports</div>
      </Card>
      <Card>
        <Table>
          <thead>
            <tr>
              <Th>Status</Th>
              <Th>Domain</Th>
              <Th>Reason</Th>
              <Th>Created</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {(reports ?? []).map((r) => (
              <tr key={r.id}>
                <Td>
                  {r.status === "open" ? (
                    <Badge tone="warn">Open</Badge>
                  ) : r.status === "resolved" ? (
                    <Badge tone="ok">Resolved</Badge>
                  ) : (
                    <Badge tone="neutral">Ignored</Badge>
                  )}
                </Td>
                <Td className="font-mono text-xs">{r.domain}</Td>
                <Td>{r.reason}</Td>
                <Td className="text-xs text-zinc-500">
                  {new Date(r.createdAt as string).toISOString()}
                </Td>
                <Td>
                  <div className="flex flex-wrap gap-2">
                    <form action={setReportStatusAction.bind(null, r.id, "open")}>
                      <Button size="sm" variant="secondary" type="submit">
                        Open
                      </Button>
                    </form>
                    <form
                      action={setReportStatusAction.bind(null, r.id, "resolved")}
                    >
                      <Button size="sm" variant="secondary" type="submit">
                        Resolve
                      </Button>
                    </form>
                    <form
                      action={setReportStatusAction.bind(null, r.id, "ignored")}
                    >
                      <Button size="sm" variant="danger" type="submit">
                        Ignore
                      </Button>
                    </form>
                    {r.status !== "open" ? (
                      <form action={deleteReportAction.bind(null, r.id)}>
                        <Button size="sm" variant="danger" type="submit">
                          Delete
                        </Button>
                      </form>
                    ) : null}
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

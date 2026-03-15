import { supabaseAdmin } from "@/db/supabaseAdmin";
import { getOrCreateAppUser } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function UserReportsPage() {
  const { appUser } = await getOrCreateAppUser();

  const { data: subdomains, error: subErr } = await supabaseAdmin
    .from("Subdomain")
    .select("baseFqdn")
    .eq("userId", appUser.id);
  if (subErr) throw new Error(subErr.message);

  const domains = (subdomains ?? []).map((s) => s.baseFqdn as string);
  const reportsFilter =
    domains.length === 0
      ? null
      : domains.map((d) => `domain.like.%${d}`).join(",");

  const { data: reports, error: repErr } = reportsFilter
    ? await supabaseAdmin
        .from("AbuseReport")
        .select("*")
        .or(reportsFilter)
        .order("createdAt", { ascending: false })
        .limit(200)
    : { data: [], error: null };
  if (repErr) throw new Error(repErr.message);

  return (
    <div className="grid gap-4">
      <Card>
        <div className="text-sm font-semibold">Reports against your domains</div>
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Reports are reviewed by administrators. If your domain is flagged, DNS
          changes may be throttled or suspended.
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Reports</div>
          <div className="text-xs text-zinc-500">{reports?.length ?? 0} shown</div>
        </div>
        <div className="mt-4">
          {!reports || reports.length === 0 ? (
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              No reports found.
            </div>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Status</Th>
                  <Th>Domain</Th>
                  <Th>Reason</Th>
                  <Th>Created</Th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
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
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Card>
    </div>
  );
}


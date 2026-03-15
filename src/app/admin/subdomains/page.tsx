import { supabaseAdmin } from "@/db/supabaseAdmin";
import { Card } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  purgeSubdomainRecordsAction,
  suspendSubdomainAction,
  unsuspendSubdomainAction,
} from "@/app/admin/subdomains/actions";

export default async function AdminSubdomainsPage() {
  const { data: subdomains, error } = await supabaseAdmin
    .from("Subdomain")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);

  const subdomainIds = (subdomains ?? []).map((s) => s.id as string);
  const userIds = Array.from(
    new Set((subdomains ?? []).map((s) => s.userId as string)),
  );

  const [{ data: users, error: userErr }, { data: dns, error: dnsErr }, { data: delegated, error: delErr }] =
    await Promise.all([
      userIds.length
        ? supabaseAdmin.from("User").select("id,email").in("id", userIds)
        : Promise.resolve({ data: [], error: null }),
      subdomainIds.length
        ? supabaseAdmin.from("DnsRecord").select("subdomainId").in("subdomainId", subdomainIds)
        : Promise.resolve({ data: [], error: null }),
      subdomainIds.length
        ? supabaseAdmin
            .from("DelegatedNameserver")
            .select("subdomainId")
            .in("subdomainId", subdomainIds)
        : Promise.resolve({ data: [], error: null }),
    ]);
  if (userErr) throw new Error(userErr.message);
  if (dnsErr) throw new Error(dnsErr.message);
  if (delErr) throw new Error(delErr.message);

  const emailByUserId = new Map((users ?? []).map((u) => [u.id as string, u.email as string]));
  const dnsCountBySub = new Map<string, number>();
  for (const row of dns ?? []) {
    const id = row.subdomainId as string;
    dnsCountBySub.set(id, (dnsCountBySub.get(id) ?? 0) + 1);
  }
  const delegatedCountBySub = new Map<string, number>();
  for (const row of delegated ?? []) {
    const id = row.subdomainId as string;
    delegatedCountBySub.set(id, (delegatedCountBySub.get(id) ?? 0) + 1);
  }

  return (
    <div className="grid gap-4">
      <Card>
        <div className="text-sm font-semibold">Subdomains</div>
      </Card>
      <Card>
        <Table>
          <thead>
            <tr>
              <Th>Domain</Th>
              <Th>Owner</Th>
              <Th>Status</Th>
              <Th>Risk</Th>
              <Th>Records</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {(subdomains ?? []).map((s) => {
              const dnsCount = dnsCountBySub.get(s.id as string) ?? 0;
              const delegatedCount = delegatedCountBySub.get(s.id as string) ?? 0;
              return (
                <tr key={s.id}>
                  <Td className="font-mono text-xs">{s.baseFqdn}</Td>
                  <Td className="font-mono text-xs">
                    {emailByUserId.get(s.userId as string) ?? "unknown"}
                  </Td>
                  <Td>
                    {s.status === "active" ? (
                      <Badge tone="ok">Active</Badge>
                    ) : (
                      <Badge tone="bad">Suspended</Badge>
                    )}
                    {delegatedCount > 0 ? (
                      <span className="ml-2">
                        <Badge tone="warn">Delegated</Badge>
                      </span>
                    ) : null}
                  </Td>
                  <Td className="font-mono">{s.riskScore}</Td>
                  <Td className="font-mono text-xs">{dnsCount + delegatedCount}</Td>
                  <Td>
                    <div className="flex flex-wrap gap-2">
                      {s.status === "active" ? (
                        <form action={suspendSubdomainAction.bind(null, s.id)}>
                          <Button size="sm" variant="secondary" type="submit">
                            Suspend
                          </Button>
                        </form>
                      ) : (
                        <form action={unsuspendSubdomainAction.bind(null, s.id)}>
                          <Button size="sm" variant="secondary" type="submit">
                            Unsuspend
                          </Button>
                        </form>
                      )}
                      <form action={purgeSubdomainRecordsAction.bind(null, s.id)}>
                        <Button size="sm" variant="danger" type="submit">
                          Purge records
                        </Button>
                      </form>
                    </div>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}


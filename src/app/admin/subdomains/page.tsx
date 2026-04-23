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
import { SearchInput } from "@/components/ui/search-input";

export default async function AdminSubdomainsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  let query = supabaseAdmin.from("Subdomain").select("*");
  if (q) {
    query = query.or(`label.ilike.%${q}%,baseFqdn.ilike.%${q}%`);
  }

  const { data: subdomains, error } = await query
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
    <div className="grid gap-6">
      <Card className="p-6 rounded-[2rem] border-zinc-100 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest text-zinc-900 dark:text-white">Subdomain Audit</h2>
            <p className="text-xs font-medium text-zinc-500 mt-1">Monitor and manage all claimed subdomains.</p>
          </div>
          <SearchInput placeholder="Search domains..." className="w-full md:w-96" />
        </div>
      </Card>

      {/* Desktop Table */}
      <Card className="hidden lg:block rounded-[2rem] border-zinc-100 dark:border-zinc-800 overflow-hidden">
        <Table>
          <thead>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <Th>Domain</Th>
              <Th>Owner</Th>
              <Th>Status</Th>
              <Th>Risk</Th>
              <Th>Records</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {(subdomains ?? []).map((s) => {
              const dnsCount = dnsCountBySub.get(s.id as string) ?? 0;
              const delegatedCount = delegatedCountBySub.get(s.id as string) ?? 0;
              return (
                <tr key={s.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                  <Td className="font-mono text-xs font-semibold">{s.baseFqdn}</Td>
                  <Td className="font-mono text-xs text-zinc-500">
                    {emailByUserId.get(s.userId as string) ?? "unknown"}
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                       {s.status === "active" ? (
                        <Badge tone="ok">Active</Badge>
                      ) : (
                        <Badge tone="bad">Suspended</Badge>
                      )}
                      {delegatedCount > 0 ? (
                        <Badge tone="warn">Delegated</Badge>
                      ) : null}
                    </div>
                  </Td>
                  <Td className="font-mono text-xs">
                     <span className={s.riskScore > 50 ? "text-red-500 font-bold" : ""}>{s.riskScore}</span>
                  </Td>
                  <Td className="font-mono text-xs font-bold text-zinc-500">{dnsCount + delegatedCount}</Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-2">
                      <SubdomainActions id={s.id} status={s.status} />
                    </div>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>

      {/* Mobile view */}
      <div className="grid gap-4 lg:hidden">
        {(subdomains ?? []).map((s) => {
           const dnsCount = dnsCountBySub.get(s.id as string) ?? 0;
           const delegatedCount = delegatedCountBySub.get(s.id as string) ?? 0;
           return (
            <Card key={s.id} className="p-5 rounded-2xl border-zinc-100 dark:border-zinc-800 space-y-4">
              <div className="flex items-start justify-between">
                <div className="font-black text-blue-600 dark:text-blue-400 font-mono text-sm">{s.baseFqdn}</div>
                <div className="flex flex-col items-end gap-1">
                   {s.status === "active" ? (
                    <Badge tone="ok">Active</Badge>
                  ) : (
                    <Badge tone="bad">Suspended</Badge>
                  )}
                  {delegatedCount > 0 ? (
                    <Badge tone="warn" className="text-[9px]">Delegated</Badge>
                  ) : null}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Records</div>
                   <div className="text-sm font-bold text-zinc-900 dark:text-white">{dnsCount + delegatedCount}</div>
                </div>
                <div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Risk</div>
                   <div className="text-sm font-bold text-zinc-900 dark:text-white">{s.riskScore}</div>
                </div>
              </div>

              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Owner</div>
              <div className="text-xs font-mono text-zinc-500 truncate mt-1">
                {emailByUserId.get(s.userId as string) ?? "unknown"}
              </div>

              <div className="pt-4 border-t border-zinc-50 dark:border-zinc-800 flex flex-wrap gap-2">
                <SubdomainActions id={s.id} status={s.status} />
              </div>
            </Card>
           );
        })}
      </div>
      
      {(!subdomains || subdomains.length === 0) && (
        <div className="text-center py-20 text-zinc-500">
          No subdomains found.
        </div>
      )}
    </div>
  );
}

function SubdomainActions({ id, status }: { id: string; status: string }) {
  return (
    <>
      {status === "active" ? (
        <form action={suspendSubdomainAction.bind(null, id)}>
          <Button size="sm" variant="secondary" type="submit" className="rounded-xl h-9 text-[10px] uppercase font-black tracking-widest">
            Suspend
          </Button>
        </form>
      ) : (
        <form action={unsuspendSubdomainAction.bind(null, id)}>
          <Button size="sm" variant="secondary" type="submit" className="rounded-xl h-9 text-[10px] uppercase font-black tracking-widest">
            Unsuspend
          </Button>
        </form>
      )}
      <form action={purgeSubdomainRecordsAction.bind(null, id)}>
        <Button size="sm" variant="danger" type="submit" className="rounded-xl h-9 text-[10px] uppercase font-black tracking-widest">
          Purge records
        </Button>
      </form>
    </>
  );
}


import Link from "next/link";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { getOrCreateAppUser } from "@/lib/auth";
import {
  getOwnedSubdomainOrThrow,
  isDelegationEnabled,
} from "@/lib/services/subdomains";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, Td, Th } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { CreateRecordForm } from "@/app/dashboard/domains/[subdomainId]/records/CreateRecordForm";
import { PropagationButton } from "@/app/dashboard/domains/[subdomainId]/records/PropagationButton";
import {
  createRecordAction,
  deleteRecordAction,
} from "@/app/dashboard/domains/[subdomainId]/records/actions";
import { getSystemFlags } from "@/lib/system/flags";

export default async function RecordsPage({
  params,
}: {
  params: Promise<{ subdomainId: string }>;
}) {
  const { subdomainId } = await params;
  const { appUser } = await getOrCreateAppUser();
  const subdomain = await getOwnedSubdomainOrThrow({
    userId: appUser.id,
    subdomainId,
  });
  const delegated = await isDelegationEnabled(subdomain.id);
  const flags = await getSystemFlags();

  const { data: records, error } = await supabaseAdmin
    .from("DnsRecord")
    .select("*")
    .eq("subdomainId", subdomain.id)
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);

  return (
    <div className="grid gap-8">
      <Card className="p-8 rounded-[2.5rem] border-zinc-100/50 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Create DNS Record</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Managing records for <span className="font-mono text-blue-600 dark:text-blue-400">@{subdomain.baseFqdn}</span>
            </p>
          </div>
          {delegated ? (
            <Badge tone="warn" className="rounded-full px-4 py-1 text-xs font-black uppercase tracking-widest shrink-0">Delegation Active</Badge>
          ) : null}
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800">
          {delegated ? (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/40 text-sm font-bold text-orange-800 dark:text-orange-200">
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Standard DNS editing is disabled while custom nameservers are active.
            </div>
          ) : !flags.dnsEditingEnabled ? (
            <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-400">
              {flags.maintenanceMessage}
            </div>
          ) : subdomain.status !== "active" ? (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 text-sm font-bold text-red-800 dark:text-red-200">
              This subdomain is suspended. No configuration changes are allowed.
            </div>
          ) : (
            <CreateRecordForm
              action={createRecordAction.bind(null, subdomain.id)}
              disabled={false}
            />
          )}
        </div>
      </Card>

      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-widest">Active Records</h3>
          <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">{records?.length ?? 0} TOTAL</div>
        </div>

        {!records || records.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-sm text-zinc-500 font-medium tracking-tight">Your zone file is currently empty.</p>
          </div>
        ) : (
          <Card className="rounded-[2.5rem] border-zinc-100/50 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <thead>
                  <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                    <Th className="py-5 font-black text-zinc-400 uppercase tracking-widest text-[10px]">Type</Th>
                    <Th className="py-5 font-black text-zinc-400 uppercase tracking-widest text-[10px]">Host Label</Th>
                    <Th className="py-5 font-black text-zinc-400 uppercase tracking-widest text-[10px]">Content / Target</Th>
                    <Th className="py-5 font-black text-zinc-400 uppercase tracking-widest text-[10px]">TTL</Th>
                    <Th className="py-5 font-black text-zinc-400 uppercase tracking-widest text-[10px]">Options</Th>
                    <Th className="py-5 text-right font-black text-zinc-400 uppercase tracking-widest text-[10px]">Actions</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {records.map((r) => (
                    <tr key={r.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                      <Td className="py-5">
                        <span className="font-black font-mono text-blue-600 dark:text-blue-400">{r.type}</span>
                      </Td>
                      <Td className="py-5">
                        <span className="font-bold text-zinc-900 dark:text-white truncate block max-w-[200px]">{r.fqdn}</span>
                      </Td>
                      <Td className="py-5">
                        <div className="max-w-[340px] break-words font-medium text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                          {r.content}
                          {r.type === "MX" && r.priority !== null ? (
                            <span className="ml-2 inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-bold text-zinc-500">
                              {r.priority}
                            </span>
                          ) : null}
                        </div>
                      </Td>
                      <Td className="py-5 font-bold text-zinc-500 text-xs">{r.ttl}</Td>
                      <Td className="py-5">
                        {r.proxied ? (
                          <div className="flex items-center gap-1.5 text-orange-500 font-bold text-[10px] uppercase tracking-wider">
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                            Proxied
                          </div>
                        ) : (
                          <div className="text-zinc-400 font-bold text-[10px] uppercase tracking-wider">DNS Only</div>
                        )}
                      </Td>
                      <Td className="py-5 text-right">
                        <div className="flex justify-end items-center gap-2">
                          <Link href={`/dashboard/domains/${subdomain.id}/records/${r.id}`}>
                            <Button variant="ghost" size="sm" className="rounded-xl h-8 text-xs">Edit</Button>
                          </Link>
                          <PropagationButton recordId={r.id} />
                          <form action={deleteRecordAction.bind(null, subdomain.id, r.id)} className="inline">
                            <SubmitButton
                              variant="danger"
                              size="sm"
                              className="rounded-xl h-8 px-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              disabled={delegated || subdomain.status !== "active"}
                              pendingText="..."
                            >
                              Delete
                            </SubmitButton>
                          </form>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}

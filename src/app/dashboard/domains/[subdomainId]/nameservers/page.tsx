import { supabaseAdmin } from "@/db/supabaseAdmin";
import { getOrCreateAppUser } from "@/lib/auth";
import { getOwnedSubdomainOrThrow } from "@/lib/services/subdomains";
import { Card } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import {
  addNameserverAction,
  removeNameserverAction,
  switchBackAction,
} from "./actions";
import { getSystemFlags } from "@/lib/system/flags";
import { NameserverForm } from "./NameserverForm";
import { DeleteNameserverButton } from "./DeleteNameserverButton";
import { SwitchBackButton } from "./SwitchBackButton";

export default async function NameserversPage({
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
  const flags = await getSystemFlags();

  const { data: delegated, error } = await supabaseAdmin
    .from("DelegatedNameserver")
    .select("*")
    .eq("subdomainId", subdomain.id)
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);

  return (
    <div className="grid gap-8">
      <Card className="p-8 rounded-[2.5rem] border-zinc-100/50 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Nameserver Delegation</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            Delegate control of <span className="font-mono text-blue-600 dark:text-blue-400">{subdomain.baseFqdn}</span> to an external provider. 
            <br/><span className="text-[10px] uppercase font-black tracking-widest text-zinc-400 mt-2 block">Note: Internal DNS editing will be disabled during delegation.</span>
          </p>
        </div>

        {subdomain.status !== "active" ? (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 text-sm font-bold text-red-800 dark:text-red-200">
            This subdomain is suspended. Delegation changes are blocked.
          </div>
        ) : !flags.dnsEditingEnabled ? (
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-400">
            {flags.maintenanceMessage}
          </div>
        ) : (
          <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800">
            <NameserverForm
              subdomainId={subdomain.id}
              action={addNameserverAction}
              disabled={false}
            />
          </div>
        )}

        {delegated && delegated.length > 0 ? (
          <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
             <SwitchBackButton
               subdomainId={subdomain.id}
               action={switchBackAction}
               disabled={subdomain.status !== "active"}
             />
          </div>
        ) : null}
      </Card>

      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-widest">Active Delegation</h3>
          <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">{delegated?.length ?? 0} TOTAL</div>
        </div>

        <Card className="rounded-[2.5rem] border-zinc-100/50 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none overflow-hidden">
          {!delegated || delegated.length === 0 ? (
            <div className="p-10 text-center text-sm font-bold text-zinc-400 italic">
              No delegation configured. Using internal DNS.
            </div>
          ) : (
            <Table>
              <thead>
                <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                  <Th className="py-5 font-black text-zinc-400 uppercase tracking-widest text-[10px]">Nameserver Host</Th>
                  <Th className="py-5 text-right font-black text-zinc-400 uppercase tracking-widest text-[10px]">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {delegated.map((d) => (
                  <tr key={d.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                    <Td className="py-5">
                      <span className="font-black font-mono text-zinc-900 dark:text-white">{d.nameserver}</span>
                    </Td>
                    <Td className="py-5 text-right">
                      <DeleteNameserverButton
                        subdomainId={subdomain.id}
                        nsId={d.id}
                        action={removeNameserverAction}
                        disabled={subdomain.status !== "active"}
                      />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      </section>
    </div>
  );
}

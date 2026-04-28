import Link from "next/link";
import { getOrCreateAppUser } from "@/lib/auth";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { env } from "@/lib/env";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  claimSubdomainAction,
  deleteSubdomainAction,
} from "@/app/dashboard/domains/actions";
import { DeleteSubdomainButton } from "@/app/dashboard/domains/DeleteSubdomainButton";
import { ClaimSubdomainForm } from "@/app/dashboard/domains/ClaimSubdomainForm";
import { getSystemFlags } from "@/lib/system/flags";

export default async function DomainsPage() {
  const { appUser, isGithubVerified } = await getOrCreateAppUser();
  const flags = await getSystemFlags();

  const { data: subdomains, error } = await supabaseAdmin
    .from("Subdomain")
    .select("*")
    .eq("userId", appUser.id)
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);

  const enriched = await Promise.all(
    (subdomains ?? []).map(async (s) => {
      const [
        { count: dnsCount, error: dnsErr },
        { count: delegatedCount, error: delegatedErr },
      ] = await Promise.all([
        supabaseAdmin
          .from("DnsRecord")
          .select("id", { head: true, count: "exact" })
          .eq("subdomainId", s.id),
        supabaseAdmin
          .from("DelegatedNameserver")
          .select("id", { head: true, count: "exact" })
          .eq("subdomainId", s.id),
      ]);
      if (dnsErr) throw new Error(dnsErr.message);
      if (delegatedErr) throw new Error(delegatedErr.message);
      return {
        ...s,
        dnsCount: dnsCount ?? 0,
        delegatedCount: delegatedCount ?? 0,
      };
    }),
  );

  return (
    <div className="grid gap-8">
      <Card className="p-8 rounded-[2.5rem] border-zinc-100/50 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none">
        <div className="flex items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Claim a Subdomain</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Connect your next project with a professional <span className="font-mono text-blue-600 dark:text-blue-400">@{env.ROOT_DOMAIN}</span> address.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="text-2xl font-black text-zinc-900 dark:text-white">{enriched.length}/2</div>
            <div className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Slots Used</div>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 mb-8 border border-zinc-100 dark:border-zinc-800">
          <ClaimSubdomainForm
            rootDomain={env.ROOT_DOMAIN}
            usedCount={enriched.length}
            isGithubVerified={isGithubVerified}
            domainCreationEnabled={flags.domainCreationEnabled}
            maintenanceMessage={flags.maintenanceMessage}
            claimAction={claimSubdomainAction}
          />
        </div>
      </Card>

      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-widest">Your Infrastructure</h3>
          <div className="h-px flex-1 mx-6 bg-zinc-100 dark:bg-zinc-800 hidden sm:block"></div>
        </div>

        <div className="grid gap-6">
          {enriched.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
              <div className="h-16 w-16 bg-zinc-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-4 text-zinc-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-1.343 3-3s-1.343-3-3-3m0 12c-1.657 0-3-1.343-3-3s1.343-3 3-3m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <div className="text-zinc-900 dark:text-white font-bold mb-1">No subdomains found</div>
              <p className="text-sm text-zinc-500 font-medium">Claim your first subdomain above to get started.</p>
            </div>
          ) : (
            enriched.map((s) => (
              <Card
                key={s.id}
                className="p-6 rounded-[2rem] border-zinc-100/50 dark:border-zinc-800 shadow-sm transition-all hover:shadow-lg group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">{s.baseFqdn}</div>
                      {s.status === "active" ? (
                        <Badge tone="ok" className="rounded-full px-3 py-0.5">Active</Badge>
                      ) : (
                        <Badge tone="bad" className="rounded-full px-3 py-0.5">Suspended</Badge>
                      )}
                      {s.delegatedCount > 0 ? (
                        <Badge tone="warn" className="rounded-full px-3 py-0.5">Delegated</Badge>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        <span>{s.dnsCount + s.delegatedCount} / 100 Records</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                        <span>Risk: {s.riskScore}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-300"></span>
                        <span>Created {new Date(s.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link href={`/dashboard/domains/${s.id}/records`} className="flex-1 sm:flex-none">
                      <Button variant="secondary" size="md" className="w-full sm:w-auto rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                        DNS Records
                      </Button>
                    </Link>
                    <Link href={`/dashboard/domains/${s.id}/nameservers`} className="flex-1 sm:flex-none">
                      <Button variant="secondary" size="md" className="w-full sm:w-auto rounded-2xl">
                        Nameservers
                      </Button>
                    </Link>
                    <DeleteSubdomainButton
                      baseFqdn={s.baseFqdn}
                      id={s.id}
                    />
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

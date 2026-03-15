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
    <div className="grid gap-4">
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Claim a subdomain</div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Choose a base label like{" "}
              <span className="font-mono">alice</span>.
            </div>
          </div>
          <div className="text-xs text-zinc-500">{enriched.length}/2 used</div>
        </div>
        <ClaimSubdomainForm
          rootDomain={env.ROOT_DOMAIN}
          usedCount={enriched.length}
          isGithubVerified={isGithubVerified}
          domainCreationEnabled={flags.domainCreationEnabled}
          maintenanceMessage={flags.maintenanceMessage}
          claimAction={claimSubdomainAction}
        />
      </Card>

      <Card>
        <div className="text-sm font-semibold">Your subdomains</div>
        <div className="mt-4 grid gap-3">
          {enriched.length === 0 ? (
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              No subdomains yet.
            </div>
          ) : (
            enriched.map((s) => (
              <div
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-sm">{s.baseFqdn}</div>
                    {s.status === "active" ? (
                      <Badge tone="ok">Active</Badge>
                    ) : (
                      <Badge tone="bad">Suspended</Badge>
                    )}
                    {s.delegatedCount > 0 ? (
                      <Badge tone="warn">Delegated</Badge>
                    ) : null}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">
                    Risk score: {s.riskScore} · Records:{" "}
                    {s.dnsCount + s.delegatedCount}/100
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/domains/${s.id}/records`}>
                    <Button variant="secondary" size="sm">
                      Records
                    </Button>
                  </Link>
                  <Link href={`/dashboard/domains/${s.id}/nameservers`}>
                    <Button variant="secondary" size="sm">
                      Nameservers
                    </Button>
                  </Link>
                  <DeleteSubdomainButton
                    baseFqdn={s.baseFqdn}
                    action={deleteSubdomainAction.bind(null, s.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

import Link from "next/link";
import { getOrCreateAppUser } from "@/lib/auth";
import { getOwnedSubdomainOrThrow, isDelegationEnabled } from "@/lib/services/subdomains";
import { Badge } from "@/components/ui/badge";

export default async function SubdomainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ subdomainId: string }>;
}) {
  const { subdomainId } = await params;
  const { appUser } = await getOrCreateAppUser();
  const subdomain = await getOwnedSubdomainOrThrow({
    userId: appUser.id,
    subdomainId,
  });
  const delegated = await isDelegationEnabled(subdomain.id);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="font-mono text-sm">{subdomain.baseFqdn}</div>
            {subdomain.status === "active" ? (
              <Badge tone="ok">Active</Badge>
            ) : (
              <Badge tone="bad">Suspended</Badge>
            )}
            {delegated ? <Badge tone="warn">Delegated</Badge> : null}
          </div>
          <div className="mt-1 text-xs text-zinc-500">
            Risk score: {subdomain.riskScore}
          </div>
        </div>
        <div className="flex gap-2">
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900" href={`/dashboard/domains/${subdomain.id}/records`}>
            Records
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900" href={`/dashboard/domains/${subdomain.id}/nameservers`}>
            Nameservers
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}

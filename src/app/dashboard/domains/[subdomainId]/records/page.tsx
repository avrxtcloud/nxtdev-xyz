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
    <div className="grid gap-4">
      <Card>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">Create DNS record</div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Host <span className="font-mono">@</span> targets{" "}
              <span className="font-mono">{subdomain.baseFqdn}</span>. Relative
              hosts become{" "}
              <span className="font-mono">host.{subdomain.baseFqdn}</span>.
            </div>
          </div>
          {delegated ? <Badge tone="warn">Delegation enabled</Badge> : null}
        </div>
        {delegated ? (
          <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
            DNS editing is disabled while delegation is enabled. Remove
            delegation in Nameserver Settings to edit records.
          </div>
        ) : !flags.dnsEditingEnabled ? (
          <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
            {flags.maintenanceMessage}
          </div>
        ) : subdomain.status !== "active" ? (
          <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
            This subdomain is suspended. DNS changes are blocked.
          </div>
        ) : (
          <div className="mt-4">
            <CreateRecordForm
              action={createRecordAction.bind(null, subdomain.id)}
              disabled={false}
            />
          </div>
        )}
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">Records</div>
          <div className="text-xs text-zinc-500">{records?.length ?? 0} total</div>
        </div>
        <div className="mt-4">
          {!records || records.length === 0 ? (
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              No records yet.
            </div>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Type</Th>
                  <Th>Name</Th>
                  <Th>Content</Th>
                  <Th>TTL</Th>
                  <Th>Proxy</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id}>
                    <Td className="font-mono">{r.type}</Td>
                    <Td className="font-mono">{r.fqdn}</Td>
                    <Td className="max-w-[340px] break-words font-mono text-xs">
                      {r.content}
                      {r.type === "MX" && r.priority !== null ? (
                        <span className="ml-2 text-zinc-500">
                          prio {r.priority}
                        </span>
                      ) : null}
                    </Td>
                    <Td className="font-mono">{r.ttl}</Td>
                    <Td>
                      {typeof r.proxied === "boolean"
                        ? r.proxied
                          ? "Yes"
                          : "No"
                        : "-"}
                    </Td>
                    <Td>
                      <div className="flex flex-wrap items-start gap-2">
                        <Link
                          href={`/dashboard/domains/${subdomain.id}/records/${r.id}`}
                        >
                          <Button variant="secondary" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <form
                          action={deleteRecordAction.bind(
                            null,
                            subdomain.id,
                            r.id,
                          )}
                        >
                          <SubmitButton
                            variant="danger"
                            size="sm"
                            disabled={delegated || subdomain.status !== "active"}
                            pendingText="Deleting..."
                          >
                            Delete
                          </SubmitButton>
                        </form>
                        <PropagationButton recordId={r.id} />
                      </div>
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

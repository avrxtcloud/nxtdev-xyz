import { supabaseAdmin } from "@/db/supabaseAdmin";
import { getOrCreateAppUser } from "@/lib/auth";
import { getOwnedSubdomainOrThrow } from "@/lib/services/subdomains";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { Table, Td, Th } from "@/components/ui/table";
import {
  addNameserverAction,
  removeNameserverAction,
  switchBackAction,
} from "@/app/dashboard/domains/[subdomainId]/nameservers/actions";
import { getSystemFlags } from "@/lib/system/flags";

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
    <div className="grid gap-4">
      <Card>
        <div className="text-sm font-semibold">Nameserver delegation</div>
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Add NS records on{" "}
          <span className="font-mono">{subdomain.baseFqdn}</span> to delegate
          DNS control to an external provider. While delegated, internal DNS
          editing is disabled.
        </div>

        {subdomain.status !== "active" ? (
          <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
            This subdomain is suspended. Delegation changes are blocked.
          </div>
        ) : !flags.dnsEditingEnabled ? (
          <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
            {flags.maintenanceMessage}
          </div>
        ) : (
          <form
            action={addNameserverAction.bind(null, subdomain.id)}
            className="mt-4 flex flex-wrap gap-2"
          >
            <Input
              name="nameserver"
              placeholder="ns1.example.com"
              required
              className="max-w-md"
            />
            <SubmitButton pendingText="Adding...">Add nameserver</SubmitButton>
          </form>
        )}

        {delegated && delegated.length > 0 ? (
          <form action={switchBackAction.bind(null, subdomain.id)} className="mt-3">
            <SubmitButton
              variant="secondary"
              disabled={subdomain.status !== "active"}
              pendingText="Switching..."
            >
              Switch back to default DNS (remove all delegation)
            </SubmitButton>
          </form>
        ) : null}
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Delegated nameservers</div>
          <div className="text-xs text-zinc-500">{delegated?.length ?? 0} total</div>
        </div>

        <div className="mt-4">
          {!delegated || delegated.length === 0 ? (
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              No delegation configured.
            </div>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Nameserver</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {delegated.map((d) => (
                  <tr key={d.id}>
                    <Td className="font-mono">{d.nameserver}</Td>
                    <Td>
                      <form
                        action={removeNameserverAction.bind(
                          null,
                          subdomain.id,
                          d.id,
                        )}
                      >
                        <SubmitButton
                          variant="danger"
                          size="sm"
                          disabled={subdomain.status !== "active"}
                          pendingText="Removing..."
                        >
                          Remove
                        </SubmitButton>
                      </form>
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

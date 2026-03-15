import Link from "next/link";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { getOrCreateAppUser } from "@/lib/auth";
import {
  getOwnedSubdomainOrThrow,
  isDelegationEnabled,
} from "@/lib/services/subdomains";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { updateRecordAction } from "@/app/dashboard/domains/[subdomainId]/records/actions";

function asObject(v: unknown): Record<string, unknown> | null {
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  return v as Record<string, unknown>;
}

function asString(v: unknown, fallback: string) {
  return typeof v === "string" && v.length ? v : fallback;
}

function asNumber(v: unknown, fallback: number) {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

export default async function EditRecordPage({
  params,
}: {
  params: Promise<{ subdomainId: string; recordId: string }>;
}) {
  const { subdomainId, recordId } = await params;
  const { appUser } = await getOrCreateAppUser();
  const subdomain = await getOwnedSubdomainOrThrow({
    userId: appUser.id,
    subdomainId,
  });
  const delegated = await isDelegationEnabled(subdomain.id);

  const { data: record, error } = await supabaseAdmin
    .from("DnsRecord")
    .select("*")
    .eq("id", recordId)
    .eq("subdomainId", subdomain.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!record) throw new Error("Record not found");

  const disabled = delegated || subdomain.status !== "active";
  const data = asObject(record.data);

  return (
    <div className="grid gap-4">
      <Card>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">Edit record</div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              <span className="font-mono">{record.type}</span> ·{" "}
              <span className="font-mono">{record.fqdn}</span>
            </div>
          </div>
          <Link
            className="text-sm underline"
            href={`/dashboard/domains/${subdomain.id}/records`}
          >
            Back to records →
          </Link>
        </div>

        {disabled ? (
          <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
            Editing is disabled while delegation is enabled or the subdomain is
            suspended.
          </div>
        ) : (
          <form
            action={updateRecordAction.bind(null, subdomain.id, record.id)}
            className="mt-4 grid gap-3"
          >
            <input type="hidden" name="type" value={record.type} />
            <div className="grid gap-2 md:grid-cols-4">
              <div className="md:col-span-1">
                <label className="text-sm font-medium">Host</label>
                <div className="mt-1">
                  <Input name="host" defaultValue={record.host} />
                </div>
              </div>
              {record.type === "SRV" ? (
                <>
                  <div className="md:col-span-1">
                    <label className="text-sm font-medium">Service</label>
                    <div className="mt-1">
                      <Input
                        name="service"
                        defaultValue={asString(data?.service, "_service")}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <label className="text-sm font-medium">Proto</label>
                    <div className="mt-1">
                      <Input
                        name="proto"
                        defaultValue={asString(data?.proto, "_tcp")}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <label className="text-sm font-medium">Target</label>
                    <div className="mt-1">
                      <Input
                        name="target"
                        defaultValue={asString(data?.target, record.content)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="md:col-span-3">
                  <label className="text-sm font-medium">Content</label>
                  <div className="mt-1">
                    <Input name="content" defaultValue={record.content} />
                  </div>
                </div>
              )}
            </div>

            {record.type === "MX" ? (
              <div className="grid gap-2 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <div className="mt-1">
                    <Input
                      name="priority"
                      type="number"
                      defaultValue={record.priority ?? 10}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {record.type === "SRV" ? (
              <div className="grid gap-2 md:grid-cols-4">
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <div className="mt-1">
                    <Input
                      name="priority"
                      type="number"
                      defaultValue={asNumber(data?.priority, 0)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Weight</label>
                  <div className="mt-1">
                    <Input
                      name="weight"
                      type="number"
                      defaultValue={asNumber(data?.weight, 0)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Port</label>
                  <div className="mt-1">
                    <Input
                      name="port"
                      type="number"
                      defaultValue={asNumber(data?.port, 25565)}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {record.type === "A" ||
            record.type === "AAAA" ||
            record.type === "CNAME" ? (
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="proxied"
                  defaultChecked={record.proxied ?? false}
                />
                Proxied (Cloudflare)
              </label>
            ) : null}

            <div className="grid gap-2 md:grid-cols-3">
              <div>
                <label className="text-sm font-medium">TTL</label>
                <div className="mt-1">
                  <Input name="ttl" type="number" defaultValue={record.ttl} />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <SubmitButton pendingText="Saving...">Save</SubmitButton>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}

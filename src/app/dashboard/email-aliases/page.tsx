import { getOrCreateAppUser } from "@/lib/auth";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { env } from "@/lib/env";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CreateEmailAliasForm } from "./_components/create-form";
import { DeleteAliasButton, RefreshAliasButton } from "./_components/alias-actions";

function statusTone(status: string) {
  if (status === "active") return "ok" as const;
  if (status === "disabled") return "bad" as const;
  return "warn" as const;
}

export default async function EmailAliasesPage() {
  const { appUser } = await getOrCreateAppUser();
  const { data: aliases, error } = await supabaseAdmin
    .from("EmailAlias")
    .select("*")
    .eq("userId", appUser.id)
    .order("createdAt", { ascending: false });

  if (error) throw new Error(error.message);

  return (
    <div className="grid gap-8">
      <Card className="p-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex border-2 border-zinc-950 bg-cyan-200 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-zinc-950 shadow-[4px_4px_0_#facc15] dark:border-white">
              Email Masking
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
              Create private aliases on {env.EMAIL_ALIAS_DOMAIN}
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-bold leading-6 text-zinc-600 dark:text-zinc-300">
              Each mask gets a random address like{" "}
              <span className="font-mono text-zinc-950 dark:text-lime-300">
                a19f3c8b2d10@{env.EMAIL_ALIAS_DOMAIN}
              </span>
              . Incoming mail forwards through Cloudflare Email Routing after the destination inbox verifies Cloudflare's email.
            </p>
          </div>
          <div className="border-2 border-zinc-950 bg-amber-200 px-4 py-3 text-center shadow-[5px_5px_0_#18181b] dark:border-white dark:shadow-[5px_5px_0_#fafafa]">
            <div className="text-3xl font-black text-zinc-950">{aliases?.length ?? 0}/5</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-700">
              Masks used
            </div>
          </div>
        </div>
        {(aliases?.length ?? 0) >= 5 ? (
          <div className="border-2 border-zinc-950 bg-zinc-100 px-4 py-3 text-sm font-black text-zinc-700 dark:border-white dark:bg-zinc-900 dark:text-zinc-200">
            Alias limit reached. Delete an unused mask before creating another one.
          </div>
        ) : (
          <CreateEmailAliasForm />
        )}
      </Card>

      <Card className="p-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
              Your masks
            </h3>
            <p className="mt-2 text-sm font-bold text-zinc-500">
              Pending masks become active after the destination owner clicks Cloudflare's verification link.
            </p>
          </div>
        </div>

        {!aliases || aliases.length === 0 ? (
          <div className="border-2 border-dashed border-zinc-300 px-6 py-14 text-center dark:border-white/20">
            <p className="text-lg font-black text-zinc-950 dark:text-white">
              No email masks yet.
            </p>
            <p className="mt-2 text-sm font-bold text-zinc-500">
              Create one above, verify the destination inbox, then use the alias anywhere.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {aliases.map((alias) => (
              <div
                key={alias.id}
                className="grid gap-4 border-2 border-zinc-950 bg-white p-5 shadow-[5px_5px_0_#18181b] lg:grid-cols-[1fr_auto] lg:items-center dark:border-white dark:bg-zinc-950 dark:shadow-[5px_5px_0_#fafafa]"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="break-all font-mono text-lg font-black text-zinc-950 dark:text-lime-300">
                      {alias.aliasAddress}
                    </p>
                    <Badge tone={statusTone(alias.status as string)}>
                      {alias.status === "active" ? "Active" : alias.status === "disabled" ? "Disabled" : "Pending verification"}
                    </Badge>
                  </div>
                  <p className="mt-2 break-all text-sm font-bold text-zinc-500">
                    Forwards to {alias.destinationAddress}
                  </p>
                  {alias.status !== "active" ? (
                    <p className="mt-2 text-xs font-black text-amber-700 dark:text-amber-200">
                      Open the destination inbox and click Cloudflare's Verify email address link, then press Refresh.
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-3">
                  {alias.status !== "active" ? (
                    <RefreshAliasButton aliasId={alias.id as string} />
                  ) : null}
                  <DeleteAliasButton aliasId={alias.id as string} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

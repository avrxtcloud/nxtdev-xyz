import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { env } from "@/lib/env";
import { DocsHeader } from "../_components/docs-header";

function Mono(props: { children: React.ReactNode }) {
  return <span className="font-mono text-[0.95em]">{props.children}</span>;
}

export default function NsDelegationPage() {
  return (
    <div className="space-y-10">
      <DocsHeader
        title="NS delegation"
        badge={{ label: "Advanced", tone: "warn" }}
        description={
          <>
            Delegate your base subdomain (for example <Mono>alice.{env.ROOT_DOMAIN}</Mono>) to
            external nameservers. When delegation is enabled, internal DNS editing becomes
            read-only.
          </>
        }
      />

      <div className="grid gap-4">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-semibold">When to use delegation</div>
            <Badge tone="warn">Use carefully</Badge>
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
            <li>You want to manage all DNS from another provider (your own nameservers).</li>
            <li>You need DNS features not exposed by the editor.</li>
            <li>
              You understand that enabling delegation disables editing records here until you remove
              delegation.
            </li>
          </ul>
        </Card>

        <Card>
          <div className="text-sm font-semibold">How it works</div>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
            <li>Open your Dashboard → Nameserver Settings for your base subdomain.</li>
            <li>Add your external nameservers (example: <Mono>ns1.example.net</Mono>).</li>
            <li>
              We publish <Mono>NS</Mono> records at the base domain and lock the DNS editor to
              prevent conflicts.
            </li>
          </ol>
          <div className="mt-4 rounded-xl border border-amber-200/70 bg-amber-50/70 p-4 text-sm text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
            Make sure your external DNS is answering for your domain before enabling delegation, or
            you may cause downtime.
          </div>
        </Card>

        <Card>
          <div className="text-sm font-semibold">Switching back</div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            To re-enable the built-in DNS editor, remove all delegated nameservers. Once delegation
            is fully removed, you can edit records again.
          </p>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
            Record limits still apply while delegating. See <Link className="underline" href="/docs/limits">Limits</Link>.
          </p>
        </Card>
      </div>
    </div>
  );
}


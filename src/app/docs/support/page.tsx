import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { env } from "@/lib/env";
import { DocsHeader } from "../_components/docs-header";

function Mono(props: { children: React.ReactNode }) {
  return <span className="font-mono text-[0.95em]">{props.children}</span>;
}

export default function SupportPage() {
  return (
    <div className="space-y-10">
      <DocsHeader
        title="Support"
        badge={{ label: "Help", tone: "neutral" }}
        description={
          <>
            Need a hand with <span className="font-medium">{env.ROOT_DOMAIN}</span>? Here are the
            fastest ways to get help.
          </>
        }
      />

      <div className="grid gap-4">
        <Card>
          <div className="text-sm font-semibold">Contact</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
            <li>
              Account and product support: <Mono>support@nxtdev.xyz</Mono>
            </li>
            <li>
              Abuse reports: use <Link className="underline" href="/report">/report</Link>
            </li>
            <li>
              Service status: <Link className="underline" href="/status">/status</Link>
            </li>
          </ul>
        </Card>

        <Card>
          <div className="text-sm font-semibold">What to include</div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Including the details below helps us resolve issues quickly:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
            <li>Your base subdomain (example: <Mono>alice.{env.ROOT_DOMAIN}</Mono>).</li>
            <li>The record type/host/content you attempted to add or change.</li>
            <li>Any error message shown in the dashboard.</li>
            <li>If it&apos;s a propagation issue, mention which resolver you tested.</li>
          </ul>
        </Card>

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-semibold">Delegation help</div>
            <Badge tone="warn">Advanced</Badge>
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            If you enabled NS delegation and can&apos;t edit DNS records anymore, that&apos;s expected:
            delegation makes DNS editing read-only. See{" "}
            <Link className="underline" href="/docs/nsdelegation">
              NS delegation
            </Link>{" "}
            for how to switch back.
          </p>
        </Card>
      </div>
    </div>
  );
}


import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { env } from "@/lib/env";
import { DocsHeader } from "../_components/docs-header";

export default function QuickStartPage() {
  return (
    <div className="space-y-10">
      <DocsHeader
        title="Quick start"
        badge={{ label: "Start here", tone: "ok" }}
        description={
          <>
            Claim a free subdomain under <span className="font-medium">{env.ROOT_DOMAIN}</span> and
            publish DNS records in minutes.
          </>
        }
      />

      <div className="grid gap-4">
        <Card>
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold">1) Create an account</div>
            <Badge>Required</Badge>
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Sign in, then open your <Link className="underline" href="/dashboard">Dashboard</Link>.
          </p>
        </Card>

        <Card>
          <div className="text-sm font-semibold">2) Claim your base subdomain</div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Pick a label (example: <span className="font-mono">alice</span>) to claim{" "}
            <span className="font-mono">alice.{env.ROOT_DOMAIN}</span>.
          </p>
          <div className="mt-4 grid gap-2 rounded-xl border border-zinc-200/70 bg-white/60 p-4 text-sm dark:border-white/10 dark:bg-zinc-950/40">
            <div className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
              Tips
            </div>
            <ul className="list-disc space-y-1 pl-5 text-zinc-600 dark:text-zinc-300">
              <li>Use a short, memorable label.</li>
              <li>Labels may be blocked by safety policy (phishing/impersonation patterns).</li>
              <li>You can claim up to 2 base subdomains per account.</li>
            </ul>
          </div>
        </Card>

        <Card>
          <div className="text-sm font-semibold">3) Add DNS records</div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Create records for hosts like <span className="font-mono">@</span> (apex),{" "}
            <span className="font-mono">api</span>, or <span className="font-mono">blog</span>.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200/70 bg-white/60 p-4 dark:border-white/10 dark:bg-zinc-950/40">
              <div className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                Website (CNAME)
              </div>
              <div className="mt-2 text-sm">
                <span className="font-mono">blog</span> →{" "}
                <span className="font-mono">cname.vercel-dns.com</span>
              </div>
            </div>
            <div className="rounded-xl border border-zinc-200/70 bg-white/60 p-4 dark:border-white/10 dark:bg-zinc-950/40">
              <div className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                API (A)
              </div>
              <div className="mt-2 text-sm">
                <span className="font-mono">api</span> → <span className="font-mono">203.0.113.10</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
            See <Link className="underline" href="/docs/record-types">Record types</Link> for the
            full list and validation rules.
          </p>
        </Card>

        <Card>
          <div className="text-sm font-semibold">4) Check propagation</div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            DNS changes are eventually consistent. Use the built-in propagation checker to compare
            results across public resolvers.
          </p>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
            If records do not appear after a few minutes, double-check the host name and record type
            and confirm your target service has finished its own verification.
          </p>
        </Card>
      </div>
    </div>
  );
}


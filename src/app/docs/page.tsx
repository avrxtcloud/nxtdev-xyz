import { Card } from "@/components/ui/card";
import { env } from "@/lib/env";

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Docs</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          {env.ROOT_DOMAIN} lets authenticated users claim free subdomains and
          manage DNS records inside a single Cloudflare zone.
        </p>
      </div>

      <div className="mt-8 grid gap-4">
        <Card>
          <div className="text-sm font-semibold">Quick start</div>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
            <li>Create an account and sign in.</li>
            <li>
              Claim a base label (example:{" "}
              <span className="font-mono">alice</span>) to get{" "}
              <span className="font-mono">alice.{env.ROOT_DOMAIN}</span>.
            </li>
            <li>
              Add DNS records for hosts like <span className="font-mono">@</span>{" "}
              (apex), <span className="font-mono">api</span>, or{" "}
              <span className="font-mono">blog</span>.
            </li>
            <li>Use “Check propagation” to see what public resolvers return.</li>
          </ol>
        </Card>

        <Card>
          <div className="text-sm font-semibold">Limits</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
            <li>Maximum base subdomains per user: 2.</li>
            <li>Maximum DNS records per base subdomain: 100 (includes SRV and delegated NS).</li>
          </ul>
        </Card>

        <Card>
          <div className="text-sm font-semibold">Record types</div>
          <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
            Supported DNS records:{" "}
            <span className="font-mono">A</span>,{" "}
            <span className="font-mono">AAAA</span>,{" "}
            <span className="font-mono">CNAME</span>,{" "}
            <span className="font-mono">TXT</span>,{" "}
            <span className="font-mono">MX</span>,{" "}
            <span className="font-mono">SRV</span>,{" "}
            <span className="font-mono">NS</span> (delegation only).
          </div>
        </Card>

        <Card>
          <div className="text-sm font-semibold">Host naming rules</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
            <li>
              Use <span className="font-mono">@</span> for the apex of your base
              subdomain (example: <span className="font-mono">alice.{env.ROOT_DOMAIN}</span>).
            </li>
            <li>
              Use relative names like <span className="font-mono">api</span> to
              target <span className="font-mono">api.alice.{env.ROOT_DOMAIN}</span>.
            </li>
            <li>
              You cannot create records outside your base domain; the server validates this.
            </li>
          </ul>
        </Card>

        <Card>
          <div className="text-sm font-semibold">Delegation (NS)</div>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
            If you add delegated nameservers (NS) at your base domain, internal
            DNS editing becomes read‑only. To switch back, remove all delegated
            nameservers.
          </p>
        </Card>

        <Card>
          <div className="text-sm font-semibold">Safety checks</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
            <li>Phishing/impersonation keyword patterns are blocked.</li>
            <li>
              <span className="font-mono">A</span>/<span className="font-mono">AAAA</span>{" "}
              targets are checked for IP reputation; high‑risk IPs are rejected.
            </li>
            <li>
              Subdomains accumulate a risk score. High risk may lead to automatic suspension.
            </li>
          </ul>
        </Card>

        <Card>
          <div className="text-sm font-semibold">Need help?</div>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
            Use the <span className="font-mono">/report</span> page for abuse
            reports. For account issues, contact support at{" "}
            <span className="font-mono">support@nxtdev.xyz</span>.
          </p>
        </Card>
      </div>
    </main>
  );
}

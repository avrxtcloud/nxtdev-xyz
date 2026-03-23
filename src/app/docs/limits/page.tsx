import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { env } from "@/lib/env";
import { DocsHeader } from "../_components/docs-header";

export default function LimitsPage() {
  return (
    <div className="space-y-10">
      <DocsHeader
        title="Limits"
        badge={{ label: "Reference", tone: "neutral" }}
        description={
          <>
            These limits keep <span className="font-medium">{env.ROOT_DOMAIN}</span> fast and safe
            for everyone.
          </>
        }
      />

      <div className="grid gap-4">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-semibold">Subdomains</div>
            <Badge>Max 2</Badge>
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
            <li>Maximum base subdomains per user: <span className="font-medium">2</span>.</li>
            <li>
              Example base subdomain: <span className="font-mono">alice.{env.ROOT_DOMAIN}</span>.
            </li>
          </ul>
        </Card>

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-semibold">Records</div>
            <Badge>Max 100</Badge>
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
            <li>Maximum records per base subdomain: <span className="font-medium">100</span>.</li>
            <li>
              This total includes standard DNS records, SRV records, and delegated nameservers (NS).
            </li>
          </ul>
        </Card>

        <Card>
          <div className="text-sm font-semibold">TTL</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
            <li>Minimum TTL: <span className="font-medium">60</span> seconds.</li>
            <li>Maximum TTL: <span className="font-medium">86400</span> seconds (24 hours).</li>
            <li>Default TTL: <span className="font-medium">3600</span> seconds (1 hour).</li>
          </ul>
        </Card>

        <Card>
          <div className="text-sm font-semibold">Rate limits</div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            To prevent abuse, changes are rate-limited per account:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
            <li>Most DNS create/update actions: up to <span className="font-medium">60</span> per hour.</li>
            <li>DNS deletes: up to <span className="font-medium">120</span> per hour.</li>
            <li>Delegation changes (adding nameservers): up to <span className="font-medium">30</span> per hour.</li>
          </ul>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
            If you hit a limit you&apos;ll see:{" "}
            <span className="font-medium">
              Too many changes recently. Please slow down and try again.
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
}


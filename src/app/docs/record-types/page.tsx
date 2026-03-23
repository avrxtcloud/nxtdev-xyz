import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DocsHeader } from "../_components/docs-header";

function Mono(props: { children: React.ReactNode }) {
  return <span className="font-mono text-[0.95em]">{props.children}</span>;
}

export default function RecordTypesPage() {
  return (
    <div className="space-y-10">
      <DocsHeader
        title="Record types"
        badge={{ label: "Reference", tone: "neutral" }}
        description={
          <>
            Supported DNS records and the rules enforced by the editor and API.
          </>
        }
      />

      <div className="grid gap-4">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-semibold">Supported types</div>
            <div className="flex flex-wrap gap-2">
              {["A", "AAAA", "CNAME", "TXT", "MX", "SRV", "NS"].map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
            <Mono>NS</Mono> is for delegation only (managed in Nameserver Settings). The standard DNS
            editor blocks creating <Mono>NS</Mono> records directly.
          </p>
        </Card>

        <Card>
          <div className="text-sm font-semibold">Host format</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
            <li>
              Use <Mono>@</Mono> for the apex of your base subdomain.
            </li>
            <li>
              Use relative names like <Mono>api</Mono> or <Mono>blog</Mono>.
            </li>
            <li>
              Allowed characters: lowercase <Mono>a-z</Mono>, digits <Mono>0-9</Mono>,{" "}
              <Mono>.</Mono>, <Mono>_</Mono>, and <Mono>-</Mono>.
            </li>
            <li>Max host label length: 63 characters.</li>
            <li>Host cannot start or end with a dot.</li>
          </ul>
        </Card>

        <Card>
          <div className="text-sm font-semibold">Type-specific rules</div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200/70 bg-white/60 p-4 dark:border-white/10 dark:bg-zinc-950/40">
              <div className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                A / AAAA
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                <li><Mono>A</Mono> requires an IPv4 address.</li>
                <li><Mono>AAAA</Mono> requires an IPv6 address.</li>
                <li><Mono>proxied</Mono> is allowed.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200/70 bg-white/60 p-4 dark:border-white/10 dark:bg-zinc-950/40">
              <div className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                CNAME
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                <li>Content must be a hostname (not an IP).</li>
                <li><Mono>proxied</Mono> is allowed.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200/70 bg-white/60 p-4 dark:border-white/10 dark:bg-zinc-950/40">
              <div className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                TXT
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                <li>Content length: 1–1024 characters.</li>
                <li><Mono>proxied</Mono> is not available.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200/70 bg-white/60 p-4 dark:border-white/10 dark:bg-zinc-950/40">
              <div className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                MX
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                <li>Content must be a hostname (not an IP).</li>
                <li>Priority: 0–65535.</li>
                <li><Mono>proxied</Mono> is not available.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200/70 bg-white/60 p-4 dark:border-white/10 dark:bg-zinc-950/40 md:col-span-2">
              <div className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                SRV
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                <li>Service must look like <Mono>_sip</Mono>.</li>
                <li>Proto must be one of <Mono>_tcp</Mono>, <Mono>_udp</Mono>, or <Mono>_tls</Mono>.</li>
                <li>Port: 1–65535.</li>
                <li>Priority/weight: 0–65535.</li>
                <li>Target must be a hostname.</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-zinc-200/70 bg-white/60 p-4 text-sm text-zinc-600 dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-300">
            <div className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
              Proxied
            </div>
            <p className="mt-2">
              <Mono>proxied</Mono> can only be enabled for <Mono>A</Mono>, <Mono>AAAA</Mono>, and{" "}
              <Mono>CNAME</Mono> records.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}


import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { env } from "@/lib/env";
import { DocsHeader } from "./_components/docs-header";
import { DOC_SECTIONS } from "./_components/docs-links";

function IconArrow(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="16"
      height="16"
      fill="currentColor"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M7.5 4.5a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 1 1-1.4-1.4L11.8 11H3a1 1 0 1 1 0-2h8.8L7.5 5.9a1 1 0 0 1 0-1.4z" />
    </svg>
  );
}

export default function DocsIndexPage() {
  return (
    <div className="space-y-10">
      <DocsHeader
        title="Documentation"
        badge={{ label: "DNS + subdomains", tone: "neutral" }}
        description={
          <>
            {env.ROOT_DOMAIN} lets authenticated users claim free subdomains and manage DNS records
            inside a single Cloudflare zone. Pick a topic below to get started.
          </>
        }
      />

      <div className="grid gap-8">
        {DOC_SECTIONS.map((section) => (
          <section key={section.title} className="space-y-3">
            <div className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
              {section.title}
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {section.items.map((item) => (
                <Link key={item.href} href={item.href} className="group">
                  <Card className="flex h-full items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-sm font-semibold">{item.title}</div>
                        {item.badge ? <Badge tone="ok">{item.badge}</Badge> : null}
                      </div>
                      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                        {item.description}
                      </div>
                    </div>
                    <IconArrow className="mt-1 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-200" />
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Card>
        <div className="text-sm font-semibold">Need help?</div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          For account issues, contact <span className="font-mono">support@nxtdev.xyz</span>. For
          abuse reports, use <Link className="underline" href="/report">/report</Link>. For service
          status, open <Link className="underline" href="/status">/status</Link>.
        </p>
      </Card>
    </div>
  );
}


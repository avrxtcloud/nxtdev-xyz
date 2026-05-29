import Link from "next/link";
import { Show, SignUpButton } from "@clerk/nextjs";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";

const featureRows = [
  {
    label: "Name",
    value: "studio",
    suffix: ".nxtdev.xyz",
    tone: "bg-amber-300 text-zinc-950",
  },
  {
    label: "Target",
    value: "cname.vercel-dns.com",
    suffix: "CNAME",
    tone: "bg-cyan-300 text-zinc-950",
  },
  {
    label: "Safety",
    value: "phishing + IP reputation",
    suffix: "PASS",
    tone: "bg-lime-300 text-zinc-950",
  },
];

const routes = [
  ["A", "192.0.2.24", "edge node"],
  ["TXT", "site-verification=ready", "verified"],
  ["MX", "route.mx.cloudflare.net", "email"],
  ["SRV", "_minecraft._tcp", "game server"],
];

const useCases = [
  {
    title: "Launch previews",
    copy: "Give every demo, client build, and hackathon project a real domain before it is famous.",
    accent: "border-l-amber-400",
  },
  {
    title: "Home labs",
    copy: "Keep self-hosted services reachable with DDNS that syncs through the same control plane.",
    accent: "border-l-cyan-400",
  },
  {
    title: "API sandboxes",
    copy: "Point staging backends, docs, and webhooks at clean names your team can remember.",
    accent: "border-l-lime-400",
  },
];

function NodeIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M18 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M7.7 6.5 15.6 10" />
      <path d="M8.4 18.2 15.6 14" />
      <path d="M6 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
  );
}

function ArrowIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:pb-28 lg:pt-16">
        <AnnouncementBanner />

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 border border-zinc-900 bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-zinc-950 shadow-[5px_5px_0_#18181b] dark:border-white dark:bg-zinc-950 dark:text-white dark:shadow-[5px_5px_0_#f4f4f5]">
              <span className="h-2 w-2 bg-lime-400" />
              Free developer DNS
            </div>

            <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[0.94] tracking-tight text-zinc-950 sm:text-7xl lg:text-8xl dark:text-white">
              Your next project deserves a real address.
            </h1>

            <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-zinc-600 dark:text-zinc-300">
              Claim a clean <strong className="text-zinc-950 dark:text-white">{env.ROOT_DOMAIN}</strong>{" "}
              subdomain, wire up DNS records, and ship with guardrails for abuse, routing, and verification.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Show when="signed-out">
                <SignUpButton mode="modal">
                  <Button size="lg" className="rounded-lg bg-zinc-950 text-white shadow-[6px_6px_0_#facc15] hover:bg-zinc-800 dark:bg-white dark:text-zinc-950">
                    Claim a subdomain
                    <ArrowIcon className="h-4 w-4" />
                  </Button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Link href="/dashboard">
                  <Button size="lg" className="rounded-lg bg-zinc-950 text-white shadow-[6px_6px_0_#facc15] hover:bg-zinc-800 dark:bg-white dark:text-zinc-950">
                    Open dashboard
                    <ArrowIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </Show>
              <Link href="/docs">
                <Button variant="outline" size="lg" className="rounded-lg border-2 border-zinc-950 bg-white text-zinc-950 hover:bg-zinc-100 dark:border-white dark:bg-zinc-950 dark:text-white">
                  Read the docs
                </Button>
              </Link>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-3 text-sm">
              {[
                ["2", "free names"],
                ["100", "DNS records"],
                ["24/7", "edge sync"],
              ].map(([value, label]) => (
                <div key={label} className="border-l-2 border-zinc-950 pl-3 dark:border-white">
                  <dt className="text-2xl font-black text-zinc-950 dark:text-white">{value}</dt>
                  <dd className="mt-1 font-bold text-zinc-500 dark:text-zinc-400">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative min-h-[560px]">
            <div className="absolute inset-x-0 top-8 h-[420px] rotate-[-3deg] border-2 border-zinc-950 bg-amber-200 shadow-[14px_14px_0_#18181b] dark:border-white dark:bg-amber-300 dark:shadow-[14px_14px_0_#fafafa]" />
            <div className="relative border-2 border-zinc-950 bg-zinc-950 text-white shadow-[10px_10px_0_#22d3ee] dark:border-white">
              <div className="flex items-center justify-between border-b-2 border-white/20 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 bg-red-400" />
                  <span className="h-3 w-3 bg-amber-300" />
                  <span className="h-3 w-3 bg-lime-300" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  domain console
                </span>
              </div>

              <div className="grid gap-0 lg:grid-cols-[1fr_190px]">
                <div className="p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-sm font-bold text-cyan-300">nxtdev create</p>
                      <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                        studio.{env.ROOT_DOMAIN}
                      </h2>
                    </div>
                    <Badge tone="ok" className="rounded bg-lime-300 px-3 py-1 font-black text-zinc-950">
                      Live
                    </Badge>
                  </div>

                  <div className="mt-8 grid gap-3">
                    {featureRows.map((row) => (
                      <div key={row.label} className="grid gap-3 border border-white/15 bg-white/[0.06] p-4 sm:grid-cols-[92px_1fr_auto] sm:items-center">
                        <span className="text-xs font-black uppercase tracking-[0.18em] text-zinc-400">
                          {row.label}
                        </span>
                        <span className="min-w-0 font-mono text-sm font-bold text-white">
                          {row.value}
                        </span>
                        <span className={`w-fit px-2 py-1 font-mono text-[11px] font-black ${row.tone}`}>
                          {row.suffix}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border border-white/15 bg-black/40 p-4">
                    <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-zinc-400">
                      <NodeIcon className="h-5 w-5 text-lime-300" />
                      Propagation map
                    </div>
                    <div className="mt-5 grid grid-cols-4 gap-2">
                      {["SIN", "FRA", "SFO", "BOM", "IAD", "LHR", "TYO", "SYD"].map((node, index) => (
                        <div
                          key={node}
                          className="border border-white/15 bg-white/[0.04] px-2 py-3 text-center font-mono text-xs font-black"
                        >
                          <span className={index % 3 === 0 ? "text-amber-300" : "text-cyan-300"}>{node}</span>
                          <div className="mt-2 h-1 bg-lime-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-white/15 bg-white/[0.04] p-5 lg:border-l-2 lg:border-t-0">
                  <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                    Record stack
                  </p>
                  <div className="mt-5 grid gap-3">
                    {routes.map(([type, target, note]) => (
                      <div key={`${type}-${target}`} className="border border-white/15 bg-zinc-950 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="bg-white px-2 py-1 font-mono text-xs font-black text-zinc-950">
                            {type}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-wider text-lime-300">
                            {note}
                          </span>
                        </div>
                        <p className="mt-3 break-words font-mono text-xs font-bold text-zinc-300">
                          {target}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-950 bg-white py-5 dark:border-white dark:bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm font-black uppercase tracking-[0.18em] text-zinc-950 sm:px-6 md:flex-row md:items-center md:justify-between dark:text-white">
          <span>Cloudflare DNS</span>
          <span>AbuseIPDB checks</span>
          <span>DDNS API</span>
          <span>Email aliases</span>
          <span>NS delegation</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-300">
              Built for messy shipping
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
              A name system that moves as fast as the project.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {useCases.map((useCase) => (
              <article
                key={useCase.title}
                className={`border-l-4 ${useCase.accent} bg-white p-6 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-white/10`}
              >
                <h3 className="text-xl font-black text-zinc-950 dark:text-white">{useCase.title}</h3>
                <p className="mt-4 text-sm font-medium leading-6 text-zinc-600 dark:text-zinc-300">
                  {useCase.copy}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
          <Link href="/DynamicDns" className="group border-2 border-zinc-950 bg-lime-200 p-7 text-zinc-950 shadow-[6px_6px_0_#18181b] transition-transform hover:-translate-y-1 dark:border-white dark:shadow-[6px_6px_0_#fafafa]">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-black">Dynamic DNS</h3>
              <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="mt-4 text-sm font-bold leading-6">
              Keep a changing IP attached to a stable subdomain for labs, game servers, and always-on side projects.
            </p>
          </Link>
          <Link href="/email-routing" className="group border-2 border-zinc-950 bg-cyan-200 p-7 text-zinc-950 shadow-[6px_6px_0_#18181b] transition-transform hover:-translate-y-1 dark:border-white dark:shadow-[6px_6px_0_#fafafa]">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-black">Email masking</h3>
              <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="mt-4 text-sm font-bold leading-6">
              Create disposable addresses on your domain and forward them without exposing your real inbox.
            </p>
          </Link>
          <Link href="/docs/quick-start" className="group border-2 border-zinc-950 bg-amber-200 p-7 text-zinc-950 shadow-[6px_6px_0_#18181b] transition-transform hover:-translate-y-1 dark:border-white dark:shadow-[6px_6px_0_#fafafa]">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-black">Quick start</h3>
              <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="mt-4 text-sm font-bold leading-6">
              Go from claim to DNS record to verified deployment with docs made for copy-paste momentum.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}

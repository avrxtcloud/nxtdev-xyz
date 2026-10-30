import Link from "next/link";
import { Show, SignUpButton } from "@clerk/nextjs";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { HomeSubdomainSearch } from "@/components/home-subdomain-search";
import { env } from "@/lib/env";

export const dynamic = "force-dynamic";

const modules = [
  ["01", "Verified domains", "Claim a focused developer address after linking your GitHub identity."],
  ["02", "Clean DNS", "A, AAAA, CNAME, and TXT—nothing you do not need to ship."],
  ["03", "Safety signals", "Built-in abuse checks, moderation, and an accountable platform audit trail."],
] as const;

export default function Home() {
  return <main>
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-7 sm:px-6 sm:pb-24 lg:pt-12">
      <AnnouncementBanner />
      <div className="grid gap-12 pt-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:pt-20">
        <div><p className="avrxt-eyebrow">nxtdev.xyz / independent by design</p><h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[.88] tracking-[-.09em] text-white sm:text-7xl lg:text-[6.5rem]">A clear address<br /><span className="text-zinc-600">for your next build.</span></h1><p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">Free developer subdomains, stripped down to the DNS records that matter. No Cloudflare proxy mode. No inherited provider complexity.</p><div className="mt-9"><HomeSubdomainSearch rootDomain={env.ROOT_DOMAIN} /></div><div className="mt-5 flex flex-wrap gap-3"><Show when="signed-out"><SignUpButton mode="modal"><button className="h-11 rounded-lg bg-violet-300 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-violet-200">Claim your name →</button></SignUpButton></Show><Show when="signed-in"><Link className="inline-flex h-11 items-center rounded-lg bg-violet-300 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-violet-200" href="/dashboard">Open workspace →</Link></Show><Link className="inline-flex h-11 items-center rounded-lg border border-white/15 px-5 text-sm text-zinc-300 hover:bg-white/[.06]" href="/docs">Read documentation</Link></div></div>
        <div className="avrxt-panel rounded-2xl p-4 sm:p-6"><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="avrxt-eyebrow text-zinc-500">Live configuration</span><span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em] text-emerald-300"><i className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> DNS only</span></div><div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 font-mono text-sm"><p className="text-zinc-500">domain /</p><p className="mt-1 break-all text-xl font-semibold text-white">studio.{env.ROOT_DOMAIN}</p><div className="mt-8 grid gap-2">{[["A", "192.0.2.18"], ["CNAME", "cname.vercel-dns.com"], ["TXT", "verify=nxtdev"]].map(([type, value]) => <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 rounded-lg border border-white/[.08] bg-white/[.025] p-3" key={type}><span className="w-fit rounded bg-violet-300 px-2 py-1 text-[11px] font-bold text-zinc-950">{type}</span><span className="truncate pt-1 text-xs text-zinc-300">{value}</span></div>)}</div></div></div>
      </div>
    </section>
    <section className="border-y border-white/10 bg-white/[.025] px-4 py-6 sm:px-6"><div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-3">{[["02", "free names per account"], ["04", "supported DNS record types"], ["100", "records per domain"]].map(([value, label]) => <div className="flex items-center gap-4" key={label}><span className="font-mono text-2xl text-violet-200">{value}</span><span className="text-xs uppercase tracking-[.16em] text-zinc-500">{label}</span></div>)}</div></section>
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28"><div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="avrxt-eyebrow">Focused platform</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.06em] text-white sm:text-4xl">Less panel. More progress.</h2></div><p className="max-w-sm text-sm leading-6 text-zinc-500">The public product and controls now share one intentional system.</p></div><div className="grid gap-3 md:grid-cols-3">{modules.map(([number, title, detail]) => <article className="avrxt-grid-card rounded-2xl p-6" key={number}><p className="avrxt-eyebrow text-zinc-600">{number}</p><h3 className="mt-12 text-xl font-semibold tracking-[-.04em] text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-400">{detail}</p></article>)}</div></section>
  </main>;
}

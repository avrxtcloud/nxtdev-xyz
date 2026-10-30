import Link from "next/link";

const routes = [
  { label: "Domains", href: "/dashboard/domains", detail: "Claim a name and configure A, AAAA, CNAME, or TXT records.", code: "DNS" },
  { label: "Dynamic DNS", href: "/dashboard/api-keys", detail: "Keep a changing connection pointed at a stable address.", code: "DDNS" },
  { label: "Email masks", href: "/dashboard/email-aliases", detail: "Create a private relay address without exposing your inbox.", code: "MAIL" },
  { label: "Short links", href: "/dashboard/short-links", detail: "Manage compact, shareable links for your project.", code: "LINK" },
];

export default function DashboardHome() {
  return <div className="space-y-6">
    <section className="avrxt-panel overflow-hidden rounded-2xl p-6 sm:p-9">
      <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="avrxt-eyebrow">Workspace / overview</p><h1 className="mt-4 text-4xl font-semibold tracking-[-.07em] text-white sm:text-6xl">Build on a name<br className="hidden sm:block" /> that stays yours.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">A focused workspace for developer identities and DNS. Records are always DNS-only, provider controls stay behind the platform.</p></div><Link href="/dashboard/domains" className="inline-flex h-11 items-center justify-center rounded-lg bg-violet-300 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-violet-200">Claim a domain <span className="ml-2">↗</span></Link></div>
      <div className="mt-9 grid grid-cols-3 border-t border-white/10 pt-5 text-center sm:max-w-md"><div><p className="avrxt-eyebrow text-zinc-600">Names</p><p className="mt-2 text-2xl font-semibold">02</p></div><div className="border-x border-white/10"><p className="avrxt-eyebrow text-zinc-600">Record types</p><p className="mt-2 text-2xl font-semibold">04</p></div><div><p className="avrxt-eyebrow text-zinc-600">Mode</p><p className="mt-2 text-2xl font-semibold">DNS</p></div></div>
    </section>
    <section><div className="mb-4 flex items-center justify-between"><p className="avrxt-eyebrow">Workspace tools</p><span className="font-mono text-[10px] uppercase tracking-[.18em] text-zinc-600">Select a module</span></div><div className="grid gap-3 sm:grid-cols-2">{routes.map((route) => <Link className="avrxt-grid-card group rounded-2xl p-5 sm:p-6" href={route.href} key={route.href}><div className="flex items-start justify-between"><span className="font-mono text-[11px] font-bold tracking-[.18em] text-violet-200">{route.code}</span><span className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-violet-200">→</span></div><h2 className="mt-9 text-xl font-semibold tracking-[-.04em] text-white">{route.label}</h2><p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">{route.detail}</p></Link>)}</div></section>
  </div>;
}

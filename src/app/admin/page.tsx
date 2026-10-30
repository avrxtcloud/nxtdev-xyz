import Link from "next/link";

const controls = [
  ["Domain moderation", "Review claimed names, suspend abuse, and protect the zone.", "/admin/subdomains"],
  ["Safety desk", "Triage abuse reports and preserve a clear audit trail.", "/admin/reports"],
  ["System signals", "Control maintenance, registration, DNS editing, and notices.", "/admin/settings"],
  ["Audit ledger", "Review sensitive platform actions in chronological order.", "/admin/audit"],
] as const;

export default function AdminHome() {
  return <div className="grid gap-4 md:grid-cols-2">{controls.map(([title, detail, href], index) => <Link href={href} key={href} className="avrxt-grid-card group rounded-2xl p-6"><div className="flex items-start justify-between"><span className="avrxt-eyebrow text-zinc-600">0{index + 1}</span><span className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-violet-200">→</span></div><h2 className="mt-12 text-xl font-semibold tracking-[-.04em] text-white">{title}</h2><p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">{detail}</p></Link>)}</div>;
}

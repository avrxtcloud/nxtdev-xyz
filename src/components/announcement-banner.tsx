import Link from "next/link";
import { getActiveAnnouncements } from "@/lib/system/announcements";
import { getSystemFlags } from "@/lib/system/flags";

const tone = { info: "border-violet-300/35 bg-violet-300/[.08] text-violet-100", warn: "border-amber-300/35 bg-amber-300/[.08] text-amber-100", danger: "border-red-400/40 bg-red-400/[.09] text-red-100" } as const;

export async function AnnouncementBanner({ showAdminLink = false }: { showAdminLink?: boolean }) {
  const [flags, announcements] = await Promise.all([getSystemFlags(), getActiveAnnouncements(2)]);
  const maintenance = !flags.domainCreationEnabled || !flags.dnsEditingEnabled ? [{ title: "Maintenance in progress", body: flags.maintenanceMessage, level: "warn" as const }] : [];
  const items = [...maintenance, ...announcements.map(({ title, body, level }) => ({ title, body, level: level as keyof typeof tone }))].slice(0, 2);
  if (!items.length) return null;
  return <section aria-label="Platform notices" className="grid gap-2">{items.map((item, index) => <div key={`${item.title}-${index}`} className={`rounded-xl border px-4 py-3 sm:px-5 ${tone[item.level] ?? tone.info}`}><div className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current animate-signal-pulse" /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-sm font-semibold">{item.title}</h2><span className="font-mono text-[9px] uppercase tracking-[.17em] opacity-70">{item.level === "warn" ? "system notice" : "platform update"}</span></div><p className="mt-1 text-sm leading-6 opacity-80">{item.body}</p></div>{showAdminLink ? <Link className="shrink-0 text-xs font-medium underline underline-offset-4" href="/admin/announcements">Manage</Link> : null}</div></div>)}</section>;
}

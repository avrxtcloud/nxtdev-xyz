import Link from "next/link";
import type { Metadata } from "next";
import { unstable_rethrow } from "next/navigation";
import { getOrCreateAppUser } from "@/lib/auth";
import { AnnouncementBanner } from "@/components/announcement-banner";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Console", description: "Manage your verified domains and DNS records." };

const nav = [
  ["Overview", "/dashboard"], ["Domains", "/dashboard/domains"], ["Dynamic DNS", "/dashboard/api-keys"],
  ["Email masks", "/dashboard/email-aliases"], ["Short links", "/dashboard/short-links"], ["Reports", "/dashboard/reports"],
] as const;

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  try {
    const { appUser, isAdmin, isGithubVerified } = await getOrCreateAppUser();
    return (
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:py-10">
        <AnnouncementBanner />
        <div className="mt-5 grid gap-6 lg:grid-cols-[218px_minmax(0,1fr)]">
          <aside className="avrxt-panel h-fit rounded-2xl p-3 lg:sticky lg:top-24">
            <div className="border-b border-white/10 px-3 pb-4 pt-2">
              <p className="avrxt-eyebrow">nxtdev console</p>
              <p className="mt-2 truncate text-sm font-medium text-white">{appUser.email}</p>
              <div className="mt-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[.16em] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-signal-pulse" /> account active</div>
            </div>
            <nav className="mt-3 grid gap-1">
              {nav.map(([label, href], index) => <Link key={href} href={href} className={`rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/[.07] hover:text-white ${index === 0 ? "bg-white/[.07] text-white" : "text-zinc-400"}`}>{label}</Link>)}
            </nav>
            <div className="mt-4 border-t border-white/10 px-3 pt-4">
              {!isGithubVerified ? <Link href="/dashboard/verify" className="block rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-2.5 text-xs font-medium text-amber-100">Connect GitHub to unlock DNS changes →</Link> : null}
              {isAdmin ? <Link href="/admin" className="mt-2 block rounded-lg border border-violet-300/30 bg-violet-300/10 px-3 py-2.5 text-xs font-medium text-violet-100">Open admin control →</Link> : null}
            </div>
          </aside>
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    );
  } catch (error) {
    unstable_rethrow(error);
    return <div className="mx-auto max-w-xl px-4 py-24"><div className="avrxt-panel rounded-2xl p-8"><p className="avrxt-eyebrow">Console unavailable</p><h1 className="mt-3 text-3xl font-semibold tracking-[-.05em]">We could not open your workspace.</h1><p className="mt-3 text-sm leading-6 text-zinc-400">Sign in again or contact support if this continues.</p><Link className="mt-6 inline-flex rounded-lg bg-violet-300 px-4 py-2 text-sm font-semibold text-zinc-950" href="/sign-in">Sign in</Link></div></div>;
  }
}

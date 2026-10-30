import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin control", description: "Administrative controls for the nxtdev platform." };

const links = [["Overview", "/admin"], ["Domains", "/admin/subdomains"], ["Users", "/admin/users"], ["DNS records", "/admin/records"], ["Abuse reports", "/admin/reports"], ["Reserved names", "/admin/reservations"], ["Announcements", "/admin/announcements"], ["Audit log", "/admin/audit"], ["System", "/admin/settings"]] as const;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:py-10">
      <header className="avrxt-panel rounded-2xl p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="avrxt-eyebrow">restricted / platform control</p><h1 className="mt-3 text-3xl font-semibold tracking-[-.06em] text-white sm:text-4xl">Admin console</h1><p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">Monitor and moderate the platform without exposing provider configuration to users.</p></div>
          <Link className="rounded-lg border border-white/15 bg-white/[.05] px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/[.1]" href="/dashboard">User workspace ↗</Link>
        </div>
      </header>
      <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {links.map(([label, href]) => <Link className="shrink-0 rounded-full border border-white/10 bg-white/[.035] px-3.5 py-2 text-xs font-medium text-zinc-400 transition hover:border-violet-300/35 hover:bg-violet-300/10 hover:text-violet-100" href={href} key={href}>{label}</Link>)}
      </nav>
      <main className="mt-7 min-w-0">{children}</main>
    </div>
  );
}

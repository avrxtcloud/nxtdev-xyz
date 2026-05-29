import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Console",
  description: "Administrative controls for users, subdomains, records, reports, and settings.",
};

const adminLinks = [
  ["Users", "/admin/users"],
  ["Subdomains", "/admin/subdomains"],
  ["Reservations", "/admin/reservations"],
  ["DNS Records", "/admin/records"],
  ["Reports", "/admin/reports"],
  ["Announcements", "/admin/announcements"],
  ["Settings", "/admin/settings"],
  ["Audit", "/admin/audit"],
  ["Dashboard", "/dashboard"],
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-10 border-b-2 border-zinc-950 pb-8 dark:border-white">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex border-2 border-zinc-950 bg-red-500 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[4px_4px_0_#18181b] dark:border-white dark:shadow-[4px_4px_0_#fafafa]">
              Admin console
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
              Control panel
            </h1>
          </div>
          <nav className="flex flex-wrap gap-1 border-2 border-zinc-950 bg-white p-1.5 shadow-[5px_5px_0_#18181b] dark:border-white dark:bg-zinc-950 dark:shadow-[5px_5px_0_#fafafa]">
            {adminLinks.map(([label, href]) => (
              <Link
                key={href}
                className="px-3 py-2 text-sm font-black text-zinc-700 transition-all hover:bg-zinc-950 hover:text-white dark:text-zinc-300 dark:hover:bg-white dark:hover:text-zinc-950"
                href={href}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}

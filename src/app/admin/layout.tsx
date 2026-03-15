import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Admin</h1>
        <div className="flex gap-2">
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100/70 dark:hover:bg-white/10" href="/admin/users">
            Users
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100/70 dark:hover:bg-white/10" href="/admin/subdomains">
            Subdomains
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100/70 dark:hover:bg-white/10" href="/admin/reservations">
            Reservations
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100/70 dark:hover:bg-white/10" href="/admin/records">
            DNS Records
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100/70 dark:hover:bg-white/10" href="/admin/reports">
            Reports
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100/70 dark:hover:bg-white/10" href="/admin/announcements">
            Announcements
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100/70 dark:hover:bg-white/10" href="/admin/settings">
            Settings
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100/70 dark:hover:bg-white/10" href="/admin/audit">
            Audit
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100/70 dark:hover:bg-white/10" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}

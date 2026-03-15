import Link from "next/link";
import { getOrCreateAppUser } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { AnnouncementBanner } from "@/components/announcement-banner";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { appUser, isAdmin, isGithubVerified } = await getOrCreateAppUser();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <AnnouncementBanner />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Signed in as <span className="font-medium">{appUser.email}</span>
          </p>
          {!isGithubVerified ? (
            <div className="mt-2 flex items-center gap-2">
              <Badge tone="warn">Unverified</Badge>
              <Link className="text-xs underline" href="/dashboard/verify">
                Verify with GitHub
              </Link>
            </div>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100/70 dark:hover:bg-white/10" href="/dashboard/domains">
            Domains
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100/70 dark:hover:bg-white/10" href="/dashboard/reports">
            Reports
          </Link>
          {!isGithubVerified ? (
            <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100/70 dark:hover:bg-white/10" href="/dashboard/verify">
              Verify
            </Link>
          ) : null}
          {isAdmin ? (
            <Link className="rounded-md px-3 py-2 text-sm hover:bg-zinc-100/70 dark:hover:bg-white/10" href="/admin">
              Admin
            </Link>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
}

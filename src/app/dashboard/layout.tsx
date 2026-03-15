import Link from "next/link";
import { getOrCreateAppUser } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let appUser: { email: string } & Record<string, unknown>;
  let isAdmin = false;
  let isGithubVerified = false;
  try {
    const res = await getOrCreateAppUser();
    appUser = res.appUser as typeof appUser;
    isAdmin = res.isAdmin;
    isGithubVerified = res.isGithubVerified;
  } catch (e) {
    const message = (e as Error)?.message ?? "Unknown error";
    console.error("Dashboard init failed:", e);
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Card>
          <div className="text-sm font-semibold">Dashboard setup error</div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            The dashboard failed to load. This is usually caused by missing
            Vercel environment variables or missing Supabase tables.
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            Details: <span className="font-mono">{message}</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a className="underline" href="/api/health" target="_blank" rel="noreferrer">
              Open /api/health
            </a>
            <Link className="underline" href="/">
              Back home
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <AnnouncementBanner />
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Signed in as{" "}
            <span className="break-all font-medium">{appUser.email}</span>
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
        <div className="flex flex-wrap gap-2">
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

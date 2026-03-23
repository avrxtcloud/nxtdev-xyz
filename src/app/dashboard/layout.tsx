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
    <div className="mx-auto max-w-7xl px-4 py-12 lg:py-20 animate-[fade-in_400ms_ease-out]">
      <AnnouncementBanner />
      <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between border-b border-zinc-100 dark:border-zinc-800 pb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">Dashboard</h1>
            {isAdmin ? (
              <Badge className="bg-zinc-900 text-white dark:bg-white dark:text-black font-bold px-2 py-0.5 rounded-md text-[10px] uppercase tracking-tighter">Admin</Badge>
            ) : null}
          </div>
          <p className="text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            Signed in as{" "}
            <span className="text-zinc-900 dark:text-white font-bold decoration-blue-500/30 underline underline-offset-4">{appUser.email}</span>
          </p>
          {!isGithubVerified ? (
            <div className="inline-flex items-center gap-3 bg-orange-50 dark:bg-orange-950/20 px-4 py-2 rounded-2xl border border-orange-100 dark:border-orange-900/40">
              <Badge tone="warn" className="text-orange-700 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/40 border-none font-bold text-[10px] uppercase tracking-wider">Unverified</Badge>
              <Link className="text-sm font-bold text-orange-800 dark:text-orange-200 hover:underline underline-offset-4" href="/dashboard/verify">
                Verify with GitHub →
              </Link>
            </div>
          ) : null}
        </div>
        <nav className="flex items-center gap-1 bg-zinc-100/50 dark:bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-100 dark:border-zinc-800 w-fit">
          <Link className="rounded-xl px-4 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all" href="/dashboard/domains">
            Domains
          </Link>
          <Link className="rounded-xl px-4 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all" href="/dashboard/reports">
            Reports
          </Link>
          {!isGithubVerified ? (
            <Link className="rounded-xl px-4 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all" href="/dashboard/verify">
              Verify
            </Link>
          ) : null}
          {isAdmin ? (
            <Link className="rounded-xl px-4 py-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all" href="/admin">
              Admin
            </Link>
          ) : null}
        </nav>
      </div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

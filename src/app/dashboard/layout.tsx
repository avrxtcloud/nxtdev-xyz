import Link from "next/link";
import type { Metadata } from "next";
import { getOrCreateAppUser } from "@/lib/auth";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage subdomains, DNS records, API keys, and reports.",
};

const navLink =
  "px-4 py-2 text-sm font-black text-zinc-700 transition-all hover:bg-zinc-950 hover:text-white dark:text-zinc-300 dark:hover:bg-white dark:hover:text-zinc-950";

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
    const suspended = message.toLowerCase().includes("account is suspended");
    console.error("Dashboard init failed:", e);
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Card>
          <div className="text-sm font-black uppercase tracking-wider">
            {suspended ? "Account suspended" : "Dashboard setup error"}
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
            {suspended ? "Your account is suspended" : "Dashboard failed to load"}
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            {suspended
              ? "Your account is currently paused and cannot access dashboard tools. Contact support if you believe this is a mistake."
              : "The dashboard failed to load. This is usually caused by missing Vercel environment variables or missing Supabase tables."}
          </p>
          {!suspended ? (
            <p className="mt-3 text-xs text-zinc-500">
              Details: <span className="font-mono">{message}</span>
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-black">
            <a className="underline decoration-cyan-400 decoration-2 underline-offset-4" href="/api/health" target="_blank" rel="noreferrer">
              Open /api/health
            </a>
            <Link className="underline decoration-cyan-400 decoration-2 underline-offset-4" href="/">
              Back home
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 animate-[fade-in_400ms_ease-out]">
      <AnnouncementBanner />
      <div className="mb-12 flex flex-col gap-8 border-b-2 border-zinc-950 pb-10 lg:flex-row lg:items-end lg:justify-between dark:border-white">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
              Dashboard
            </h1>
            {isAdmin ? (
              <Badge className="bg-lime-300 px-2 py-0.5 text-[10px] text-zinc-950">
                Admin
              </Badge>
            ) : null}
          </div>
          <p className="text-base font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
            Signed in as{" "}
            <span className="font-mono font-black text-zinc-950 underline decoration-cyan-400 decoration-2 underline-offset-4 dark:text-white">
              {appUser.email}
            </span>
          </p>
          {!isGithubVerified ? (
            <div className="inline-flex items-center gap-3 border-2 border-zinc-950 bg-amber-200 px-4 py-2 shadow-[4px_4px_0_#18181b] dark:border-white dark:shadow-[4px_4px_0_#fafafa]">
              <Badge tone="warn" className="border-zinc-950 bg-white text-zinc-950 shadow-none dark:border-zinc-950">
                Unverified
              </Badge>
              <Link className="text-sm font-black text-zinc-950 hover:underline underline-offset-4" href="/dashboard/verify">
                Verify with GitHub -&gt;
              </Link>
            </div>
          ) : null}
        </div>
        <nav className="flex w-fit flex-wrap items-center gap-1 border-2 border-zinc-950 bg-white p-1.5 shadow-[5px_5px_0_#18181b] dark:border-white dark:bg-zinc-950 dark:shadow-[5px_5px_0_#fafafa]">
          <Link className={navLink} href="/dashboard/domains">Domains</Link>
          <Link className={navLink} href="/dashboard/short-links">Short Links</Link>
          <Link className={navLink} href="/dashboard/api-keys">API Keys</Link>
          <Link className={navLink} href="/dashboard/reports">Reports</Link>
          {!isGithubVerified ? <Link className={navLink} href="/dashboard/verify">Verify</Link> : null}
          {isAdmin ? (
            <Link className="bg-lime-300 px-4 py-2 text-sm font-black text-zinc-950 transition-all hover:bg-amber-300" href="/admin">
              Admin
            </Link>
          ) : null}
        </nav>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

import Link from "next/link";
import { Show, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { env } from "@/lib/env";
import { AnnouncementBanner } from "@/components/announcement-banner";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:py-32">
      <AnnouncementBanner />
      <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 text-sm font-semibold text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available Now: Free Subdomains
          </div>
          <h1 className="text-5xl font-black tracking-tight sm:text-7xl xl:text-8xl leading-[1.05]">
            Claim your <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              free subdomain.
            </span>
          </h1>
          <p className="max-w-xl text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            Join thousands of developers using <span className="text-zinc-900 dark:text-white font-bold">{env.ROOT_DOMAIN}</span> to ship faster with production-ready DNS. No credit card required.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <Button size="lg" className="h-14 px-8 text-base font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:scale-105 active:scale-95">
                  Start for free
                </Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-base font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:scale-105 active:scale-95">
                  Go to dashboard
                </Button>
              </Link>
            </Show>
            <Link href="/docs">
              <Button variant="secondary" size="lg" className="h-14 px-8 text-base font-bold rounded-2xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
                Read docs
              </Button>
            </Link>
          </div>
          <p className="text-sm text-zinc-500 font-medium pt-4">
            By joining, you agree to our{" "}
            <Link className="underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950 dark:hover:text-zinc-300" href="/terms">
              Terms
            </Link>{" "}
            and{" "}
            <Link className="underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950 dark:hover:text-zinc-300" href="/privacy">
              Privacy Policy
            </Link>.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative grid gap-4 sm:grid-cols-2">
            <Card className="p-8 rounded-[2rem] border-zinc-100/50 dark:border-zinc-800 shadow-sm transition-all hover:translate-y-[-4px]">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <div className="text-2xl font-black text-zinc-900 dark:text-white">2 Subdomains</div>
              <div className="mt-2 text-zinc-600 dark:text-zinc-400 font-medium">Free base subdomains per user.</div>
            </Card>
            <Card className="p-8 rounded-[2rem] border-zinc-100/50 dark:border-zinc-800 shadow-sm transition-all hover:translate-y-[-4px]">
              <div className="h-12 w-12 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div className="text-2xl font-black text-zinc-900 dark:text-white">100 Records</div>
              <div className="mt-2 text-zinc-600 dark:text-zinc-400 font-medium">Per subdomain, including SRV/NS.</div>
            </Card>
            <Card className="sm:col-span-2 p-8 rounded-[2rem] border-zinc-100/50 dark:border-zinc-800 shadow-sm transition-all hover:translate-y-[-4px]">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div className="text-2xl font-black text-zinc-900 dark:text-white">Enterprise Safety</div>
              <div className="mt-2 text-zinc-600 dark:text-zinc-400 font-medium">Anti-phishing checks and IP reputation verification powered by AbuseIPDB.</div>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-32 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl text-zinc-900 dark:text-white">One platform, endless possibilities.</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium">Everything you need to build and scale your next project.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
          <Card className="p-10 rounded-[2.5rem] border-zinc-100/50 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all border-b-4 border-b-blue-500">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4">Websites</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Point your subdomain to Vercel, Netlify, or any Cloud provider using specialized CNAME or A records.
            </p>
          </Card>
          <Card className="p-10 rounded-[2.5rem] border-zinc-100/50 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all border-b-4 border-b-indigo-500">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4">APIs</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Deploy backends with ease. Support for A/AAAA records and reverse proxying through global CDNs.
            </p>
          </Card>
          <Link href="/DynamicDns" className="group">
            <Card className="h-full p-10 rounded-[2.5rem] border-zinc-100/50 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all border-b-4 border-b-emerald-500 group-hover:scale-[1.02]">
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                Dynamic DNS
                <Badge tone="ok" className="text-[10px]">Sync</Badge>
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Keep your home server online 24/7 with our Cloudflare Edge-powered DDNS API. Auto-sync to dashboard.
              </p>
            </Card>
          </Link>
          <Card className="p-10 rounded-[2.5rem] border-zinc-100/50 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all border-b-4 border-b-purple-500">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4">Infrastructure</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Experimental support for MX, TXT, and SRV records allows you to host mail and game servers for free.
            </p>
          </Card>
          <Link href="/email-routing" className="group">
            <Card className="h-full p-10 rounded-[2.5rem] border-zinc-100/50 dark:border-zinc-800 bg-blue-600/5 hover:bg-blue-600/10 dark:bg-blue-900/10 dark:hover:bg-blue-900/20 transition-all border-b-4 border-b-blue-600 border-dashed group-hover:border-solid">
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                Masking
                <Badge tone="ok" className="text-[10px]">New</Badge>
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Protect your privacy. Create disposable @nxtdev.xyz aliases that forward to your real address.
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}

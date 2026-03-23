import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function DashboardHome() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Link href="/dashboard/domains" className="group">
        <Card className="p-8 h-full rounded-[2rem] border-zinc-100/50 dark:border-zinc-800 shadow-sm transition-all hover:translate-y-[-4px] hover:shadow-xl hover:shadow-blue-500/10 group-hover:border-blue-500/30">
          <div className="flex items-start justify-between mb-6">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <div className="text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">Manage Domains</div>
          <p className="text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            Claim up to 2 base subdomains and manage multiple DNS records including CNAME, A, TXT, and SRV.
          </p>
        </Card>
      </Link>

      <Link href="/dashboard/reports" className="group">
        <Card className="p-8 h-full rounded-[2rem] border-zinc-100/50 dark:border-zinc-800 shadow-sm transition-all hover:translate-y-[-4px] hover:shadow-xl hover:shadow-orange-500/10 group-hover:border-orange-500/30">
          <div className="flex items-start justify-between mb-6">
            <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div className="text-orange-600 dark:text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">Abuse Reports</div>
          <p className="text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            Monitor and respond to abuse reports filed against your domains to ensure compliance and avoid suspension.
          </p>
        </Card>
      </Link>
    </div>
  );
}

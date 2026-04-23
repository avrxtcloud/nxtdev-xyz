import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic DNS (DDNS) - nxtdev.xyz",
  description: "Keep your subdomains pointed to your home server or VPS automatically with nxtdev DDNS.",
};

export default function DdnsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <div className="flex flex-col items-center text-center space-y-8 mb-20">
        <Badge tone="ok" className="rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest border-2">Dynamic DNS</Badge>
        <h1 className="text-5xl font-black tracking-tight sm:text-7xl leading-[1.05]">
          Your Home Server, <br/>
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent underline decoration-blue-500/20 underline-offset-8">Always Connected.</span>
        </h1>
        <p className="max-w-2xl text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
          nxtdev DDNS automatically updates your subdomain's IP address whenever it changes. Perfect for home labs, VPS, and IoT projects.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/dashboard/api-keys">
             <Button size="lg" className="rounded-2xl px-10 h-14 text-sm font-black uppercase tracking-widest shadow-2xl shadow-blue-500/20">Generate API Key</Button>
          </Link>
          <Link href="#setup">
             <Button variant="outline" size="lg" className="rounded-2xl px-10 h-14 text-sm font-black uppercase tracking-widest bg-white dark:bg-zinc-950">Setup Guide</Button>
          </Link>
        </div>
      </div>

      <div id="setup" className="grid gap-8 mb-24">
         <GuideSection 
           title="Simple Update Request"
           description="Use our performant API endpoint to update your domain from any device that can make a web request."
           code={`curl "https://api.nxtdev.xyz/update?key=YOUR_API_KEY&domain=yours.nxtdev.xyz&ip=1.2.3.4"`}
         />

         <div className="grid md:grid-cols-2 gap-8">
            <UsageCard 
              title="Linux / VPS (Crontab)"
              description="Keep your server IP updated automatically every 5 minutes."
              code={`*/5 * * * * curl -s "https://api.nxtdev.xyz/update?key=YOUR_KEY&domain=dev.nxtdev.xyz&ip=$(curl -s https://ifconfig.me)"`}
            />
            <UsageCard 
              title="Serverless / Node.js"
              description="Programmatic updates within your existing application logic."
              code={`await fetch("https://api.nxtdev.xyz/update?" + new URLSearchParams({
  key: "YOUR_KEY",
  domain: "api.nxtdev.xyz",
  ip: currentIp
}));`}
            />
         </div>
      </div>

      <section className="bg-zinc-900 rounded-[3rem] p-10 sm:p-20 text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-purple-600/10 pointer-events-none"></div>
         <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 relative z-10">Running on <span className="text-blue-400">api.nxtdev.xyz</span></h2>
         <p className="text-zinc-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto mb-10 relative z-10">
           Hosted on Cloudflare Edge Workers for nearly zero latency globally. No matter where your server is, updates are instant.
         </p>
         <Link href="/docs/api" className="relative z-10 font-black text-blue-400 uppercase tracking-widest text-sm hover:underline">Full API Documentation →</Link>
      </section>
    </main>
  );
}

function GuideSection({ title, description, code }: { title: string, description: string, code: string }) {
  return (
    <Card className="p-8 sm:p-12 rounded-[3rem] border-zinc-100 dark:border-zinc-800 shadow-xl overflow-hidden relative">
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">{title}</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">{description}</p>
        </div>
        <div className="w-full lg:w-[500px] shrink-0 bg-zinc-950 p-6 rounded-[2rem] border border-zinc-800 shadow-2xl relative">
          <div className="flex gap-1.5 mb-4 opacity-50">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <code className="text-blue-400 font-mono text-sm break-all">{code}</code>
        </div>
      </div>
    </Card>
  );
}

function UsageCard({ title, description, code }: { title: string, description: string, code: string }) {
  return (
    <Card className="p-10 rounded-[2.5rem] border-zinc-100 dark:border-zinc-800 h-full flex flex-col hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
       <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-widest text-sm">{title}</h3>
       <p className="text-zinc-600 dark:text-zinc-400 font-medium mb-6 leading-relaxed">{description}</p>
       <div className="mt-auto bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 font-mono text-xs text-zinc-500 dark:text-zinc-400 break-all leading-relaxed">
         {code}
       </div>
    </Card>
  );
}

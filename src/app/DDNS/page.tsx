import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DDNSGuidePage() {
  const codeExamples = [
    {
      title: "Linux / VPS (Crontab)",
      description: "Automatically update your IP every 5 minutes using a simple cron job.",
      code: `*/5 * * * * curl -s "https://api.nxtdev.xyz/update?key=YOUR_API_KEY&domain=yourdomain.nxtdev.xyz&ip=$(curl -s https://ifconfig.me)" > /dev/null`,
      language: "bash",
    },
    {
      title: "Node.js / Serverless",
      description: "Programmatic update using the native fetch API.",
      code: `const updateDNS = async () => {
  const params = new URLSearchParams({
    key: "nxt_...",
    domain: "hello.nxtdev.xyz",
    ip: "1.2.3.4" // Use an IP discovery service if needed
  });
  
  const res = await fetch(\`https://api.nxtdev.xyz/update?\${params}\`);
  const text = await res.text();
  console.log(text);
};`,
      language: "javascript",
    },
    {
      title: "Python",
      description: "Update your DNS using the requests library.",
      code: `import requests

def update_ddns():
    url = "https://api.nxtdev.xyz/update"
    params = {
        "key": "YOUR_API_KEY",
        "domain": "your.nxtdev.xyz",
        "ip": requests.get("https://api.ipify.org").text
    }
    r = requests.get(url, params=params)
    print(r.text)

update_ddns()`,
      language: "python",
    },
    {
      title: "Generic Router / URL",
      description: "Direct URL format for routers supporting custom DDNS providers.",
      code: `https://api.nxtdev.xyz/update?key=[API_KEY]&domain=[DOMAIN]&ip=[IP]`,
      language: "text",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:py-32">
      <div className="space-y-6 mb-16">
        <Link 
          href="/docs" 
          className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          Back to Docs
        </Link>
        <h1 className="text-5xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-7xl">
          DDNS Setup Guide
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl font-bold leading-relaxed">
          Keep your subdomains synchronized with your dynamic home or server IP addresses using our high-performance API.
        </p>
      </div>

      <section className="space-y-12">
        <Card className="p-8 lg:p-12 rounded-[2.5rem] border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3 space-y-4">
              <Badge className="bg-blue-600 text-white border-none rounded-full px-4 py-1 font-black uppercase tracking-widest text-[10px]">Step 1</Badge>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white">Generate an API Key</h3>
              <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                Head over to your <Link href="/dashboard/api-keys" className="text-blue-600 underline">API Keys dashboard</Link> and create a new key. Keep this secret as it provides write access to your DNS.
              </p>
            </div>
            <div className="lg:w-1/3 space-y-4">
               <Badge className="bg-blue-600 text-white border-none rounded-full px-4 py-1 font-black uppercase tracking-widest text-[10px]">Step 2</Badge>
               <h3 className="text-2xl font-black text-zinc-900 dark:text-white">Claim a Domain</h3>
               <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                 Ensure you have successfully claimed the subdomain you wish to update via the <Link href="/dashboard/domains" className="text-blue-600 underline">Domains panel</Link>.
               </p>
            </div>
            <div className="lg:w-1/3 space-y-4">
               <Badge className="bg-blue-600 text-white border-none rounded-full px-4 py-1 font-black uppercase tracking-widest text-[10px]">Step 3</Badge>
               <h3 className="text-2xl font-black text-zinc-900 dark:text-white">Automate</h3>
               <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                 Use one of the examples below to automate your IP updates. Our API handles A (IPv4) and AAAA (IPv6) automatically.
               </p>
            </div>
          </div>
        </Card>

        <div className="grid gap-8">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Implementation Examples</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {codeExamples.map((ex) => (
              <Card key={ex.title} className="p-8 rounded-[2.5rem] border-zinc-100 dark:border-zinc-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-black text-zinc-900 dark:text-white mb-2">{ex.title}</h4>
                  <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 mb-6">{ex.description}</p>
                </div>
                <div className="relative group">
                  <pre className="bg-zinc-950 text-zinc-300 p-6 rounded-2xl text-xs font-mono overflow-auto max-h-[300px] border border-white/10">
                    <code>{ex.code}</code>
                  </pre>
                  <button 
                    onClick={() => navigator.clipboard.writeText(ex.code)}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-8 lg:p-12 rounded-[2.5rem] border-zinc-100 dark:border-zinc-800 bg-blue-600 text-white shadow-2xl shadow-blue-500/20">
           <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="space-y-4 lg:w-2/3">
                 <h2 className="text-3xl sm:text-4xl font-black tracking-tight">API Reference</h2>
                 <p className="font-bold opacity-80 leading-relaxed">
                    The endpoint is highly optimized for performance and rate-limited at 60 updates per hour per account.
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="bg-white/10 p-4 rounded-2xl">
                       <span className="block text-[10px] uppercase font-black tracking-widest opacity-60 mb-1">Base Endpoint</span>
                       <code className="text-sm font-black text-white">api.nxtdev.xyz/update</code>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl">
                       <span className="block text-[10px] uppercase font-black tracking-widest opacity-60 mb-1">Methods</span>
                       <code className="text-sm font-black text-white">GET, POST</code>
                    </div>
                 </div>
              </div>
              <div className="lg:w-1/3">
                 <div className="p-6 bg-zinc-950 rounded-[2rem] border border-white/10 shadow-2xl">
                    <div className="flex items-center gap-2 mb-4">
                       <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live API Status</span>
                    </div>
                    <div className="space-y-3 font-mono text-[10px]">
                       <div className="flex justify-between text-zinc-500"><span>Latency</span> <span className="text-white">~45ms</span></div>
                       <div className="flex justify-between text-zinc-500"><span>Uptime</span> <span className="text-white">99.98%</span></div>
                    </div>
                 </div>
              </div>
           </div>
        </Card>
      </section>
    </main>
  );
}

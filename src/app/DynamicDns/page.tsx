import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function DynamicDnsLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse-slow delay-700"></div>
        </div>

        <div className="mx-auto max-w-7xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Enterprise Edge DDNS</span>
          </div>
          
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.8] mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
             Your home server, <br/>
             <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">always online.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl font-bold text-zinc-500 dark:text-zinc-400 leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 text-balance">
            Cloudflare Edge-powered Dynamic DNS for developers. No matter where your server lives, ensure it's reachable 24/7 with lightning-fast propagation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
             <Link href="/dashboard/api-keys">
               <button className="h-16 px-10 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-500/20">
                  Generate API Key
               </button>
             </Link>
             <Link href="/DDNS">
                <button className="h-16 px-10 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 font-black uppercase tracking-widest text-xs hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
                   View Setup Guide
                </button>
             </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 bg-zinc-50/50 dark:bg-zinc-900/30">
         <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <FeatureCard 
                 title="Zero-Lag Propagation"
                 description="Updates happen at the Cloudflare Edge network. Your changes go global in under 60 seconds."
                 icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}
                 color="blue"
               />
               <FeatureCard 
                 title="Auto-Sync Dashboard"
                 description="Unlike other platforms, DDNS updates reflect instantly in your web dashboard for total visibility."
                 icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>}
                 color="emerald"
               />
               <FeatureCard 
                 title="IPv4 & IPv6 Ready"
                 description="Native dual-stack support. We automatically detect and update A or AAAA records based on your IP."
                 icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>}
                 color="indigo"
               />
            </div>
         </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6">
         <div className="mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
               <div className="lg:w-1/2 space-y-10">
                  <div className="space-y-4">
                     <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-none">
                        What is DDNS, <br/>
                        and why it matters.
                     </h2>
                     <p className="text-zinc-500 font-bold leading-relaxed">
                        Dynamic DNS (DDNS) tracks the changing IP address of your home or office internet connection and updates your subdomain records automatically.
                     </p>
                  </div>
                  
                  <div className="space-y-8">
                     <div className="flex gap-6">
                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center font-black text-blue-600">1</div>
                        <div>
                           <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Continuous Monitoring</h4>
                           <p className="text-sm text-zinc-500 font-medium leading-relaxed">Your server periodically pings our API with its current address. We use it to verify your identity and detect changes.</p>
                        </div>
                     </div>
                     <div className="flex gap-6">
                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center font-black text-emerald-600">2</div>
                        <div>
                           <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Automated Switching</h4>
                           <p className="text-sm text-zinc-500 font-medium leading-relaxed">When your ISP changes your IP, our API instantly patches the Cloudflare DNS records to point to the new location.</p>
                        </div>
                     </div>
                     <div className="flex gap-6">
                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center font-black text-indigo-600">3</div>
                        <div>
                           <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Seamless Access</h4>
                           <p className="text-sm text-zinc-500 font-medium leading-relaxed">Your users, SSH clients, or game server players never notice a thing. The domain always points to the right place.</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="lg:w-1/2 relative">
                  <div className="p-8 lg:p-12 rounded-[3.5rem] bg-zinc-900 border border-white/10 shadow-3xl text-zinc-400 font-mono text-xs sm:text-sm leading-relaxed overflow-hidden relative">
                     <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-1.5">
                           <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                           <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                           <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        </div>
                        <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest">ddns-daemon.log</div>
                     </div>
                     <p className="text-zinc-500"># Starting nxtdev DDNS heartbeat...</p>
                     <p><span className="text-emerald-400">[OK]</span> Identified local IP: 182.43.12.89</p>
                     <p><span className="text-blue-400">[INFO]</span> Syncing to dev-machine.nxtdev.xyz</p>
                     <p className="text-zinc-500">Checking Cloudflare Edge Propagation...</p>
                     <p><span className="text-emerald-400 text-bold">[SUCCESS]</span> Record updated in 12ms.</p>
                     <p><span className="text-indigo-400">[DB]</span> Syncing metadata to Hub...</p>
                     <p className="text-zinc-600 mt-4">Next check in 300s...</p>
                     
                     <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Difference Section */}
      <section className="py-24 px-6 bg-zinc-950 text-white relative overflow-hidden">
         <div className="mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-20 space-y-4">
               <h2 className="text-5xl sm:text-7xl font-black tracking-tight">The nxtdev Difference</h2>
               <p className="font-bold opacity-60">Why pro users choose our infrastructure over generic alternatives.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-[2.5rem] overflow-hidden">
               <div className="p-12 space-y-6 hover:bg-white/5 transition-colors">
                  <h4 className="text-2xl font-black">Others</h4>
                  <ul className="space-y-4 text-sm font-medium opacity-50">
                     <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center">✕</span> Slow propagation times (10m+)</li>
                     <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center">✕</span> No visibility in web UI</li>
                     <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center">✕</span> Require manual record creation</li>
                     <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center">✕</span> Complex XML/Legacy APIs</li>
                  </ul>
               </div>
               <div className="p-12 space-y-6 bg-blue-600">
                  <h4 className="text-2xl font-black">nxtdev</h4>
                  <ul className="space-y-4 text-sm font-bold">
                     <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center">✓</span> Worldwide Edge Sync (&lt;1s)</li>
                     <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center">✓</span> Instant Dashboard Reflect</li>
                     <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center">✓</span> Auto-creation of missing records</li>
                     <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center">✓</span> Modern JSON REST API</li>
                  </ul>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
         <div className="mx-auto max-w-4xl space-y-12">
            <h2 className="text-6xl sm:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.8]">
               Ready to go <br/>
               <span className="text-blue-600">dynamic?</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
               <Link href="/dashboard/api-keys">
                  <button className="h-16 px-12 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20">Get Started Now</button>
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description, icon, color }: any) {
  return (
    <Card className="p-10 rounded-[3rem] border-zinc-100 dark:border-zinc-800 hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-none transition-all duration-500 space-y-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg 
        ${color === 'blue' ? 'bg-blue-600 text-white' : ''}
        ${color === 'emerald' ? 'bg-emerald-600 text-white' : ''}
        ${color === 'indigo' ? 'bg-indigo-600 text-white' : ''}
      `}>
        {icon}
      </div>
      <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 font-bold leading-relaxed">{description}</p>
    </Card>
  );
}

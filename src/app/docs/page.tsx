import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { env } from "@/lib/env";

export default function DocsPage() {
  const sections = [
    {
      title: "Quick Start",
      description: "Get up and running with your own free subdomain in minutes.",
      href: "/docs/quick-start",
      color: "blue",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      ),
    },
    {
      title: "DDNS Setup",
      description: "Configure dynamic DNS with our robust /update API endpoint.",
      href: "/DDNS",
      color: "amber",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
      ),
    },
    {
      title: "Record Types",
      description: "Support for A, AAAA, CNAME, TXT, MX, and SRV records.",
      href: "/docs/record-types",
      color: "indigo",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      ),
    },
    {
      title: "NS Delegation",
      description: "Delegate your subdomain's DNS control to external providers.",
      href: "/docs/nsdelegation",
      color: "emerald",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
      ),
    },
    {
      title: "Limits & Quotas",
      description: "Overview of record limits and safety fair-use policies.",
      href: "/docs/limits",
      color: "rose",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      ),
    },
    {
      title: "API Reference",
      description: "Integrate subdomain availability checks into your apps.",
      href: "/docs/api",
      color: "violet",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
      ),
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 sm:py-32">
      <div className="flex flex-col items-center text-center space-y-10 mb-20">
        <div className="inline-flex items-center gap-2 rounded-none bg-amber-100 dark:bg-zinc-900 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-950 dark:text-lime-300 border border-zinc-950/20 dark:border-white/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-cyan-300 opacity-75"></span>
            <span className="relative inline-flex rounded-none h-2 w-2 bg-amber-400"></span>
          </span>
          Knowledge Base
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white sm:text-7xl lg:text-8xl leading-[0.9]">
          Explore the <br/>
          <span className="text-zinc-950 dark:text-lime-300">nxtdev</span> ecosystem
        </h1>
        <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed font-bold">
          Master your infrastructure with our comprehensive documentation and step-by-step guides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="group">
            <Card className="h-full p-10 border-zinc-950/20 dark:border-white/20 hover:border-cyan-400 dark:hover:border-cyan-400 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500 relative overflow-hidden rounded-lg flex flex-col justify-between">
              <div className="relative z-10">
                <div className={`p-4 rounded-lg w-fit transition-all duration-500 group-hover:scale-110 mb-8 
                  ${section.color === 'blue' ? 'bg-amber-100 text-zinc-950 dark:bg-zinc-900' : ''}
                  ${section.color === 'amber' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30' : ''}
                  ${section.color === 'indigo' ? 'bg-cyan-100 text-zinc-950 dark:bg-zinc-900' : ''}
                  ${section.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' : ''}
                  ${section.color === 'rose' ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/30' : ''}
                  ${section.color === 'violet' ? 'bg-violet-50 text-violet-600 dark:bg-violet-900/30' : ''}
                 shadow-sm`}>
                  {section.icon}
                </div>
                <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
                  {section.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 font-bold leading-relaxed mb-8">
                  {section.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-950 transition-colors">
                Explore Documentation
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-32 p-12 lg:p-20 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 relative overflow-hidden group">
         <div className="max-w-3xl relative z-10">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6 leading-none">Still have questions?</h2>
            <p className="text-lg sm:text-xl font-bold opacity-70 mb-10 leading-relaxed text-zinc-400 dark:text-zinc-500">
               Our community is active and ready to help. Join the Discord server to get real-time support from the developers.
            </p>
            <div className="flex flex-wrap gap-4">
               <Button className="h-14 px-10 rounded-lg bg-white text-zinc-950 dark:bg-zinc-900 dark:text-white font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all">Join Discord</Button>
               <Button variant="ghost" className="h-14 px-10 rounded-lg border-white/20 dark:border-zinc-200 border-2 font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">Support Email</Button>
            </div>
         </div>
      </div>
    </main>
  );
}

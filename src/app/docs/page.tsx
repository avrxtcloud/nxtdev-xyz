import Link from "next/link";
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
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/20 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Knowledge Base
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white sm:text-7xl lg:text-8xl leading-[0.9]">
          Explore the <br/>
          <span className="text-blue-600 dark:text-blue-500">nxtdev</span> ecosystem
        </h1>
        <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed font-bold">
          Master your infrastructure with our comprehensive documentation and step-by-step guides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="group">
            <Card className="h-full p-10 border-zinc-100 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500 relative overflow-hidden rounded-[2.5rem] flex flex-col justify-between">
              <div className="relative z-10">
                <div className={`p-4 rounded-2xl w-fit transition-all duration-500 group-hover:scale-110 mb-8 
                  ${section.color === 'blue' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30' : ''}
                  ${section.color === 'amber' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30' : ''}
                  ${section.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30' : ''}
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
              
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-blue-600 transition-colors">
                Explore Documentation
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>

              {/* Decorative gradient */}
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-32 p-12 lg:p-20 rounded-[3.5rem] bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 relative overflow-hidden group">
         <div className="max-w-3xl relative z-10">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6 leading-none">Still have questions?</h2>
            <p className="text-lg sm:text-xl font-bold opacity-70 mb-10 leading-relaxed text-zinc-400 dark:text-zinc-500">
               Our community is active and ready to help. Join the Discord server to get real-time support from the developers.
            </p>
            <div className="flex flex-wrap gap-4">
               <Button className="h-14 px-10 rounded-2xl bg-white text-zinc-950 dark:bg-zinc-900 dark:text-white font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all">Join Discord</Button>
               <Button variant="ghost" className="h-14 px-10 rounded-2xl border-white/20 dark:border-zinc-200 border-2 font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">Support Email</Button>
            </div>
         </div>
         {/* Abstract background element */}
         <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
      </div>
    </main>
  );
}

function Button({ children, className, variant = "primary" }: any) {
   const base = "inline-flex items-center justify-center transition-all";
   return (
      <button className={`${base} ${className}`}>
         {children}
      </button>
   );
}

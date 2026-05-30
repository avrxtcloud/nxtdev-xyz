import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-zinc-950 bg-zinc-950 px-4 py-16 text-sm text-white dark:border-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center border-2 border-white bg-lime-300 text-zinc-950">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tighter text-white">nxtdev.xyz</span>
            </div>
            <p className="max-w-xs text-sm font-medium leading-relaxed text-zinc-300">
              Production-ready free subdomains and DNS management for the next generation of developers.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-lime-300">Product</h4>
            <nav className="flex flex-col gap-4 font-bold text-zinc-300">
              <Link className="transition-colors hover:text-white" href="/docs">Documentation</Link>
              <Link className="transition-colors hover:text-white" href="/dashboard">Dashboard</Link>
              <Link className="transition-colors hover:text-white" href="/DynamicDns">Dynamic DNS</Link>
              <Link className="transition-colors hover:text-white" href="/DDNS">Setup Guide</Link>
              <Link className="transition-colors hover:text-white" href="/status">System Status</Link>
              <Link className="transition-colors hover:text-white" href="/subscribe">Newsletter</Link>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-cyan-300">Legal</h4>
            <nav className="flex flex-col gap-4 font-bold text-zinc-300">
              <Link className="transition-colors hover:text-white" href="/terms">Terms of Service</Link>
              <Link className="transition-colors hover:text-white" href="/privacy">Privacy Policy</Link>
              <Link className="transition-colors hover:text-white" href="/abuse">Abuse Policy</Link>
              <Link className="transition-colors hover:text-white" href="/report">Report Abuse</Link>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-300">Connect</h4>
            <nav className="flex flex-col gap-4 font-bold text-zinc-300">
              <a className="transition-colors hover:text-white" href="https://avrxt.in" target="_blank" rel="noreferrer">Developer Site</a>
              <a className="transition-colors hover:text-white" href="https://avrxt.in/guestbook" target="_blank" rel="noreferrer">Leave Feedback</a>
              <a className="transition-colors hover:text-white" href="https://github.com/avrxtcloud" target="_blank" rel="noreferrer">GitHub</a>
              <a className="transition-colors hover:text-white" href="https://razorpay.me/@avrxtcloud" target="_blank" rel="noreferrer">Support NxtDev</a>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/15 pt-8 text-xs font-bold uppercase tracking-widest text-zinc-400 md:flex-row">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div>(c) {new Date().getFullYear()} nxtdev.xyz / All rights reserved.</div>
            <a
              className="border border-white/20 bg-white px-3 py-2 font-black text-zinc-950 shadow-[3px_3px_0_#22d3ee] transition-transform hover:-translate-y-0.5"
              href="https://www.avrxt.in"
              target="_blank"
              rel="noreferrer"
            >
              Developed by @avrxt
            </a>
            <a
              href="https://status.nxtdev.xyz"
              target="_blank"
              rel="noreferrer"
              className="grid gap-1 border border-white/20 bg-black p-2 shadow-[3px_3px_0_#a3e635]"
            >
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.22em] text-lime-300">
                System status
              </span>
              <span className="block overflow-hidden bg-zinc-950">
                <iframe
                  src="https://status.nxtdev.xyz/badge?theme=dark"
                  title="nxtdev system status"
                  width="250"
                  height="30"
                  frameBorder="0"
                  scrolling="no"
                  className="block"
                  style={{ colorScheme: "normal" }}
                />
              </span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span>Powered by Cloudflare</span>
            <span>Secured by AbuseIPDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

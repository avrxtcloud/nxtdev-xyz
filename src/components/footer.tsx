import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-20 text-sm">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-blue-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white">nxtdev.xyz</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-xs text-sm">
              Providing production-ready free subdomains and DNS management for the next generation of developers.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Product</h4>
            <nav className="flex flex-col gap-4 font-bold text-zinc-600 dark:text-zinc-400">
              <Link className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors" href="/docs">Documentation</Link>
              <Link className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors" href="/dashboard">Dashboard</Link>
              <Link className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors" href="/status">System Status</Link>
              <Link className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors" href="/subscribe">Newsletter</Link>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Legal</h4>
            <nav className="flex flex-col gap-4 font-bold text-zinc-600 dark:text-zinc-400">
              <Link className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors" href="/terms">Terms of Service</Link>
              <Link className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors" href="/privacy">Privacy Policy</Link>
              <Link className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors" href="/abuse">Abuse Policy</Link>
              <Link className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors" href="/report">Report Abuse</Link>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Connect</h4>
            <nav className="flex flex-col gap-4 font-bold text-zinc-600 dark:text-zinc-400">
              <a className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors" href="https://avrxt.in" target="_blank" rel="noreferrer">Developer Site</a>
              <a className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors" href="https://avrxt.in/guestbook" target="_blank" rel="noreferrer">Leave Feedback</a>
              <a className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors" href="https://github.com/avrxtcloud" target="_blank" rel="noreferrer">GitHub</a>
            </nav>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-bold text-zinc-400 uppercase tracking-widest">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div>© {new Date().getFullYear()} nxtdev.xyz • All rights reserved.</div>
            <div className="flex items-center overflow-hidden rounded-lg bg-black p-0.5 shadow-sm ring-1 ring-zinc-800 transition-all hover:ring-zinc-700">
              <iframe
                src="https://status.nxtdev.xyz/badge?theme=dark"
                width="250"
                height="30"
                frameBorder="0"
                scrolling="no"
                style={{ colorScheme: 'normal', display: 'block' }}
              />
            </div>
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


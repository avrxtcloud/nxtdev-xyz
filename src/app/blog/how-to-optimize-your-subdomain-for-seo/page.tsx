import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "How to Optimize Your Subdomain for SEO | nxtdev Blog",
    description: "Learn how to make your nxtdev.xyz subdomains rank higher on Google. Explore canonical URLs, sitemaps, and SSL for subdomains.",
    keywords: ["subdomain seo", "google indexing", "nxtdev free subdomain", "canonical url", "dns configuration for seo"],
};

export default function BlogPost1() {
    return (
        <article className="mx-auto max-w-4xl px-4 py-20 sm:py-32">
            <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors font-black text-sm uppercase tracking-widest mb-12 group">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
                Back to Blog
            </Link>

            <div className="space-y-8 mb-16">
                <div className="flex items-center gap-4">
                    <Badge tone="ok" className="rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">SEO</Badge>
                    <span className="text-sm font-bold text-zinc-400">Published March 24, 2026</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight sm:text-7xl leading-[1.05]">
                    How to Optimize Your <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Subdomain for SEO.</span>
                </h1>
                <p className="text-2xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                    Master the art of search engine optimization for your development projects and production sites on nxtdev.xyz.
                </p>
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
                <section className="space-y-6">
                    <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Why Subdomain SEO Matters</h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        Search engines treat subdomains as independent entities. This means your `myproject.nxtdev.xyz` subdomain needs its own SEO strategy to rank effectively. Whether you're hosting a portfolio, a documentation site, or a web app, proper configuration is key.
                    </p>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">1. Canonical URLs</h3>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        Avoid duplicate content issues by setting a canonical tag. This tells Google which version of your page is the authoritative one. For Next.js projects, add this to your metadata configuration:
                    </p>
                    <pre className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 overflow-x-auto">
                        <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                            {`export const metadata = {
  alternates: {
    canonical: 'https://myproject.nxtdev.xyz',
  },
}`}
                        </code>
                    </pre>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">2. SSL and HTTP/2</h3>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        At nxtdev.xyz, we support proxied DNS records which enable automatic SSL through Cloudflare. Google prioritizes secure sites (HTTPS), so always ensure your records are proxied for better ranking.
                    </p>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">3. Fast DNS Propagation</h3>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        Site speed is a ranking factor, and it starts with DNS. Our infrastructure ensures TTL (Time-To-Live) values can be optimized for quick resolution, reducing the time to first byte (TTFB) for global users.
                    </p>
                </section>

                <div className="p-10 rounded-[2.5rem] bg-blue-600/5 border-2 border-dashed border-blue-600/20 text-center space-y-6 mt-16">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">Ready to deploy?</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        Start managing your professional subdomains today with enterprise-grade DNS records.
                    </p>
                    <Link href="/dashboard" className="inline-block">
                        <Button size="lg" className="rounded-2xl px-10 h-14 font-black">Get Started</Button>
                    </Link>
                </div>
            </div>
        </article>
    );
}

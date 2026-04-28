import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "What is nxtdev.xyz? | nxtdev Blog",
    description: "Discover nxtdev.xyz - the ultimate platform for developers to claim free subdomains and manage DNS records with ease.",
    keywords: ["what is nxtdev", "free developer subdomains", "dns management platform", "cloudflare alternative", "subdomain hosting"],
};

export default function BlogPostWhatIsNxtdev() {
    return (
        <article className="mx-auto max-w-4xl px-4 py-20 sm:py-32">
            <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors font-black text-sm uppercase tracking-widest mb-12 group">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
                Back to Blog
            </Link>

            <div className="space-y-8 mb-16">
                <div className="flex items-center gap-4">
                    <Badge tone="ok" className="rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">Platform</Badge>
                    <span className="text-sm font-bold text-zinc-400">Published March 24, 2026</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight sm:text-7xl leading-[1.05]">
                    What is <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">nxtdev.xyz?</span>
                </h1>
                <p className="text-2xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                    The story behind the platform empowering developers with professional subdomains and enterprise-grade DNS.
                </p>
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
                <section className="space-y-6">
                    <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Our Mission</h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        nxtdev.xyz was born from a simple observation: developers need a quick, secure, and professional way to share their work without the overhead of buying a new domain every time. Whether it's a portfolio, a side project, or a staging environment, nxtdev.xyz provides the infrastructure to get it online in seconds.
                    </p>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">Core Features</h3>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        We've built nxtdev.xyz on top of industry-leading technologies like Cloudflare and Supabase to provide:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-4 list-none pl-0">
                        {[
                            "Free Subdomains (up to 2 per user)",
                            "Full DNS Record Control (A, AAAA, CNAME, TXT, MX, SRV)",
                            "Automated SSL and Proxying",
                            "Enterprise-Grade Safety Checks",
                            "Nameserver Delegation Support",
                            "Blazing Fast Propagation"
                        ].map(feature => (
                            <li key={feature} className="p-4 border border-zinc-100 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 flex items-center gap-3 font-bold text-zinc-800 dark:text-zinc-200">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Built for Developers</h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        Every feature on nxtdev.xyz is designed with a developer-first mindset. From the intuitive dashboard to the clean API, we ensure that managing your infrastructure never gets in the way of building your product.
                    </p>
                    <div className="p-8 rounded-3xl bg-zinc-900 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full"></div>
                        <code className="text-sm font-mono text-blue-400 block relative z-10">
                            {`$ nxtdev claim my-cool-app
> Claiming subdomain...
> Success! Pointing records...
> Done: https://my-cool-app.nxtdev.xyz`}
                        </code>
                    </div>
                </section>

                <div className="p-10 rounded-[2.5rem] bg-indigo-600/5 border-2 border-dashed border-indigo-600/20 text-center space-y-6 mt-16">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">Join the community.</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        Start your journey with nxtdev.xyz and get your projects the professional address they deserve.
                    </p>
                    <Link href="/sign-up" className="inline-block">
                        <Button size="lg" className="rounded-2xl px-10 h-14 font-black">Create Free Account</Button>
                    </Link>
                </div>
            </div>
        </article>
    );
}

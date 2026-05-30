import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Latest insights, tutorials, and updates from nxtdev.xyz - the developer's favorite subdomain provider.",
};

const posts = [
    {
        title: "What is nxtdev.xyz?",
        description: "Learn about our mission to provide developers with professional subdomains and enterprise-grade DNS infrastructure.",
        slug: "what-is-nxtdev.xyz",
        date: "March 24, 2026",
        category: "Platform",
        gradient: "from-lime-300 to-cyan-300",
    },
    {
        title: "How to Optimize Your Subdomain for SEO",
        description: "Learn the best practices for setting up your nxtdev.xyz subdomain to rank higher on Google search results.",
        slug: "how-to-optimize-your-subdomain-for-seo",
        date: "March 24, 2026",
        category: "SEO",
        gradient: "from-zinc-950 to-cyan-500",
    },
    {
        title: "Why DNS Security Matters for Developers",
        description: "Explore the importance of DNS security and how nxtdev.xyz keeps your subdomains safe with advanced safety checks.",
        slug: "why-dns-security-matters-for-developers",
        date: "March 23, 2026",
        category: "Security",
        gradient: "from-amber-400 to-red-500",
    },
];

export default function BlogPage() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
            <div className="space-y-8 mb-16">
                <div className="inline-flex items-center gap-2 rounded-none bg-amber-100 dark:bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-zinc-950 dark:text-lime-300 border border-zinc-950/20 dark:border-white/20">
                    Developer Insights
                </div>
                <h1 className="text-5xl font-black tracking-tight sm:text-7xl leading-[1.05]">
                    The <span className="bg-gradient-to-r from-zinc-950 via-cyan-500 to-amber-400 bg-clip-text text-transparent">nxtdev Blog.</span>
                </h1>
                <p className="max-w-2xl text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                    Stay up to date with the latest in DNS management, web development, and cloud infrastructure tips from our engineering team.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                        <Card className="h-full p-8 sm:p-10 rounded-lg border-zinc-950 dark:border-white/20 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all overflow-hidden relative">
                            <div className="flex flex-col h-full space-y-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <Badge tone="ok" className="rounded-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">{post.category}</Badge>
                                    <span className="text-sm font-bold text-zinc-400">{post.date}</span>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-3xl font-black text-zinc-900 dark:text-white group-hover:text-zinc-950 dark:group-hover:text-lime-300 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                        {post.description}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 flex items-center text-zinc-950 dark:text-lime-300 font-black text-sm uppercase tracking-widest gap-2">
                                    Read Article
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </main>
    );
}

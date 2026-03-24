import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Why DNS Security Matters for Developers | nxtdev Blog",
    description: "Explore the importance of DNS security for your web applications. Learn how nxtdev.xyz protects against hijacking, spoofing, and phishing.",
    keywords: ["dns security", "subdomain security", "nxtdev safety checks", "dns hijacking", "web application security"],
};

export default function BlogPost2() {
    return (
        <article className="mx-auto max-w-4xl px-4 py-20 sm:py-32">
            <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors font-black text-sm uppercase tracking-widest mb-12 group">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
                Back to Blog
            </Link>

            <div className="space-y-8 mb-16">
                <div className="flex items-center gap-4">
                    <Badge tone="ok" className="rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">Security</Badge>
                    <span className="text-sm font-bold text-zinc-400">Published March 23, 2026</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight sm:text-7xl leading-[1.05]">
                    Why <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">DNS Security Matters</span> for Developers.
                </h1>
                <p className="text-2xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                    Building great apps is only half the battle. Securing the infrastructure that points to them is just as critical.
                </p>
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
                <section className="space-y-6">
                    <h2 className="text-3xl font-black text-zinc-900 dark:text-white">The Hidden Risks of DNS</h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        DNS is the backbone of the internet, but it's often overlooked. Poorly secured DNS can lead to hijacking, cache poisoning, and man-in-the-middle attacks. For developer subdomains, the risk is even higher since they are often used for testing systems or staging builds.
                    </p>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">1. Anti-Phishing Checks</h3>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        At nxtdev.xyz, we implement strict automated checks using AbuseIPDB and internal filtering to prevent malicious actors from creating deceptive subdomains. This protects both developers and users.
                    </p>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">2. DNS Hijacking Protection</h3>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        Once you claim a subdomain, it's yours. Our platform ensures that ownership is verified through reliable auth providers like Clerk, so only authorized users can modify their records.
                    </p>
                    <pre className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 overflow-x-auto">
                        <code className="text-sm font-mono text-purple-600 dark:text-purple-400">
                            {`// nxtdev.xyz safety protocol
const isAuthorized = await checkOwnership(subdomainId, userId);
if (!isAuthorized) throw new Error("Unauthorized");`}
                        </code>
                    </pre>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">3. Role of Nameserver Delegation</h3>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        For advanced users, we support NS delegation. This allows you to hand over DNS control to another provider while keeping the security of our base domain. Our delegation checks ensure your nameservers are valid and secure.
                    </p>
                </section>

                <div className="p-10 rounded-[2.5rem] bg-purple-600/5 border-2 border-dashed border-purple-600/20 text-center space-y-6 mt-16">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">Protect your project now.</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        Join thousands of developers who trust nxtdev.xyz for secure and easy subdomain management.
                    </p>
                    <Link href="/sign-up" className="inline-block">
                        <Button size="lg" className="rounded-2xl px-10 h-14 font-black">Join nxtdev</Button>
                    </Link>
                </div>
            </div>
        </article>
    );
}

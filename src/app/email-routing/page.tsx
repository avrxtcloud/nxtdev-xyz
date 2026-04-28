import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmailRoutingPage() {
    return (
        <main className="mx-auto flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-20 overflow-hidden">
            <div className="relative w-full max-w-4xl">
                {/* Background Gradients */}
                <div className="absolute -top-40 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

                <div className="relative space-y-16 text-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100/50 dark:bg-indigo-900/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50 shadow-sm animate-bounce-subtle">
                            New Feature: Coming Soon
                        </div>
                        <h1 className="text-5xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-7xl lg:text-8xl leading-[1]">
                            Email <br />
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent underline decoration-blue-500/20 underline-offset-8">Masking.</span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
                            Protect your primary inbox. Create unique <span className="text-zinc-900 dark:text-white font-bold">@nxtdev.xyz</span> aliases that forward directly to your real address.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 text-left">
                        <Card className="p-8 rounded-[2rem] border-zinc-100/50 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-blue-100/50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Hide From Attackers</h3>
                            <p className="text-zinc-500 font-medium leading-relaxed">
                                Prevent scrapers and data brokers from finding your real identity by using aliases for public registrations.
                            </p>
                        </Card>
                        <Card className="p-8 rounded-[2rem] border-zinc-100/50 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-indigo-100/50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                            </div>
                            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Seamless Routing</h3>
                            <p className="text-zinc-500 font-medium leading-relaxed">
                                Manage all your alias forwarding rules directly from the nxtdev dashboard with zero latency.
                            </p>
                        </Card>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
                        <Link href="/subscribe">
                            <Button size="lg" className="h-14 px-10 text-base font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
                                Notify Me on Release
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="ghost" className="h-14 px-8 text-base font-bold rounded-2xl text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100">
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-20 opacity-40">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                            Launching Q3 2026 • Included in Early Access
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

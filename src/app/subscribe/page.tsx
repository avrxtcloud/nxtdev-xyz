"use client";

import { useActionState } from "react";
import { subscribeAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { env } from "@/lib/env";

export default function SubscribePage() {
    const [state, formAction, isPending] = useActionState(subscribeAction, null);

    return (
        <main className="mx-auto flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-20">
            <div className="relative group w-full max-w-xl">
                {/* Decorative Glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-30 transition duration-1000"></div>

                <Card className="relative p-10 sm:p-16 rounded-[2.5rem] border-zinc-100/50 dark:border-zinc-800 shadow-2xl space-y-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
                    <div className="space-y-4 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 shadow-sm animate-bounce-subtle">
                            Newsletter
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
                            Stay in the <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent underline decoration-blue-500/20 underline-offset-8">Loop.</span>
                        </h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed font-medium">
                            Join the nxtdev community. Get updates on new features, record types, and platform improvements.
                        </p>
                    </div>

                    {!state?.success ? (
                        <form action={formAction} className="space-y-6 animate-[fade-in_400ms_ease-out]">
                            <div className="space-y-2">
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    autoComplete="email"
                                    required
                                    className="h-14 px-6 rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-base font-medium shadow-inner transition-all focus:ring-4 focus:ring-blue-500/10 placeholder:text-zinc-400"
                                />
                                {state?.error && (
                                    <p className="text-sm font-bold text-red-500 pl-2 animate-shake">
                                        {state.error}
                                    </p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isPending}
                                className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isPending ? (
                                    <div className="flex items-center gap-2">
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        <span>Subscribing...</span>
                                    </div>
                                ) : (
                                    "Subscribe for Updates"
                                )}
                            </Button>
                        </form>
                    ) : (
                        <div className="animate-[fade-in-down_400ms_ease-out] text-center space-y-8 py-4">
                            <div className="h-20 w-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto shadow-inner border border-emerald-100 dark:border-emerald-800">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-3xl font-black text-zinc-900 dark:text-white leading-tight">You're All Set!</h2>
                                <p className="text-zinc-600 dark:text-zinc-400 font-medium text-lg leading-relaxed">
                                    Thanks for subscribing. We'll send you a shout-out whenever something big drops at {process.env.NEXT_PUBLIC_APP_URL ? env.ROOT_DOMAIN : 'nxtdev.xyz'}.
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                className="h-12 px-8 rounded-xl font-bold border-zinc-200 dark:border-zinc-800"
                                onClick={() => window.location.href = "/"}
                            >
                                Return Home
                            </Button>
                        </div>
                    )}

                    <p className="text-center text-xs text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                        NO SPAM. JUST TECH UPDATES. UNFOLLOW ANYTIME.
                    </p>
                </Card>
            </div>
        </main>
    );
}

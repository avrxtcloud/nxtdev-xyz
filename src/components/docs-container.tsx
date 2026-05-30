import { ReactNode } from "react";
import Link from "next/link";

export default function DocsContainer({
    title,
    children,
    subtitle,
    backLink = "/docs",
}: {
    title: string;
    subtitle?: string;
    children: ReactNode;
    backLink?: string;
}) {
    return (
        <main className="mx-auto max-w-4xl px-4 py-12 sm:py-20 lg:px-8">
            {backLink && (
                <div className="mb-10">
                    <Link
                        href={backLink}
                        className="group inline-flex items-center gap-2 border-2 border-zinc-950 bg-white px-3 py-1.5 text-sm font-black text-zinc-950 shadow-[3px_3px_0_#22d3ee] transition-transform hover:-translate-y-0.5 dark:border-white dark:bg-zinc-950 dark:text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="group-hover:-translate-x-1 transition-transform"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        <span>Back to documentation</span>
                    </Link>
                </div>
            )}

            <div className="space-y-6 mb-16 lg:mb-20">
                <h1 className="text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed font-medium">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight
        prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400
        prose-a:text-zinc-950 dark:prose-a:text-white prose-a:font-black prose-a:underline prose-a:decoration-cyan-400 prose-a:decoration-2 prose-a:underline-offset-4
        prose-code:text-zinc-950 dark:prose-code:text-lime-300 prose-code:bg-amber-100 dark:prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none
        prose-strong:text-zinc-900 dark:prose-strong:text-white
      ">
                {children}
            </div>
        </main>
    );
}

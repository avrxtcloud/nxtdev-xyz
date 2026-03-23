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
        <main className="mx-auto max-w-4xl px-4 py-12 sm:py-24 lg:px-8">
            {backLink && (
                <div className="mb-10">
                    <Link
                        href={backLink}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all duration-200 group bg-zinc-100/50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
                <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
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
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-code:text-blue-600 dark:prose-code:text-blue-300 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-strong:text-zinc-900 dark:prose-strong:text-white
      ">
                {children}
            </div>
        </main>
    );
}

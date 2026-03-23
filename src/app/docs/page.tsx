import Link from "next/link";
import { Card } from "@/components/ui/card";
import { env } from "@/lib/env";

export default function DocsPage() {
  const sections = [
    {
      title: "Quick Start",
      description: "Get up and running with your own free subdomain in minutes.",
      href: "/docs/quick-start",
      icon: (
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Limits",
      description: "Understand usage policies and record quotas for your domains.",
      href: "/docs/limits",
      icon: (
        <svg
          className="w-8 h-8 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    {
      title: "Record Types",
      description: "All supported DNS record types and their configuration.",
      href: "/docs/record-types",
      icon: (
        <svg
          className="w-8 h-8 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: "NS Delegation",
      description: "How to delegate your subdomain's DNS to external providers.",
      href: "/docs/nsdelegation",
      icon: (
        <svg
          className="w-8 h-8 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
    },
    {
      title: "Support",
      description: "Need help? Contact our support team for specialized assistance.",
      href: "/docs/support",
      icon: (
        <svg
          className="w-8 h-8 text-rose-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      title: "Email Routing",
      description: "Launch soon: Mask your real email with nxtdev.xyz aliases.",
      href: "/email-routing",
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"
          />
        </svg>
      ),
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:py-24 lg:py-32">
      <div className="flex flex-col items-center text-center space-y-8 mb-20 lg:mb-28">
        <div className="rounded-full bg-blue-100/50 dark:bg-blue-900/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 shadow-sm animate-bounce-subtle">
          Knowledge Base
        </div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl lg:text-7xl max-w-4xl leading-[1.1]">
          Master <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{env.ROOT_DOMAIN}</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-medium px-4">
          Everything you need to know about managing your free DNS records and claiming subdomains effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition duration-300 blur"></div>
            <Card className="relative h-full p-8 lg:p-10 space-y-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:bg-white dark:hover:bg-zinc-900 cursor-pointer shadow-sm hover:shadow-xl rounded-3xl border border-zinc-100 dark:border-zinc-800">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl w-fit shadow-inner border border-zinc-100/50 dark:border-zinc-700/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-zinc-800">
                {section.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {section.title}
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {section.description}
                </p>
              </div>
              <div className="pt-4 flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Explore Doc
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}

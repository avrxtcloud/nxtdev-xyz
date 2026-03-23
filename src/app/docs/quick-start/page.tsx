import DocsContainer from "@/components/docs-container";
import { env } from "@/lib/env";

export default function QuickStart() {
    return (
        <DocsContainer
            title="Quick Start"
            subtitle={`Let's get your first subdomain active on ${env.ROOT_DOMAIN} in less than two minutes.`}
        >
            <div className="space-y-12">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">What is {env.ROOT_DOMAIN}?</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        {env.ROOT_DOMAIN} is a free subdomain provider and DNS management service. We allow you to claim unique subdomains and manage their DNS records directly within our platform, without needing your own apex domain or Cloudflare account.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Step-by-Step Guide</h2>

                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="flex-none w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                                1
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Create an Account</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Click the "Sign in" button in the top right corner. We support various social login providers for a seamless authentication experience.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-none w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                                2
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Claim Your Base Label</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Navigate to your Dashboard and enter a base label (e.g., <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-blue-600">alice</code>). If available, you'll immediately own <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-blue-600">alice.{env.ROOT_DOMAIN}</code>.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-none w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                                3
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Configure DNS Records</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Add records for hosts like <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-blue-600">@</code> for the apex, or <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-blue-600">api</code> for sub-subdomains. We support multiple types like A, AAAA, CNAME, and more.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-none w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                                4
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Verify Propagation</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Use our built-in "Check Propagation" tool to see if your records are live across global resolvers.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl flex gap-4">
                    <div className="p-2 bg-white dark:bg-blue-900/40 rounded-lg h-fit border border-blue-200 dark:border-blue-700">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-bold text-blue-900 dark:text-blue-100">Pro Tip</h4>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                            You can pointed multiple records to the same target using CNAME flattening if needed, or use the apex (@) to point directly to your primary server IP.
                        </p>
                    </div>
                </div>
            </div>
        </DocsContainer>
    );
}

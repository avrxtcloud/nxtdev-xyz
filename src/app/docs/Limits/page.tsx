import DocsContainer from "@/components/docs-container";
import { env } from "@/lib/env";

export default function Limits() {
    return (
        <DocsContainer
            title="Limits & Quotas"
            subtitle={`Find out how many subdomains and DNS records you can manage for your projects on ${env.ROOT_DOMAIN}.`}
        >
            <div className="space-y-12">
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Account Quotas</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        To ensure fair usage and prevent system abuse, We implement standard quotas for every authenticated user.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm bg-white dark:bg-zinc-900/50 space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">Subdomains</span>
                            <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white">2</h3>
                            <p className="text-sm text-zinc-500">Maximum base subdomains per user.</p>
                        </div>

                        <div className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm bg-white dark:bg-zinc-900/50 space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">DNS Records</span>
                            <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white">100</h3>
                            <p className="text-sm text-zinc-500">Records per base subdomain.</p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">System Limitations</h2>
                    <div className="overflow-hidden border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                        <table className="min-w-full divide-y divide-zinc-100 dark:divide-zinc-800">
                            <thead className="bg-zinc-50 dark:bg-zinc-900">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">Feature</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">Limit</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-zinc-950 divide-y divide-zinc-100 dark:divide-zinc-800">
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-white whitespace-nowrap">Apex Records (@)</td>
                                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Included in DNS Limit</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-white whitespace-nowrap">Wildcard Records (*)</td>
                                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Unsupported for apex</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-white whitespace-nowrap">TTL Values</td>
                                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">Managed by Cloudflare (approx. 1h)</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-white whitespace-nowrap">Domain Propagation</td>
                                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">Near-instantaneous on most resolvers</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="space-y-6 p-8 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40">
                    <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100">Prohibited Records</h2>
                    <p className="text-orange-800 dark:text-orange-200">
                        We do not allow records that:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-orange-800 dark:text-orange-200 text-sm">
                        <li>Are used for phishing, malware, or impersonation.</li>
                        <li>Point to blocked or high-risk IP ranges (verified by AbuseIPDB).</li>
                        <li>Violate our Terms of Service.</li>
                    </ul>
                </section>
            </div>
        </DocsContainer>
    );
}

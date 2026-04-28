import DocsContainer from "@/components/docs-container";
import { Badge } from "@/components/ui/badge";

export default function LimitsPage() {
    return (
        <DocsContainer
            title="Usage Limits"
            subtitle="Understanding the boundaries and quotas of the free tier."
        >
            <div className="space-y-12">
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Fair Use Policy</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        To ensure high availability for all developers, we implement soft and hard limits on resource usage. These are designed to prevent abuse while providing ample headroom for production-grade projects.
                    </p>
                </section>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 text-blue-600 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center border border-blue-100 dark:border-blue-900/50 shadow-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                            </div>
                            <h3 className="font-bold text-zinc-900 dark:text-white">Subdomains</h3>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-black text-zinc-900 dark:text-white">2</span>
                            <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Domains</span>
                        </div>
                        <p className="text-sm text-zinc-500 font-medium">Maximum number of root-level subdomains per account.</p>
                    </div>

                    <div className="p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 text-purple-600 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center border border-purple-100 dark:border-purple-900/50 shadow-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <h3 className="font-bold text-zinc-900 dark:text-white">DNS Records</h3>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-black text-zinc-900 dark:text-white">100</span>
                            <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Records</span>
                        </div>
                        <p className="text-sm text-zinc-500 font-medium">Combined limit of all managed records per subdomain.</p>
                    </div>
                </div>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Rate Limiting</h2>
                    <div className="overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800">
                        <table className="w-full text-sm text-left font-medium">
                            <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 uppercase text-[10px] tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Action</th>
                                    <th className="px-6 py-4 text-right">Limit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                <tr>
                                    <td className="px-6 py-4 text-zinc-900 dark:text-white">API Propogation Checks</td>
                                    <td className="px-6 py-4 text-right text-zinc-600 dark:text-zinc-400">60 / Minute</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-zinc-900 dark:text-white">DNS Modifications</td>
                                    <td className="px-6 py-4 text-right text-zinc-600 dark:text-zinc-400">10 / Minute</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </DocsContainer>
    );
}

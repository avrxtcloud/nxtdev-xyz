import DocsContainer from "@/components/docs-container";
import { env } from "@/lib/env";

export default function NSDelegation() {
    return (
        <DocsContainer
            title="NS Delegation"
            subtitle={`Delegate your subdomain's DNS to external providers with the NS record type.`}
        >
            <div className="space-y-12">
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white underline decoration-zinc-100 dark:decoration-zinc-800 underline-offset-8 decoration-4 mb-4">What is NS Delegation?</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        If you want to use our subdomain with your own custom nameservers (like Cloudflare, Netlify, or your own self-hosted nameservers), you can use the NS delegation feature.
                    </p>

                    <div className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm bg-white dark:bg-zinc-900/50 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Important Note</h3>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            When you add delegation at the apex of your subdomain (e.g., <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">alice.{env.ROOT_DOMAIN}</code>), internal DNS editing for your other records becomes **read-only** to prevent conflicts.
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            To switch back to managing your records on our platform, simply remove all delegated NS records first.
                        </p>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">How to setup Nameserver Delegation</h2>

                    <div className="space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-8 border border-zinc-100 dark:border-zinc-800 rounded-3xl">
                        <ol className="list-decimal pl-5 space-y-6 text-zinc-600 dark:text-zinc-400">
                            <li>Log in to your dashboard and navigate to your subdomain settings.</li>
                            <li>Navigate to the **Record Management** section.</li>
                            <li>Add one or more **NS** records pointing to your external providers' nameservers (e.g., <code className="bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded shadow-sm">ns1.example.com</code>).</li>
                            <li>Save your changes. It may take up to 24-48 hours for global DNS changes to fully propagate across all resolvers.</li>
                        </ol>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Troubleshooting</h2>
                    <ul className="list-disc pl-5 space-y-4 text-zinc-600 dark:text-zinc-400">
                        <li>
                            <strong>Internal records are not resolving:</strong> If you've delegated your domain, our internal platform records will no longer be served by the global DNS system. You must manage them on your external provider's interface.
                        </li>
                        <li>
                            <strong>Reverting Delegation:</strong> If you want to switch back to managing your records on the {env.ROOT_DOMAIN} platform, you must delete all NS delegation records from your dashboard.
                        </li>
                    </ul>
                </section>
            </div>
        </DocsContainer>
    );
}

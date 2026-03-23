import DocsContainer from "@/components/docs-container";
import { env } from "@/lib/env";
import Link from "next/link";

export default function Support() {
    return (
        <DocsContainer
            title="Support & Community"
            subtitle={`Our support team is here to help you with any issue or question you may have.`}
        >
            <div className="space-y-12">
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white underline decoration-zinc-100 dark:decoration-zinc-800 underline-offset-8 decoration-4 mb-4">Contact Us</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        For technical assistance or reporting website issues, please use our primary email support or the specialized reporting page.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm bg-white dark:bg-zinc-900/50 space-y-3 transition-colors hover:border-blue-400 dark:hover:border-blue-500">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-300 w-fit">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Email Support</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Support: <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-blue-600 font-bold">support@{env.ROOT_DOMAIN}</code>
                            </p>
                            <p className="text-xs text-zinc-500">Response time within 24-48 hours.</p>
                        </div>

                        <div className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm bg-white dark:bg-zinc-900/50 space-y-3 transition-colors hover:border-red-400 dark:hover:border-red-500">
                            <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg text-red-600 dark:text-red-300 w-fit">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Report Abuse</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Visit our <Link href="/report" className="text-red-600 font-bold hover:underline">Abuse Report Page</Link> for reporting malicious subdomains.
                            </p>
                            <p className="text-xs text-zinc-500">Fast action for phishing and scams.</p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white underline decoration-zinc-100 dark:decoration-zinc-800 underline-offset-8 decoration-4 mb-4">FAQs & Troubleshooting</h2>

                    <div className="space-y-4">
                        <details className="group border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 bg-white dark:bg-zinc-900/50 shadow-sm cursor-pointer transition-colors hover:border-zinc-300 dark:hover:border-zinc-700">
                            <summary className="font-bold text-zinc-900 dark:text-white list-none flex items-center justify-between">
                                <span>How can I delete my account?</span>
                                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                To delete your account and remove all associated subdomains and records, please contact us at <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-blue-600">support@{env.ROOT_DOMAIN}</code>.
                            </p>
                        </details>

                        <details className="group border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 bg-white dark:bg-zinc-900/50 shadow-sm cursor-pointer transition-colors hover:border-zinc-300 dark:hover:border-zinc-700">
                            <summary className="font-bold text-zinc-900 dark:text-white list-none flex items-center justify-between">
                                <span>Are subdomains truly free forever?</span>
                                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Yes, our subdomains are and will always be free for individual users, as long as they adhere to our Terms of Service and do not involve malicious content.
                            </p>
                        </details>
                    </div>
                </section>
            </div>
        </DocsContainer>
    );
}

import DocsContainer from "@/components/docs-container";
import { env } from "@/lib/env";

export default function RecordTypes() {
    const records = [
        { type: "A", name: "Address", description: "Points a hostname to an IPv4 address (e.g. 1.2.3.4)." },
        { type: "AAAA", name: "IPv6 Address", description: "Points a hostname to an IPv6 address (e.g. 2001:db8::1)." },
        { type: "CNAME", name: "Canonical Name", description: "Forward one hostname to another (e.g. blog.yourname.com -> medium.com)." },
        { type: "TXT", name: "Text", description: "Provide descriptive text for your domain (e.g. for site verification or SPF)." },
        { type: "MX", name: "Mail Exchange", description: "Directs email for a domain to a mail server." },
        { type: "SRV", name: "Service", description: "Specifies a server for specific services." },
        { type: "NS", name: "Nameserver", description: "Delegates a subdomain to a different set of nameservers." },
    ];

    return (
        <DocsContainer
            title="Record Types"
            subtitle={`Comprehensive list of all DNS records currently supported by the ${env.ROOT_DOMAIN} platform.`}
        >
            <div className="space-y-12">
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Supported Records</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        We support the most commonly used DNS record types to provide you with full flexibility for your projects.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {records.map((r) => (
                            <div key={r.type} className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm bg-white dark:bg-zinc-900/50 space-y-3 transition-colors hover:border-blue-400 dark:hover:border-blue-500">
                                <div className="flex items-center gap-3">
                                    <span className="flex-none w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-bold flex items-center justify-center border border-blue-200 dark:border-blue-800 shadow-sm">
                                        {r.type}
                                    </span>
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                                        {r.name}
                                    </h3>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {r.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Hosting Guidelines</h2>
                    <ul className="list-disc pl-5 space-y-4 text-zinc-600 dark:text-zinc-400">
                        <li>
                            <strong>Apex Record (@):</strong> Use <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-blue-600">@</code> to represent your base subdomain (e.g., <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">alice.{env.ROOT_DOMAIN}</code>).
                        </li>
                        <li>
                            <strong>Relative Names:</strong> Use relative hostnames like <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-blue-600">api</code> to target <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">api.alice.{env.ROOT_DOMAIN}</code>.
                        </li>
                        <li>
                            <strong>Case Sensitivity:</strong> All records are case-insensitive and stored in a standard format.
                        </li>
                    </ul>
                </section>
            </div>
        </DocsContainer>
    );
}

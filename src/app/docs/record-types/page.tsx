import DocsContainer from "@/components/docs-container";

export default function RecordTypesPage() {
    return (
        <DocsContainer
            title="Supported Record Types"
            subtitle="Full technical listing and usage details for our DNS infrastructure."
        >
            <div className="space-y-12">
                <section className="space-y-4">
                    <p className="text-zinc-600 dark:text-zinc-400">
                        We support the most commonly used DNS records for modern web services. All records are instantly propagated globally across our edge nodes.
                    </p>
                </section>

                <div className="grid gap-6">
                    {[
                        { type: "A", name: "Address Record", usage: "Maps a host name to an IPv4 address.", example: "10.0.0.1" },
                        { type: "AAAA", name: "IPv6 Address", usage: "Maps a host name to an IPv6 address.", example: "2001:db8::1" },
                        { type: "CNAME", name: "Canonical Name", usage: "Alias for one host to another on the internet.", example: "target.com" },
                        { type: "MX", name: "Mail Exchange", usage: "Directs email to specific mail servers with priority.", example: "mail.example.com" },
                        { type: "TXT", name: "Text Record", usage: "Used for verification, SPF, and miscellaneous metadata.", example: "v=spf1 include:_spf.google.com ~all" },
                        { type: "SRV", name: "Service Locator", usage: "Identifying hosts for specific network services.", example: "0 5 5060 sips.example.com" },
                        { type: "NS", name: "Nameserver", usage: "Delegate a sub-subdomain to an external provider.", example: "ns1.provider.com" }
                    ].map((r) => (
                        <div key={r.type} className="group p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-all flex flex-col md:flex-row gap-6">
                            <div className="flex-none h-12 w-20 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-black text-xs tracking-widest shadow-lg">
                                {r.type}
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {r.name}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                    {r.usage}
                                </p>
                                <div className="pt-2">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Standard Value</h4>
                                    <code className="text-xs font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                                        {r.example}
                                    </code>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DocsContainer>
    );
}

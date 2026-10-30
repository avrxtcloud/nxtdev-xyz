import Link from "next/link";
import DocsContainer from "@/components/docs-container";

export default function NSDelegation() {
  return <DocsContainer title="Nameserver delegation retired" subtitle="nxtdev no longer delegates subdomains to external nameservers."><div className="avrxt-panel rounded-2xl p-6"><p className="text-sm leading-7 text-zinc-400">The platform now keeps DNS management focused, secure, and predictable. Use A, AAAA, CNAME, and TXT records in the managed workspace.</p><Link className="mt-5 inline-block text-sm font-medium text-violet-200 underline underline-offset-4" href="/docs/record-types">View supported record types →</Link></div></DocsContainer>;
}

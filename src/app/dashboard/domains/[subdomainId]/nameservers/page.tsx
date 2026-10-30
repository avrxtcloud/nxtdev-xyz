import Link from "next/link";

export default function NameserversPage({ params }: { params: Promise<{ subdomainId: string }> }) {
  return <RetiredDelegation params={params} />;
}

async function RetiredDelegation({ params }: { params: Promise<{ subdomainId: string }> }) {
  const { subdomainId } = await params;
  return <section className="avrxt-panel rounded-2xl p-6 sm:p-9"><p className="avrxt-eyebrow">Retired capability</p><h1 className="mt-3 text-3xl font-semibold tracking-[-.06em] text-white">Nameserver delegation is no longer available.</h1><p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">nxtdev now provides a focused managed DNS experience. Use A, AAAA, CNAME, and TXT records from the domain workspace.</p><Link className="mt-7 inline-flex rounded-lg bg-violet-300 px-4 py-2.5 text-sm font-semibold text-zinc-950" href={`/dashboard/domains/${subdomainId}/records`}>Open DNS records →</Link></section>;
}

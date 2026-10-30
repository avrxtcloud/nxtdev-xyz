"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

type Props = { subdomainId: string; record: { id: string; type: string; host: string; content: string; ttl: number }; action: (subdomainId: string, recordId: string, state: unknown, fd: FormData) => Promise<unknown>; disabled: boolean };

export function EditRecordForm({ subdomainId, record, action, disabled }: Props) {
  const [state, formAction] = useActionState(action.bind(null, subdomainId, record.id), null);
  return <form action={formAction} className="grid gap-5"><input type="hidden" name="type" value={record.type} />
    <div className="flex items-center gap-3 border-b border-white/10 pb-4"><span className="rounded-md bg-violet-300 px-2 py-1 font-mono text-xs font-bold text-zinc-950">{record.type}</span><span className="text-sm text-zinc-400">DNS-only managed record</span></div>
    <div className="grid gap-4 md:grid-cols-2"><label className="grid gap-2"><span className="avrxt-eyebrow text-zinc-500">Host</span><Input name="host" defaultValue={record.host} disabled={disabled} required /></label><label className="grid gap-2"><span className="avrxt-eyebrow text-zinc-500">Content</span><Input name="content" defaultValue={record.content} disabled={disabled} required /></label><label className="grid gap-2"><span className="avrxt-eyebrow text-zinc-500">TTL / seconds</span><Input name="ttl" type="number" min={60} max={86400} defaultValue={record.ttl} disabled={disabled} required /></label></div>
    <div className="flex flex-wrap justify-end gap-3 border-t border-white/10 pt-5"><Link className="inline-flex h-11 items-center rounded-lg border border-white/15 px-4 text-sm text-zinc-300 hover:bg-white/[.06]" href={`/dashboard/domains/${subdomainId}/records`}>Cancel</Link><SubmitButton disabled={disabled} pendingText="Saving...">Save changes</SubmitButton></div>
    {state && typeof state === "object" && "error" in state && (state as { error?: string }).error ? <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-100">{(state as { error: string }).error}</p> : null}
  </form>;
}

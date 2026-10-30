"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { Select } from "@/components/ui/select";

type Props = { action: (state: unknown, fd: FormData) => void | Promise<unknown>; disabled: boolean };

export function CreateRecordForm({ action, disabled }: Props) {
  const [state, formAction] = useActionState(action, null);
  const [type, setType] = useState("A");
  const placeholder = type === "A" ? "192.0.2.1" : type === "AAAA" ? "2001:db8::1" : type === "CNAME" ? "cname.vercel-dns.com" : "vc-domain-verify=...";
  return <form action={formAction} className="grid gap-4">
    <div className="grid gap-3 md:grid-cols-[150px_minmax(130px,.55fr)_minmax(0,1.45fr)]">
      <label className="grid gap-2"><span className="avrxt-eyebrow text-zinc-500">Type</span><Select name="type" value={type} onChange={setType} disabled={disabled} options={[{ label: "A", value: "A", description: "IPv4 address" }, { label: "AAAA", value: "AAAA", description: "IPv6 address" }, { label: "CNAME", value: "CNAME", description: "Hostname alias" }, { label: "TXT", value: "TXT", description: "Verification or text" }]} /></label>
      <label className="grid gap-2"><span className="avrxt-eyebrow text-zinc-500">Host</span><Input name="host" defaultValue="@" placeholder="@" disabled={disabled} required /></label>
      <label className="grid gap-2"><span className="avrxt-eyebrow text-zinc-500">Content</span><Input name="content" placeholder={placeholder} disabled={disabled} required /></label>
    </div>
    <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><label className="grid gap-2"><span className="avrxt-eyebrow text-zinc-500">TTL / seconds</span><Input name="ttl" type="number" min={60} max={86400} placeholder="3600" className="h-9 w-28" disabled={disabled} /></label><p className="mt-5 text-xs text-zinc-500">Records are securely managed as DNS-only.</p></div><SubmitButton disabled={disabled} pendingText="Adding..." className="mt-2 sm:mt-5">Add record</SubmitButton></div>
    {type === "TXT" ? <p className="rounded-lg border border-violet-300/20 bg-violet-300/[.06] px-3 py-2 text-xs leading-5 text-violet-100/90"><span className="font-semibold text-violet-100">Vercel verification:</span> use <code className="font-mono">@</code> for the claimed-domain root, or <code className="font-mono">_vercel</code> if that is the host Vercel provides. Paste Vercel’s complete TXT value unchanged.</p> : null}
    {state && typeof state === "object" && "error" in state && (state as { error?: string }).error ? <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-100">{(state as { error: string }).error}</p> : null}
  </form>;
}

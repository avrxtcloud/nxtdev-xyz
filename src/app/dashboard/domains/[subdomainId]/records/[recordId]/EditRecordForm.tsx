"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import Link from "next/link";

type Props = {
  subdomainId: string;
  record: any;
  action: (subdomainId: string, recordId: string, state: any, fd: FormData) => Promise<any>;
  disabled: boolean;
};

function asObject(v: unknown): Record<string, unknown> | null {
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  return v as Record<string, unknown>;
}

function asString(v: unknown, fallback: string) {
  return typeof v === "string" && v.length ? v : fallback;
}

function asNumber(v: unknown, fallback: number) {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

export function EditRecordForm({ subdomainId, record, action, disabled }: Props) {
  const actionWithIds = action.bind(null, subdomainId, record.id);
  const [state, formAction] = useActionState(actionWithIds, null);
  const data = asObject(record.data);

  return (
    <div className="space-y-6">
      <form action={formAction} className="grid gap-6">
        <input type="hidden" name="type" value={record.type} />
        
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Host</label>
            <div className="mt-1">
              <Input name="host" defaultValue={record.host} disabled={disabled} className="h-12 rounded-2xl font-bold" />
            </div>
          </div>

          {record.type === "SRV" ? (
            <>
              <div className="md:col-span-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Service</label>
                <div className="mt-1">
                  <Input name="service" defaultValue={asString(data?.service, "_service")} disabled={disabled} className="h-12 rounded-2xl font-bold" />
                </div>
              </div>
              <div className="md:col-span-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Proto</label>
                <div className="mt-1">
                  <Input name="proto" defaultValue={asString(data?.proto, "_tcp")} disabled={disabled} className="h-12 rounded-2xl font-bold" />
                </div>
              </div>
              <div className="md:col-span-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Target</label>
                <div className="mt-1">
                  <Input name="target" defaultValue={asString(data?.target, record.content)} disabled={disabled} className="h-12 rounded-2xl font-bold" />
                </div>
              </div>
            </>
          ) : (
            <div className="md:col-span-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Content / Value</label>
              <div className="mt-1">
                <Input name="content" defaultValue={record.content} disabled={disabled} className="h-12 rounded-2xl font-bold" />
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3 items-end">
           {record.type === "MX" && (
             <div>
               <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Priority</label>
               <div className="mt-1">
                 <Input name="priority" type="number" defaultValue={record.priority ?? 10} disabled={disabled} className="h-12 rounded-2xl font-bold" />
               </div>
             </div>
           )}

           {record.type === "SRV" && (
             <div className="md:col-span-3 grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Priority</label>
                  <div className="mt-1">
                    <Input name="priority" type="number" defaultValue={asNumber(data?.priority, 0)} disabled={disabled} className="h-12 rounded-2xl font-bold" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Weight</label>
                  <div className="mt-1">
                    <Input name="weight" type="number" defaultValue={asNumber(data?.weight, 0)} disabled={disabled} className="h-12 rounded-2xl font-bold" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Port</label>
                  <div className="mt-1">
                    <Input name="port" type="number" defaultValue={asNumber(data?.port, 25565)} disabled={disabled} className="h-12 rounded-2xl font-bold" />
                  </div>
                </div>
             </div>
           )}

           <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">TTL (Seconds)</label>
              <div className="mt-1">
                <Input name="ttl" type="number" defaultValue={record.ttl} disabled={disabled} className="h-12 rounded-2xl font-bold" />
              </div>
           </div>

           <div className="flex flex-col gap-4">
              {(record.type === "A" || record.type === "AAAA" || record.type === "CNAME") && (
                <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 cursor-pointer hover:text-orange-500 transition-colors">
                  <input type="checkbox" name="proxied" defaultChecked={record.proxied ?? false} disabled={disabled} className="rounded border-zinc-300 text-orange-500 focus:ring-orange-500/20 h-4 w-4" />
                  Proxied (Cloudflare)
                </label>
              )}
           </div>

           <div className="flex justify-end gap-3">
              <Link href={`/dashboard/domains/${subdomainId}/records`}>
                <SubmitButton type="button" variant="secondary" className="h-12 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px]">Cancel</SubmitButton>
              </Link>
              <SubmitButton disabled={disabled} pendingText="Saving..." className="h-12 px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-zinc-900 dark:bg-white dark:text-zinc-950 shadow-lg shadow-black/5 hover:scale-105 active:scale-95 transition-all">
                Save Changes
              </SubmitButton>
           </div>
        </div>
      </form>

      {state?.error && (
        <div className="p-5 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-[2rem] flex items-center gap-4 animate-in fade-in slide-in-from-top-1 duration-200">
           <svg className="w-6 h-6 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
           <p className="text-sm font-bold text-red-800 dark:text-red-200">{state.error}</p>
        </div>
      )}
    </div>
  );
}

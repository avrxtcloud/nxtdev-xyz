"use client";

import { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { Select } from "@/components/ui/select";

type Props = {
  action: (state: any, fd: FormData) => void | Promise<any>;
  disabled: boolean;
};

export function CreateRecordForm({ action, disabled }: Props) {
  const [state, formAction] = useActionState(action, null);
  const [type, setType] = useState("A");

  return (
    <div className="space-y-4">
      <form action={formAction} className="grid gap-3">
        <div className="grid gap-2 md:grid-cols-4 items-end">
          <div className="md:col-span-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Type</label>
            <div className="mt-1">
              <Select
                name="type"
                value={type}
                onChange={setType}
                disabled={disabled}
                options={[
                  { label: "A", value: "A", description: "IPv4 address" },
                  { label: "AAAA", value: "AAAA", description: "IPv6 address" },
                  { label: "CNAME", value: "CNAME", description: "Alias to another hostname" },
                  { label: "TXT", value: "TXT", description: "Text (SPF/verification)" },
                  { label: "MX", value: "MX", description: "Mail exchanger" },
                  { label: "SRV", value: "SRV", description: "Service record" },
                ]}
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Host</label>
            <div className="mt-1">
              <Input name="host" placeholder="@" defaultValue="@" disabled={disabled} className="h-10 rounded-xl" />
            </div>
          </div>

          {type !== "SRV" ? (
            <div className="md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Content / Target</label>
              <div className="mt-1">
                <Input
                  name="content"
                  placeholder={type === "A" ? "1.2.3.4" : type === "AAAA" ? "2606:4700:..." : "target"}
                  disabled={disabled}
                  required
                  className="h-10 rounded-xl"
                />
              </div>
            </div>
          ) : (
            <div className="md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Target</label>
              <div className="mt-1">
                <Input name="target" placeholder="target.example.com" disabled={disabled} required className="h-10 rounded-xl" />
              </div>
            </div>
          )}
        </div>

        {type === "MX" ? (
          <div className="grid gap-2 md:grid-cols-3">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Priority</label>
              <div className="mt-1">
                <Input name="priority" type="number" min={0} max={65535} defaultValue={10} disabled={disabled} className="h-10 rounded-xl" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">TTL</label>
              <div className="mt-1">
                <Input name="ttl" type="number" min={60} max={86400} placeholder="3600" disabled={disabled} className="h-10 rounded-xl" />
              </div>
            </div>
          </div>
        ) : null}

        {type === "SRV" ? (
          <div className="grid gap-2 md:grid-cols-6">
            <div className="md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Service</label>
              <div className="mt-1">
                <Input name="service" placeholder="_minecraft" defaultValue="_service" disabled={disabled} className="h-10 rounded-xl" />
              </div>
            </div>
            <div className="md:col-span-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Proto</label>
              <div className="mt-1">
                <Input name="proto" placeholder="_tcp" defaultValue="_tcp" disabled={disabled} className="h-10 rounded-xl" />
              </div>
            </div>
            <div className="md:col-span-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Priority</label>
              <div className="mt-1">
                <Input name="priority" type="number" min={0} max={65535} defaultValue={0} disabled={disabled} className="h-10 rounded-xl" />
              </div>
            </div>
            <div className="md:col-span-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Weight</label>
              <div className="mt-1">
                <Input name="weight" type="number" min={0} max={65535} defaultValue={0} disabled={disabled} className="h-10 rounded-xl" />
              </div>
            </div>
            <div className="md:col-span-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Port</label>
              <div className="mt-1">
                <Input name="port" type="number" min={1} max={65535} defaultValue={25565} disabled={disabled} className="h-10 rounded-xl" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">TTL</label>
              <div className="mt-1">
                <Input name="ttl" type="number" min={60} max={86400} placeholder="3600" disabled={disabled} className="h-10 rounded-xl" />
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4">
            {(type === "A" || type === "AAAA" || type === "CNAME") && (
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 cursor-pointer hover:text-orange-500 transition-colors">
                <input type="checkbox" name="proxied" disabled={disabled} className="rounded border-zinc-300 text-orange-500 focus:ring-orange-500/20" />
                Proxied (Cloudflare)
              </label>
            )}

            {type !== "MX" && type !== "SRV" && (
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">TTL</label>
                <Input name="ttl" type="number" min={60} max={86400} placeholder="3600" disabled={disabled} className="h-8 w-20 text-[10px] font-bold rounded-lg px-2" />
              </div>
            )}
          </div>

          <SubmitButton disabled={disabled} pendingText="Adding..." className="rounded-xl h-10 px-8 font-black uppercase tracking-widest text-[10px] bg-zinc-900 dark:bg-white dark:text-zinc-950 shadow-lg shadow-black/5 hover:scale-105 active:scale-95 transition-all">
            Add Record
          </SubmitButton>
        </div>
      </form>

      {state?.error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
           <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
           <p className="text-xs font-bold text-red-800 dark:text-red-200">{state.error}</p>
        </div>
      )}
    </div>
  );
}

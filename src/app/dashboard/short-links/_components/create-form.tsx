"use client";

import { useActionState } from "react";
import { createShortLinkAction } from "../actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";

export function CreateShortLinkForm() {
  const [state, formAction] = useActionState(createShortLinkAction, null);

  return (
    <div className="space-y-4">
      <form action={formAction} className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1 space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Destination URL</label>
          <Input name="originalUrl" placeholder="https://your-long-url.com/..." required className="rounded-xl" />
        </div>
        <div className="sm:pt-6">
          <SubmitButton pendingText="Creating..." className="rounded-xl px-10 h-10 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-500/20">Shorten</SubmitButton>
        </div>
      </form>
      {state?.error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           {state.error}
        </div>
      )}
    </div>
  );
}

"use client";

import { useActionState, useState } from "react";
import { createApiKeyAction } from "../actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CreateApiKeyForm() {
  const [state, formAction] = useActionState(createApiKeyAction, null);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800">
        <form action={formAction} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Key Name</label>
            <Input name="name" placeholder="e.g. My Home Server" required className="rounded-xl" />
          </div>
          <div className="sm:pt-6">
            <SubmitButton pendingText="Generating..." className="rounded-xl px-10 h-10 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-500/20">Generate Key</SubmitButton>
          </div>
        </form>
      </div>

      {state?.error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-xl text-xs font-bold text-red-600 dark:text-red-400">
          {state.error}
        </div>
      )}

      {state?.key && (
        <div className="p-8 bg-zinc-900 rounded-[2rem] border border-zinc-800 shadow-2xl relative overflow-hidden group animate-in fade-in zoom-in duration-300">
          <div className="absolute top-0 right-0 p-4">
             <Badge tone="ok" className="rounded-full px-3 py-1 text-[9px] uppercase font-black tracking-widest">New Key Generated</Badge>
          </div>
          
          <h3 className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-4">Copy your key now. It won't be shown again.</h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-black/50 p-4 rounded-2xl border border-zinc-800">
            <code className="flex-1 font-mono text-blue-400 text-sm break-all">{state.key}</code>
            <Button 
              size="sm" 
              onClick={() => copyToClipboard(state.key)} 
              className={`rounded-xl px-6 font-black uppercase tracking-widest text-[10px] transition-all ${copied ? 'bg-green-600 text-white' : 'bg-blue-600'}`}
            >
              {copied ? 'Copied!' : 'Copy Key'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Badge({ children, tone, className }: { children: React.ReactNode, tone: "ok" | "warn", className?: string }) {
  const styles = {
    ok: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    warn: "bg-amber-500/10 text-amber-500 border-amber-500/20"
  };
  return (
    <span className={`inline-flex items-center border ${styles[tone]} ${className}`}>
      {children}
    </span>
  );
}

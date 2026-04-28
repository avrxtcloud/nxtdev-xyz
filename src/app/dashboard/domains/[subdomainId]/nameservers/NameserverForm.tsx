"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

export function NameserverForm({ 
  subdomainId, 
  action, 
  disabled 
}: { 
  subdomainId: string; 
  action: (subdomainId: string, state: any, fd: FormData) => Promise<any>;
  disabled: boolean;
}) {
  const actionWithId = action.bind(null, subdomainId);
  const [state, formAction] = useActionState(actionWithId, null);

  return (
    <div className="space-y-4">
      <form action={formAction} className="flex flex-wrap gap-2">
        <Input
          name="nameserver"
          placeholder="ns1.example.com"
          required
          disabled={disabled}
          className="max-w-md h-10 rounded-xl"
        />
        <SubmitButton 
          disabled={disabled} 
          pendingText="Adding..."
          className="h-10 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]"
        >
          Add nameserver
        </SubmitButton>
      </form>
      
      {state?.error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-xl text-xs font-bold text-red-800 dark:text-red-200 animate-in fade-in slide-in-from-top-1 duration-200">
           {state.error}
        </div>
      )}
    </div>
  );
}

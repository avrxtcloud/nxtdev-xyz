"use client";

import { useActionState } from "react";
import { createEmailAliasAction } from "../actions";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

export function CreateEmailAliasForm() {
  const [state, formAction] = useActionState(createEmailAliasAction, null);

  return (
    <form action={formAction} className="grid gap-4 lg:grid-cols-[1fr_auto]">
      <div>
        <label className="mb-2 block text-xs font-black uppercase tracking-widest text-zinc-500">
          Destination inbox
        </label>
        <Input
          name="destinationAddress"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
        <p className="mt-2 text-xs font-bold leading-5 text-zinc-500 dark:text-zinc-400">
          Cloudflare will send a verification email here before forwarding becomes active.
        </p>
      </div>
      <div className="flex items-end">
        <SubmitButton className="h-12 w-full px-7 lg:w-auto" pendingText="Creating...">
          Create Mask
        </SubmitButton>
      </div>
      {state?.error ? (
        <div className="border-2 border-red-500 bg-red-50 px-4 py-3 text-sm font-black text-red-700 lg:col-span-2 dark:bg-red-950/30 dark:text-red-200">
          {state.error}
        </div>
      ) : null}
      {state?.success ? (
        <div className="border-2 border-zinc-950 bg-lime-200 px-4 py-3 text-sm font-black text-zinc-950 lg:col-span-2 dark:border-white">
          {state.message}
          {state.aliasAddress ? (
            <span className="ml-2 font-mono underline decoration-cyan-400 decoration-2 underline-offset-4">
              {state.aliasAddress}
            </span>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

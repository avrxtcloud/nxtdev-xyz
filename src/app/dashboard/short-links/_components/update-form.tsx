"use client";

import { useActionState } from "react";
import { updateShortLinkAction } from "../actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function UpdateShortLinkForm({ link }: { link: any }) {
  const router = useRouter();
  const [state, formAction] = useActionState(updateShortLinkAction, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard/short-links");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={link.id} />
      <input type="hidden" name="shortioLinkId" value={link.shortioLinkId} />
      
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">New Destination URL</label>
        <Input name="originalUrl" defaultValue={link.originalUrl} placeholder="https://example.com/new-dest" required />
      </div>

      {state?.error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-xl text-xs font-bold text-red-600 dark:text-red-400">
           {state.error}
        </div>
      )}
      
      <div className="flex justify-end gap-3 pt-4">
        <Link href="/dashboard/short-links">
          <Button variant="secondary" type="button" className="rounded-xl px-6 h-12 uppercase font-black tracking-widest text-[10px]">Cancel</Button>
        </Link>
        <SubmitButton pendingText="Saving..." className="rounded-xl px-8 h-12 font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20">Save Changes</SubmitButton>
      </div>
    </form>
  );
}

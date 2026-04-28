"use client";

import { useActionState } from "react";
import { deleteApiKeyAction } from "../actions";
import { SubmitButton } from "@/components/ui/submit-button";

export function DeleteApiKeyButton({ id }: { id: string }) {
  const deleteActionWithBoundArgs = deleteApiKeyAction.bind(null, id);
  const [state, formAction] = useActionState(deleteActionWithBoundArgs, null);

  return (
    <form action={formAction}>
      <SubmitButton variant="danger" size="sm" pendingText="..." className="rounded-xl px-4 font-black uppercase tracking-widest text-[9px]">
        Revoke
      </SubmitButton>
      {state?.error && (
        <p className="mt-1 text-[8px] text-red-500 font-bold">{state.error}</p>
      )}
    </form>
  );
}

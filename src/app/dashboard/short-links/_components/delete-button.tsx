"use client";

import { useActionState } from "react";
import { deleteShortLinkAction } from "../actions";
import { SubmitButton } from "@/components/ui/submit-button";

export function DeleteLinkButton({ id, shortioLinkId }: { id: string, shortioLinkId: string }) {
  const [state, formAction] = useActionState(deleteShortLinkAction, null);

  return (
    <form action={formAction} className="flex-1 sm:flex-none">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="shortioLinkId" value={shortioLinkId} />
      <div className="flex flex-col gap-2">
        <SubmitButton variant="danger" size="md" pendingText="..." className="w-full sm:w-auto rounded-2xl">
          Delete
        </SubmitButton>
        {state?.error && (
          <p className="text-[10px] text-red-500 font-bold text-center">{state.error}</p>
        )}
      </div>
    </form>
  );
}

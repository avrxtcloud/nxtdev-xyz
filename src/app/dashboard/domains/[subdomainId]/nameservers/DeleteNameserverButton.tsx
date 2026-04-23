"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/ui/submit-button";

export function DeleteNameserverButton({
  subdomainId,
  nsId,
  action,
  disabled,
}: {
  subdomainId: string;
  nsId: string;
  action: (subdomainId: string, nsId: string, state: any, fd?: FormData) => Promise<any>;
  disabled: boolean;
}) {
  const actionWithIds = action.bind(null, subdomainId, nsId);
  const [state, formAction] = useActionState(actionWithIds, null);

  return (
    <div className="flex flex-col items-end gap-1">
      <form action={formAction}>
        <SubmitButton
          variant="danger"
          size="sm"
          disabled={disabled}
          pendingText="..."
          className="rounded-xl h-8 px-3 text-[10px] uppercase font-black tracking-widest"
        >
          Remove
        </SubmitButton>
      </form>
      {state?.error && (
        <p className="text-[9px] text-red-500 font-bold max-w-[100px] leading-tight text-right">
          {state.error}
        </p>
      )}
    </div>
  );
}

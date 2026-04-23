"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/ui/submit-button";

export function SwitchBackButton({
  subdomainId,
  action,
  disabled,
}: {
  subdomainId: string;
  action: (subdomainId: string, state: any, fd?: FormData) => Promise<any>;
  disabled: boolean;
}) {
  const actionWithId = action.bind(null, subdomainId);
  const [state, formAction] = useActionState(actionWithId, null);

  return (
    <div className="space-y-2">
      <form action={formAction}>
        <SubmitButton
          variant="secondary"
          className="rounded-xl h-10 px-6 font-black uppercase tracking-widest text-[10px]"
          disabled={disabled}
          pendingText="Switching..."
        >
          Switch back to default DNS (remove all delegation)
        </SubmitButton>
      </form>
      {state?.error && (
        <p className="text-[10px] text-red-500 font-bold ml-1">
          {state.error}
        </p>
      )}
    </div>
  );
}

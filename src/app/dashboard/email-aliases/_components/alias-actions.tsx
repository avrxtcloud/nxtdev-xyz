"use client";

import { useActionState } from "react";
import { deleteEmailAliasAction, refreshEmailAliasAction } from "../actions";
import { SubmitButton } from "@/components/ui/submit-button";

function ActionStateMessage({ state }: { state: any }) {
  if (!state?.error && !state?.message) return null;
  return (
    <p className={`text-[10px] font-black ${state.error ? "text-red-500" : "text-zinc-500"}`}>
      {state.error ?? state.message}
    </p>
  );
}

export function RefreshAliasButton({ aliasId }: { aliasId: string }) {
  const actionWithId = refreshEmailAliasAction.bind(null, aliasId);
  const [state, formAction] = useActionState(actionWithId, null);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <SubmitButton variant="secondary" size="sm" pendingText="Checking...">
        Refresh
      </SubmitButton>
      <ActionStateMessage state={state} />
    </form>
  );
}

export function DeleteAliasButton({ aliasId }: { aliasId: string }) {
  const actionWithId = deleteEmailAliasAction.bind(null, aliasId);
  const [state, formAction] = useActionState(actionWithId, null);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <SubmitButton variant="danger" size="sm" pendingText="Deleting...">
        Delete
      </SubmitButton>
      <ActionStateMessage state={state} />
    </form>
  );
}

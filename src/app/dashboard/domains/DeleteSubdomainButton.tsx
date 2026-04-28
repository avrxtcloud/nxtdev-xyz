"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { deleteSubdomainAction } from "./actions";

export function DeleteSubdomainButton({ baseFqdn, id }: { baseFqdn: string; id: string }) {
  const [open, setOpen] = useState(false);
  
  // Bind the id to the action
  const deleteActionWithId = deleteSubdomainAction.bind(null, id);
  const [state, formAction] = useActionState(deleteActionWithId, null);

  return (
    <>
      <div className="flex flex-col gap-1">
        <Button
          variant="danger"
          size="sm"
          className="rounded-2xl h-9 px-6 font-black uppercase tracking-widest text-[10px]"
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
        {state?.error && (
          <p className="text-[9px] text-red-500 font-bold text-center w-full max-w-[100px] leading-tight mt-1">{state.error}</p>
        )}
      </div>

      <ConfirmDialog
        open={open}
        title={`Delete ${baseFqdn}?`}
        description="This will remove all DNS records for this subdomain and free up your slot so you can claim a new one. This action is irreversible."
        confirmText="Delete subdomain"
        destructive
        onClose={() => setOpen(false)}
        onConfirm={() => {
          // Manual invocation with any casting for types
          (formAction as any)(new FormData());
          setOpen(false);
        }}
      />
    </>
  );
}

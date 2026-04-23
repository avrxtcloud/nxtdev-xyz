"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { deleteRecordAction } from "./actions";

export function DeleteRecordButton({ 
  subdomainId, 
  recordId, 
  fqdn,
  disabled 
}: { 
  subdomainId: string; 
  recordId: string; 
  fqdn: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  
  // Bind the arguments to the action
  const deleteActionBound = deleteRecordAction.bind(null, subdomainId, recordId);
  const [state, formAction] = useActionState(deleteActionBound, null);

  return (
    <>
      <div className="flex flex-col items-end gap-1">
        <Button
          variant="danger"
          size="sm"
          className="rounded-xl h-8 px-3 text-[10px] uppercase font-black tracking-widest sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          disabled={disabled}
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
        {state?.error && (
          <p className="text-[9px] text-red-500 font-bold max-w-[100px] leading-tight text-right">{state.error}</p>
        )}
      </div>

      <ConfirmDialog
        open={open}
        title="Delete DNS Record?"
        description={`This will permanently remove the record for ${fqdn}. This change will propagate to global DNS within minutes.`}
        confirmText="Remove Record"
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

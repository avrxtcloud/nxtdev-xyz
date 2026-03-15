"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function DeleteSubdomainButton(props: {
  baseFqdn: string;
  action: () => Promise<void>;
  disabled?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        disabled={pending || props.disabled}
        onClick={() => setOpen(true)}
      >
        {pending ? "Deleting..." : "Delete"}
      </Button>
      <ConfirmDialog
        open={open}
        title={`Delete ${props.baseFqdn}?`}
        description="This will remove all DNS records for this subdomain and free up your slot so you can claim a new one."
        confirmText="Delete subdomain"
        destructive
        loading={pending}
        onClose={() => (pending ? null : setOpen(false))}
        onConfirm={() => {
          startTransition(async () => {
            await props.action();
            setOpen(false);
          });
        }}
      />
    </>
  );
}

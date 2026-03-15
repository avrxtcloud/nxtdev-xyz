"use client";

import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function SubmitButton(
  props: ComponentProps<typeof Button> & {
    pendingText?: string;
  },
) {
  const { pending } = useFormStatus();
  const { children, pendingText = "Processing...", disabled, ...rest } = props;

  return (
    <Button {...rest} type="submit" disabled={pending || disabled}>
      {pending ? <Spinner className="h-4 w-4" /> : null}
      {pending ? pendingText : children}
    </Button>
  );
}

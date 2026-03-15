"use client";

import { cn } from "@/components/ui/cn";

export function Spinner(props: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80",
        props.className,
      )}
    />
  );
}


"use client";

import * as React from "react";
import { cn } from "@/components/ui/cn";

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  const { className, ...rest } = props;
  return (
    <textarea
      className={cn(
        "min-h-[100px] w-full rounded-md border border-zinc-200 bg-white/80 px-3 py-2 text-sm text-zinc-900 outline-none backdrop-blur transition-colors placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-400/30 dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-white/20 dark:focus:ring-white/10",
        className,
      )}
      {...rest}
    />
  );
}

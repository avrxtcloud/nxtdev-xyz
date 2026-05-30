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
        "min-h-[100px] w-full rounded-none border-2 border-zinc-950 bg-white px-3 py-2 text-sm font-bold text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:bg-amber-50 focus:ring-2 focus:ring-amber-300/70 dark:border-white dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900",
        className,
      )}
      {...rest}
    />
  );
}

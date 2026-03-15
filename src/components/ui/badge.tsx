import * as React from "react";
import { cn } from "@/components/ui/cn";

export function Badge(
  props: React.HTMLAttributes<HTMLSpanElement> & { tone?: "ok" | "warn" | "bad" | "neutral" },
) {
  const { className, tone = "neutral", ...rest } = props;
  const tones: Record<string, string> = {
    neutral: "bg-zinc-100 text-zinc-800 dark:bg-white/10 dark:text-zinc-100",
    ok: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200",
    warn: "bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-200",
    bad: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ring-zinc-900/5 dark:ring-white/10",
        tones[tone],
        className,
      )}
      {...rest}
    />
  );
}

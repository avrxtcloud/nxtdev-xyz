import * as React from "react";
import { cn } from "@/components/ui/cn";

export function Badge(
  props: React.HTMLAttributes<HTMLSpanElement> & { tone?: "ok" | "warn" | "bad" | "neutral" },
) {
  const { className, tone = "neutral", ...rest } = props;
  const tones: Record<string, string> = {
    neutral: "bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white",
    ok: "bg-lime-300 text-zinc-950",
    warn: "bg-amber-300 text-zinc-950",
    bad: "bg-red-500 text-white",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center border border-zinc-950 px-2 py-0.5 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#18181b] dark:border-white dark:shadow-[2px_2px_0_#fafafa]",
        tones[tone],
        className,
      )}
      {...rest}
    />
  );
}

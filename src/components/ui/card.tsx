import * as React from "react";
import { cn } from "@/components/ui/cn";

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur transition-shadow hover:shadow-md dark:border-white/10 dark:bg-zinc-950/40",
        className,
      )}
      {...rest}
    />
  );
}

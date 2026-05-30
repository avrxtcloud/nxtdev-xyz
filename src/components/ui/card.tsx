import * as React from "react";
import { cn } from "@/components/ui/cn";

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        "border-2 border-zinc-950 bg-white p-5 shadow-[5px_5px_0_#18181b] transition-transform hover:-translate-y-0.5 dark:border-white dark:bg-zinc-950 dark:shadow-[5px_5px_0_#fafafa]",
        className,
      )}
      {...rest}
    />
  );
}

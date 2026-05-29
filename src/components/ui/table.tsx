import * as React from "react";
import { cn } from "@/components/ui/cn";

export function Table(props: React.HTMLAttributes<HTMLTableElement>) {
  const { className, ...rest } = props;
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full border-collapse text-sm", className)} {...rest} />
    </div>
  );
}

export function Th(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  const { className, ...rest } = props;
  return (
    <th
      className={cn(
        "border-b-2 border-zinc-950 bg-amber-200 px-2 py-2 text-left text-xs font-black uppercase tracking-wide text-zinc-950 sm:px-3 dark:border-white dark:bg-zinc-900 dark:text-white",
        className,
      )}
      {...rest}
    />
  );
}

export function Td(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  const { className, ...rest } = props;
  return (
    <td
      className={cn(
        "border-b border-zinc-950/20 px-2 py-2 align-top font-medium text-zinc-900 sm:px-3 dark:border-white/15 dark:text-zinc-50",
        className,
      )}
      {...rest}
    />
  );
}

import * as React from "react";
import { cn } from "@/components/ui/cn";

export function Table(props: React.HTMLAttributes<HTMLTableElement>) {
  const { className, ...rest } = props;
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-sm", className)}
        {...rest}
      />
    </div>
  );
}

export function Th(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  const { className, ...rest } = props;
  return (
    <th
      className={cn(
        "border-b border-zinc-200/70 px-2 py-2 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600 sm:px-3 dark:border-white/10 dark:text-zinc-300",
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
        "border-b border-zinc-200/70 px-2 py-2 align-top text-zinc-900 sm:px-3 dark:border-white/10 dark:text-zinc-50",
        className,
      )}
      {...rest}
    />
  );
}

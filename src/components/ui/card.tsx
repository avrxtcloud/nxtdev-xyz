import * as React from "react";
import { cn } from "@/components/ui/cn";

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        "avrxt-grid-card rounded-2xl p-5 text-zinc-100 shadow-[0_20px_60px_rgba(0,0,0,.16)]",
        className,
      )}
      {...rest}
    />
  );
}

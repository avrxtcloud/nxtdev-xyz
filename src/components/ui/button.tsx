"use client";

import * as React from "react";
import { cn } from "@/components/ui/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  },
) {
  const { className, variant = "primary", size = "md", ...rest } = props;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-60";
  const sizes =
    size === "sm" ? "h-9 px-3 text-sm" : "h-10 px-4 text-sm";
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-b from-indigo-500 to-indigo-700 text-white shadow-sm hover:from-indigo-400 hover:to-indigo-700 active:translate-y-px",
    secondary:
      "border border-zinc-200 bg-white/70 text-zinc-900 hover:bg-white dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-50 dark:hover:bg-zinc-950/60",
    ghost:
      "bg-transparent text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-white/10",
    danger:
      "bg-gradient-to-b from-red-500 to-red-700 text-white shadow-sm hover:from-red-400 hover:to-red-700 active:translate-y-px",
  };

  return (
    <button className={cn(base, sizes, variants[variant], className)} {...rest} />
  );
}

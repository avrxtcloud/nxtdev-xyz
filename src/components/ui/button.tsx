"use client";

import * as React from "react";
import { cn } from "@/components/ui/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  },
) {
  const { className, variant = "primary", size = "md", ...rest } = props;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

  const sizes: Record<ButtonSize, string> = {
    sm: "h-9 px-4 text-xs tracking-tight",
    md: "h-11 px-6 text-sm tracking-tight",
    lg: "h-14 px-8 text-base tracking-tight",
    icon: "h-10 w-10 p-0",
  };

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-zinc-900 text-white shadow-xl shadow-zinc-950/20 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200",
    secondary:
      "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:text-white dark:hover:bg-zinc-800",
    outline:
      "border-2 border-zinc-200 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900",
    ghost:
      "bg-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-50",
    danger:
      "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600",
  };

  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...rest} />
  );
}

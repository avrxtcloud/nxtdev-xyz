"use client";

import * as React from "react";
import { cn } from "@/components/ui/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
>((props, ref) => {
  const { className, variant = "primary", size = "md", ...rest } = props;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg border-2 font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70 disabled:pointer-events-none disabled:opacity-50 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

  const sizes: Record<ButtonSize, string> = {
    sm: "h-9 px-4 text-xs tracking-tight",
    md: "h-11 px-6 text-sm tracking-tight",
    lg: "h-14 px-8 text-base tracking-tight",
    icon: "h-10 w-10 p-0",
  };

  const variants: Record<ButtonVariant, string> = {
    primary:
      "border-zinc-950 bg-zinc-950 text-white shadow-[4px_4px_0_#facc15] hover:bg-zinc-800 dark:border-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200",
    secondary:
      "border-zinc-950 bg-white text-zinc-950 shadow-[4px_4px_0_#22d3ee] hover:bg-zinc-100 dark:border-white dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900",
    outline:
      "border-zinc-950 bg-transparent text-zinc-950 hover:bg-white dark:border-white dark:text-white dark:hover:bg-zinc-900",
    ghost:
      "border-transparent bg-transparent text-zinc-700 shadow-none hover:border-zinc-950 hover:bg-white dark:text-zinc-300 dark:hover:border-white dark:hover:bg-zinc-900 dark:hover:text-white",
    danger:
      "border-zinc-950 bg-red-500 text-white shadow-[4px_4px_0_#18181b] hover:bg-red-600 dark:border-white dark:shadow-[4px_4px_0_#fafafa]",
  };

  return (
    <button
      ref={ref}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    />
  );
});

Button.displayName = "Button";

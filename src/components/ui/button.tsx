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
    "inline-flex items-center justify-center gap-2 rounded-lg border font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]";

  const sizes: Record<ButtonSize, string> = {
    sm: "h-9 px-4 text-xs tracking-tight",
    md: "h-11 px-6 text-sm tracking-tight",
    lg: "h-14 px-8 text-base tracking-tight",
    icon: "h-10 w-10 p-0",
  };

  const variants: Record<ButtonVariant, string> = {
    primary:
      "border-violet-300/50 bg-violet-300 text-zinc-950 shadow-[0_10px_30px_rgba(167,139,250,.18)] hover:bg-violet-200",
    secondary:
      "border-white/15 bg-white/[.06] text-white hover:border-violet-300/50 hover:bg-white/[.1]",
    outline:
      "border-white/15 bg-transparent text-zinc-100 hover:border-white/30 hover:bg-white/[.06]",
    ghost:
      "border-transparent bg-transparent text-zinc-300 shadow-none hover:bg-white/[.06] hover:text-white",
    danger:
      "border-red-400/40 bg-red-500/90 text-white hover:bg-red-500",
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

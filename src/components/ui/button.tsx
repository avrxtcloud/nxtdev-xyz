"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg border font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]",
  {
    variants: {
      variant: {
        default: "border-violet-300/50 bg-violet-300 text-zinc-950 shadow-[0_10px_30px_rgba(167,139,250,.18)] hover:bg-violet-200 hover:shadow-[0_14px_38px_rgba(167,139,250,.28)]",
        primary: "border-violet-300/50 bg-violet-300 text-zinc-950 shadow-[0_10px_30px_rgba(167,139,250,.18)] hover:bg-violet-200 hover:shadow-[0_14px_38px_rgba(167,139,250,.28)]",
        secondary: "border-white/15 bg-white/[.06] text-white hover:border-violet-300/50 hover:bg-white/[.1]",
        outline: "border-white/15 bg-transparent text-zinc-100 hover:border-white/30 hover:bg-white/[.06]",
        ghost: "border-transparent bg-transparent text-zinc-300 shadow-none hover:bg-white/[.06] hover:text-white",
        destructive: "border-red-400/40 bg-red-500/90 text-white hover:bg-red-500",
        danger: "border-red-400/40 bg-red-500/90 text-white hover:bg-red-500",
        link: "border-transparent bg-transparent text-violet-200 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs tracking-tight",
        default: "h-11 px-6 text-sm tracking-tight",
        md: "h-11 px-6 text-sm tracking-tight",
        lg: "h-14 px-8 text-base tracking-tight",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);

Button.displayName = "Button";

export { buttonVariants };

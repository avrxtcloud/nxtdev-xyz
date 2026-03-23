"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/ui/cn";
import { DOC_SECTIONS } from "./docs-links";

export function DocsNav(props: { variant?: "sidebar" | "top" }) {
  const pathname = usePathname();
  const variant = props.variant ?? "sidebar";

  return (
    <div
      className={cn(
        variant === "top"
          ? "flex gap-2 overflow-x-auto rounded-xl border border-zinc-200/70 bg-white/70 p-2 backdrop-blur dark:border-white/10 dark:bg-zinc-950/40"
          : "space-y-6",
      )}
    >
      {DOC_SECTIONS.map((section) => (
        <div key={section.title} className={cn(variant === "top" && "shrink-0")}>
          <div
            className={cn(
              "text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400",
              variant === "top" && "sr-only",
            )}
          >
            {section.title}
          </div>
          <div className={cn(variant === "top" ? "flex gap-2" : "mt-2 grid gap-1")}>
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                      : "text-zinc-700 hover:bg-zinc-100/70 dark:text-zinc-200 dark:hover:bg-white/10",
                    variant === "top" && "whitespace-nowrap py-1.5 text-xs",
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}


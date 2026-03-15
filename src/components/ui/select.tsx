"use client";

import * as React from "react";
import { cn } from "@/components/ui/cn";
import { Input } from "@/components/ui/input";

export type SelectOption = {
  label: string;
  value: string;
  description?: string;
};

export function Select(props: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState<number>(() => {
    const idx = props.options.findIndex((o) => o.value === props.value);
    return idx >= 0 ? idx : 0;
  });

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const searchRef = React.useRef<HTMLInputElement | null>(null);

  const selected = props.options.find((o) => o.value === props.value);

  const filteredOptions = React.useMemo(() => {
    if (!props.searchable) return props.options;
    const q = query.trim().toLowerCase();
    if (!q) return props.options;
    return props.options.filter((o) => {
      if (o.value === "") return true;
      const hay = `${o.label} ${o.description ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [props.options, props.searchable, query]);

  React.useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (!rootRef.current) return;
      if (rootRef.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    setQuery("");
    const idx = filteredOptions.findIndex((o) => o.value === props.value);
    if (idx >= 0) setActiveIndex(idx);
    if (props.searchable) queueMicrotask(() => searchRef.current?.focus());
  }, [filteredOptions, open, props.searchable, props.value]);

  React.useEffect(() => {
    if (!open) return;
    setActiveIndex((i) => Math.min(i, Math.max(filteredOptions.length - 1, 0)));
  }, [filteredOptions.length, open]);

  function commit(value: string) {
    props.onChange(value);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className={cn("relative", props.className)}>
      <input type="hidden" name={props.name} value={props.value} />
      <button
        type="button"
        disabled={props.disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-zinc-200 bg-white/80 px-3 text-sm text-zinc-900 backdrop-blur transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400/30 disabled:pointer-events-none disabled:opacity-60 dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-50 dark:hover:bg-zinc-950/60 dark:focus:ring-white/10",
        )}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (props.disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
            return;
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setActiveIndex((i) => Math.min(i + 1, props.options.length - 1));
            return;
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
            setActiveIndex((i) => Math.max(i - 1, 0));
            return;
          }
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <span className="min-w-0 truncate">
          {selected?.label ?? props.placeholder ?? "Select"}
        </span>
        <span className="text-zinc-500 dark:text-zinc-400" aria-hidden="true">
          <svg
            viewBox="0 0 20 20"
            width="16"
            height="16"
            className="opacity-80"
            fill="currentColor"
          >
            <path d="M5.3 7.5a1 1 0 0 1 1.4 0L10 10.8l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z" />
          </svg>
        </span>
      </button>

      {open ? (
        <div
          ref={listRef}
          role="listbox"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white/95 shadow-xl backdrop-blur dark:border-white/10 dark:bg-zinc-950/80"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            }
            if (e.key === "Enter") {
              e.preventDefault();
              const o = filteredOptions[activeIndex];
              if (o) commit(o.value);
            }
          }}
        >
          {props.searchable ? (
            <div className="p-2">
              <Input
                ref={searchRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder={props.searchPlaceholder ?? "Search..."}
                className="h-9"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.stopPropagation();
                    setOpen(false);
                    return;
                  }
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActiveIndex((i) =>
                      Math.min(i + 1, filteredOptions.length - 1),
                    );
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActiveIndex((i) => Math.max(i - 1, 0));
                  }
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const o = filteredOptions[activeIndex];
                    if (o) commit(o.value);
                  }
                }}
              />
            </div>
          ) : null}

          <div className={cn("max-h-64 overflow-auto p-1", props.searchable && "pt-0")}>
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-zinc-500">
                No results
              </div>
            ) : (
              filteredOptions.map((o, idx) => {
                const isSelected = o.value === props.value;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      "flex w-full items-start justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-white/10",
                      isActive && "bg-zinc-100 dark:bg-white/10",
                    )}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => commit(o.value)}
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        {o.label}
                      </span>
                      {o.description ? (
                        <span className="mt-0.5 block truncate text-xs text-zinc-500 dark:text-zinc-400">
                          {o.description}
                        </span>
                      ) : null}
                    </span>
                    {isSelected ? (
                      <span
                        className="mt-0.5 text-indigo-600 dark:text-indigo-300"
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          width="14"
                          height="14"
                          fill="currentColor"
                        >
                          <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0L3.3 9.1a1 1 0 1 1 1.4-1.4l3.1 3.1 6.5-6.5a1 1 0 0 1 1.4 0z" />
                        </svg>
                      </span>
                    ) : null}
                  </button>
                );
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}


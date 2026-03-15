"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

export function ConfirmDialog(props: {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!props.open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") props.onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [props.open, props]);

  if (!props.open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={props.title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={props.onClose}
        aria-label="Close"
      />
      <div className="relative w-full max-w-md rounded-xl border border-zinc-200 bg-white/90 p-5 shadow-xl backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
        <div className="text-sm font-semibold">{props.title}</div>
        {props.description ? (
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            {props.description}
          </div>
        ) : null}

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" type="button" onClick={props.onClose}>
            {props.cancelText ?? "Cancel"}
          </Button>
          <Button
            variant={props.destructive ? "danger" : "primary"}
            type="button"
            disabled={props.loading}
            onClick={props.onConfirm}
            className={cn(props.loading ? "opacity-80" : "")}
          >
            {props.loading ? "Processing..." : props.confirmText ?? "Confirm"}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}


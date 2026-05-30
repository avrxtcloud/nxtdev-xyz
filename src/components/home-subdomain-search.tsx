"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

type AvailabilityState =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "available"; baseFqdn: string }
  | { status: "taken"; baseFqdn: string }
  | { status: "reserved"; baseFqdn: string; reason: string }
  | { status: "blocked"; baseFqdn?: string; reason: string }
  | { status: "invalid"; baseFqdn?: string; reason: string }
  | { status: "error"; reason: string };

export function HomeSubdomainSearch(props: { rootDomain: string }) {
  const [label, setLabel] = useState("");
  const [state, setState] = useState<AvailabilityState>({ status: "idle" });
  const [pending, startTransition] = useTransition();
  const trimmed = label.trim().toLowerCase();

  const preview = useMemo(() => {
    return `${trimmed || "yourname"}.${props.rootDomain}`;
  }, [props.rootDomain, trimmed]);

  async function checkAvailability() {
    if (!trimmed) {
      setState({ status: "invalid", reason: "Type a subdomain name first." });
      return;
    }

    setState({ status: "checking" });
    try {
      const res = await fetch(
        `/api/subdomain-availability?label=${encodeURIComponent(trimmed)}`,
      );
      const json = (await res.json()) as
        | { error: string }
        | {
            available: boolean;
            reserved?: boolean;
            baseFqdn?: string;
            reason?: string;
          };

      if (!res.ok || "error" in json) {
        throw new Error("error" in json ? json.error : "Could not check availability.");
      }

      const baseFqdn = json.baseFqdn ?? preview;
      const reason = json.reason ?? "Not available";

      if (json.available) {
        setState({ status: "available", baseFqdn });
      } else if (json.reserved) {
        setState({ status: "reserved", baseFqdn, reason });
      } else if (reason.toLowerCase().includes("block")) {
        setState({ status: "blocked", baseFqdn, reason });
      } else if (reason.toLowerCase().includes("invalid") || reason.toLowerCase().includes("longer")) {
        setState({ status: "invalid", baseFqdn, reason });
      } else {
        setState({ status: "taken", baseFqdn });
      }
    } catch (error) {
      setState({
        status: "error",
        reason:
          error instanceof Error
            ? error.message
            : "Availability check failed. Please try again.",
      });
    }
  }

  return (
    <div className="mt-8 max-w-2xl border-2 border-zinc-950 bg-white p-4 shadow-[7px_7px_0_#22d3ee] dark:border-white dark:bg-zinc-950 dark:shadow-[7px_7px_0_#fafafa]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Check your name
        </div>
        <Badge tone="neutral" className="hidden text-[9px] sm:inline-flex">
          Public lookup
        </Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="flex min-w-0 border-2 border-zinc-950 bg-white dark:border-white dark:bg-zinc-950">
          <Input
            value={label}
            onChange={(event) => {
              setLabel(event.target.value);
              setState({ status: "idle" });
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                startTransition(() => checkAvailability());
              }
            }}
            placeholder="studio"
            maxLength={32}
            className="h-12 border-0 text-base"
            aria-label="Preferred subdomain"
          />
          <div className="flex h-12 shrink-0 items-center border-l-2 border-zinc-950 bg-amber-200 px-3 font-mono text-sm font-black text-zinc-950 dark:border-white">
            .{props.rootDomain}
          </div>
        </div>
        <Button
          type="button"
          className="h-14 px-6 uppercase tracking-widest"
          onClick={() => startTransition(() => checkAvailability())}
          disabled={pending}
        >
          {pending || state.status === "checking" ? <Spinner className="h-4 w-4" /> : null}
          Check
        </Button>
      </div>

      <div className="mt-4 min-h-10">
        {state.status === "idle" ? (
          <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
            Preview: <span className="font-mono text-zinc-950 dark:text-white">{preview}</span>
          </p>
        ) : null}
        {state.status === "checking" ? (
          <p className="text-sm font-black text-zinc-950 dark:text-white">Scanning registry...</p>
        ) : null}
        {state.status === "available" ? (
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="ok">Available</Badge>
            <span className="font-mono text-sm font-black text-zinc-950 dark:text-white">
              {state.baseFqdn}
            </span>
            <Link className="text-sm font-black underline decoration-cyan-400 decoration-2 underline-offset-4" href="/dashboard/domains">
              Claim it -&gt;
            </Link>
          </div>
        ) : null}
        {state.status === "taken" ? (
          <StatusMessage tone="bad" label="Taken" message={`${state.baseFqdn} is already claimed.`} />
        ) : null}
        {state.status === "reserved" ? (
          <StatusMessage tone="warn" label="Reserved" message={state.reason} />
        ) : null}
        {state.status === "blocked" ? (
          <StatusMessage tone="bad" label="Blocked" message={state.reason} />
        ) : null}
        {state.status === "invalid" ? (
          <StatusMessage tone="warn" label="Invalid" message={state.reason} />
        ) : null}
        {state.status === "error" ? (
          <StatusMessage tone="bad" label="Error" message={state.reason} />
        ) : null}
      </div>
    </div>
  );
}

function StatusMessage(props: {
  tone: "ok" | "warn" | "bad" | "neutral";
  label: string;
  message: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge tone={props.tone}>{props.label}</Badge>
      <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300">
        {props.message}
      </span>
    </div>
  );
}

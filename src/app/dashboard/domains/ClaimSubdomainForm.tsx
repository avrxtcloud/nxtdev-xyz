"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

type AvailabilityState =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "available"; baseFqdn: string }
  | { status: "taken"; baseFqdn: string }
  | { status: "reserved"; baseFqdn: string; reason: string }
  | { status: "blocked"; reason: string }
  | { status: "invalid"; reason: string }
  | { status: "error"; reason: string };

export function ClaimSubdomainForm(props: {
  rootDomain: string;
  usedCount: number;
  isGithubVerified: boolean;
  domainCreationEnabled: boolean;
  maintenanceMessage: string;
  claimAction: (fd: FormData) => void | Promise<void>;
}) {
  const [label, setLabel] = useState("");
  const [availability, setAvailability] = useState<AvailabilityState>({
    status: "idle",
  });
  const [transitionPending, startTransition] = useTransition();

  const canClaim =
    props.usedCount < 2 && props.isGithubVerified && props.domainCreationEnabled;
  const trimmed = label.trim().toLowerCase();
  const previewFqdn = useMemo(() => {
    if (!trimmed) return `yourname.${props.rootDomain}`;
    return `${trimmed}.${props.rootDomain}`;
  }, [trimmed, props.rootDomain]);

  async function check() {
    if (!trimmed) {
      setAvailability({ status: "invalid", reason: "Enter a label first" });
      return;
    }
    setAvailability({ status: "checking" });
    try {
      const res = await fetch(
        `/api/subdomain-availability?label=${encodeURIComponent(trimmed)}`,
      );
      const json = (await res.json()) as
        | { error: string }
        | { available: boolean; reserved?: boolean; baseFqdn?: string; reason?: string };
      if (!res.ok) throw new Error("Failed to check availability");
      if ("error" in json) throw new Error(json.error);
      const baseFqdn = json.baseFqdn ?? previewFqdn;
      if (!json.available) {
        const reason = json.reason ?? "Not available";
        if (json.reserved) {
          setAvailability({ status: "reserved", baseFqdn, reason });
          return;
        }
        if (reason.toLowerCase().includes("block")) {
          setAvailability({ status: "blocked", reason });
        } else if (reason.toLowerCase().includes("invalid")) {
          setAvailability({ status: "invalid", reason });
        } else {
          setAvailability({ status: "taken", baseFqdn });
        }
        return;
      }
      setAvailability({ status: "available", baseFqdn });
    } catch (e) {
      setAvailability({
        status: "error",
        reason: (e as Error).message ?? "Error",
      });
    }
  }

  return (
    <form action={props.claimAction} className="mt-4 grid gap-3">
      {!props.domainCreationEnabled ? (
        <div className="rounded-md border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm text-indigo-900 dark:border-white/10 dark:bg-white/5 dark:text-indigo-200">
          {props.maintenanceMessage}
        </div>
      ) : null}
      {!props.isGithubVerified ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
          Please verify your identity with GitHub to claim a subdomain.{" "}
          <Link className="underline" href="/dashboard/verify">
            Verify now
          </Link>
          .
        </div>
      ) : null}
      <div className="grid gap-2 md:grid-cols-[1fr_auto]">
        <div>
          <label className="text-sm font-medium">Your subdomain</label>
          <div className="mt-1 flex">
            <Input
              name="label"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
                setAvailability({ status: "idle" });
              }}
              placeholder="alice"
              required
              maxLength={32}
              className="rounded-r-none"
              aria-label="Subdomain label"
            />
            <div className="flex h-10 items-center rounded-md rounded-l-none border border-l-0 border-zinc-200 bg-white/70 px-3 text-sm text-zinc-600 dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-300">
              .{props.rootDomain}
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span>
              Example: <span className="font-mono">alice</span> →{" "}
              <span className="font-mono">{previewFqdn}</span>
            </span>
            {availability.status === "checking" ? (
              <span className="inline-flex items-center gap-1">
                <Spinner className="h-3.5 w-3.5" /> Checking…
              </span>
            ) : availability.status === "available" ? (
              <Badge tone="ok">Available</Badge>
            ) : availability.status === "taken" ? (
              <Badge tone="bad">Taken</Badge>
            ) : availability.status === "reserved" ? (
              <Badge tone="warn">Reserved</Badge>
            ) : availability.status === "blocked" ? (
              <Badge tone="bad">Blocked</Badge>
            ) : availability.status === "invalid" ? (
              <Badge tone="warn">Invalid</Badge>
            ) : availability.status === "error" ? (
              <Badge tone="warn">Error</Badge>
            ) : null}
          </div>
          {availability.status === "blocked" ||
          availability.status === "reserved" ||
          availability.status === "invalid" ||
          availability.status === "error" ? (
            <div className="mt-1 text-xs text-zinc-500">
              {"reason" in availability ? availability.reason : null}
            </div>
          ) : null}
        </div>

        <div className="flex items-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              startTransition(() => check());
            }}
            disabled={
              transitionPending ||
              !props.isGithubVerified ||
              !props.domainCreationEnabled
            }
          >
            {transitionPending ? <Spinner className="h-4 w-4" /> : null}
            Check
          </Button>
          <SubmitButton disabled={!canClaim} pendingText="Claiming...">
            Claim
          </SubmitButton>
        </div>
      </div>

      {props.domainCreationEnabled && props.isGithubVerified && props.usedCount >= 2 ? (
        <div className="text-xs text-zinc-500">
          You already used {props.usedCount}/2 subdomains. Delete one to claim a
          new label.
        </div>
      ) : null}
    </form>
  );
}

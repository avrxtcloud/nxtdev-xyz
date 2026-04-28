"use client";

import { useMemo, useState, useTransition, useActionState } from "react";
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
  claimAction: (state: any, fd: FormData) => void | Promise<any>;
}) {
  const [state, formAction] = useActionState(props.claimAction, null);
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
        } else if (reason.toLowerCase().includes("longer")) {
          setAvailability({ status: "invalid", reason });
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
    <div className="space-y-6">
      <form action={formAction} className="grid gap-4">
        {!props.domainCreationEnabled ? (
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 px-4 py-3 text-sm text-indigo-900 dark:border-white/10 dark:bg-white/5 dark:text-indigo-200 flex items-center gap-3">
             <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {props.maintenanceMessage}
          </div>
        ) : null}
        
        {!props.isGithubVerified ? (
          <div className="rounded-2xl border border-amber-100 bg-amber-50/50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200 flex items-center gap-3">
            <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span>Please verify your identity with GitHub to claim a subdomain. <Link className="font-bold underline" href="/dashboard/verify">Verify now</Link></span>
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-[1fr_auto] items-end">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Your Desired Subdomain</label>
            <div className="flex h-12 shadow-sm rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50">
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
                className="h-full border-0 rounded-none bg-white dark:bg-zinc-950 px-4 text-base font-bold placeholder:font-medium placeholder:text-zinc-300"
                aria-label="Subdomain label"
              />
              <div className="flex h-full items-center bg-zinc-50 dark:bg-zinc-900 px-4 text-sm font-black text-zinc-500 dark:text-zinc-400 border-l border-zinc-100 dark:border-zinc-800">
                .{props.rootDomain}
              </div>
            </div>
          </div>

          <div className="flex gap-2 h-12">
            <Button
              type="button"
              variant="secondary"
              className="h-full px-6 rounded-2xl font-black uppercase tracking-widest text-[10px]"
              onClick={() => {
                startTransition(() => check());
              }}
              disabled={transitionPending || !props.isGithubVerified || !props.domainCreationEnabled}
            >
              {transitionPending ? <Spinner className="h-4 w-4" /> : "Check"}
            </Button>
            <SubmitButton disabled={!canClaim} pendingText="Claiming..." className="h-full px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
              Claim Link
            </SubmitButton>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 min-h-[20px]">
           <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none">
             Status:
           </span>
           {availability.status === "idle" && <span className="text-[10px] text-zinc-400 font-bold italic">Waiting for input...</span>}
           {availability.status === "checking" && <span className="text-[10px] text-blue-500 font-black animate-pulse">Scanning DNS...</span>}
           {availability.status === "available" && <Badge tone="ok" className="rounded-full px-3 py-0.5 text-[9px]">Available</Badge>}
           {availability.status === "taken" && <Badge tone="bad" className="rounded-full px-3 py-0.5 text-[9px]">Already Taken</Badge>}
           {availability.status === "reserved" && <Badge tone="warn" className="rounded-full px-3 py-0.5 text-[9px]">Reserved</Badge>}
           {availability.status === "blocked" && <Badge tone="bad" className="rounded-full px-3 py-0.5 text-[9px]">Blocked</Badge>}
           {availability.status === "invalid" && <Badge tone="warn" className="rounded-full px-3 py-0.5 text-[9px]">Invalid Label</Badge>}
           {availability.status === "error" && <Badge tone="warn" className="rounded-full px-3 py-0.5 text-[9px]">System Error</Badge>}
        </div>
      </form>

      {/* Premium Error & Success Cards */}
      {state?.error && (
        <div className="p-5 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-[2rem] flex items-start gap-4 animate-in slide-in-from-top-2 duration-300">
           <div className="h-10 w-10 shrink-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-red-100 dark:border-red-950 flex items-center justify-center text-red-600">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
           </div>
           <div>
             <h4 className="text-sm font-black text-red-900 dark:text-red-100 uppercase tracking-tight">Claim Failed</h4>
             <p className="mt-1 text-xs text-red-800/80 dark:text-red-400/80 font-bold">{state.error}</p>
           </div>
        </div>
      )}

      {props.domainCreationEnabled && props.isGithubVerified && props.usedCount >= 2 ? (
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-xs font-bold text-zinc-500 text-center">
          You have reached your limit of {props.usedCount}/2 subdomains. 
          <br/><span className="text-[10px] opacity-70">Delete an existing domain to claim a new one.</span>
        </div>
      ) : null}
    </div>
  );
}

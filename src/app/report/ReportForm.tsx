"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Select } from "@/components/ui/select";

type VerifyState =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "valid_active"; baseFqdn: string }
  | { status: "valid_inactive"; baseFqdn: string; reason: string }
  | { status: "invalid"; reason: string }
  | { status: "error"; reason: string };

const REASONS = [
  "Phishing",
  "Malware",
  "Spam",
  "Scam/Fraud",
  "Copyright",
  "Other",
] as const;

export function ReportForm(props: {
  rootDomain: string;
  action: (fd: FormData) => void | Promise<void>;
}) {
  const [domain, setDomain] = useState("");
  const [reason, setReason] = useState<(typeof REASONS)[number]>("Phishing");
  const [otherReason, setOtherReason] = useState("");
  const [verify, setVerify] = useState<VerifyState>({ status: "idle" });
  const [pending, startTransition] = useTransition();

  async function verifyDomain() {
    const value = domain.trim();
    if (!value) {
      setVerify({ status: "invalid", reason: "Enter a domain first" });
      return;
    }
    setVerify({ status: "checking" });
    try {
      const res = await fetch(
        `/api/domain-verify?domain=${encodeURIComponent(value)}`,
      );
      const json = (await res.json()) as
        | { valid: false; reason: string }
        | { valid: true; active: boolean; baseFqdn: string; reason?: string };

      if (!res.ok) throw new Error("Failed to verify domain");
      if (!json.valid) {
        setVerify({ status: "invalid", reason: json.reason });
        return;
      }
      if (!json.active) {
        setVerify({
          status: "valid_inactive",
          baseFqdn: json.baseFqdn,
          reason: json.reason ?? "Not active",
        });
        return;
      }
      setVerify({ status: "valid_active", baseFqdn: json.baseFqdn });
    } catch (e) {
      setVerify({
        status: "error",
        reason: (e as Error).message ?? "Error",
      });
    }
  }

  return (
    <form action={props.action} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Domain</label>
        <div className="mt-1 flex flex-wrap gap-2">
          <Input
            name="domain"
            value={domain}
            onChange={(e) => {
              setDomain(e.target.value);
              setVerify({ status: "idle" });
            }}
            placeholder={`example.${props.rootDomain}`}
            required
            className="min-w-[260px] flex-1"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => startTransition(() => verifyDomain())}
            disabled={pending}
          >
            {pending ? <Spinner className="h-4 w-4" /> : null}
            Verify
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <span>Tip: paste a full URL or a hostname under {props.rootDomain}.</span>
          {verify.status === "checking" ? (
            <span className="inline-flex items-center gap-1">
              <Spinner className="h-3.5 w-3.5" /> Checking…
            </span>
          ) : verify.status === "valid_active" ? (
            <Badge tone="ok">Valid & active</Badge>
          ) : verify.status === "valid_inactive" ? (
            <Badge tone="warn">Not active</Badge>
          ) : verify.status === "invalid" ? (
            <Badge tone="bad">Invalid</Badge>
          ) : verify.status === "error" ? (
            <Badge tone="warn">Error</Badge>
          ) : null}
        </div>
        {verify.status === "valid_inactive" ? (
          <div className="mt-1 text-xs text-zinc-500">
            Base domain: <span className="font-mono">{verify.baseFqdn}</span> ·{" "}
            {verify.reason}
          </div>
        ) : verify.status === "invalid" || verify.status === "error" ? (
          <div className="mt-1 text-xs text-zinc-500">{verify.reason}</div>
        ) : null}
      </div>

      <div>
        <label className="text-sm font-medium">Reason</label>
        <div className="mt-1 grid gap-2 md:grid-cols-2">
          <Select
            name="reason"
            value={reason}
            onChange={(v) => setReason(v as (typeof REASONS)[number])}
            options={REASONS.map((r) => ({ label: r, value: r }))}
          />
          {reason === "Other" ? (
            <Input
              name="otherReason"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              placeholder="Short reason (optional)"
              maxLength={64}
            />
          ) : (
            <input type="hidden" name="otherReason" value="" />
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <div className="mt-1">
          <Textarea
            name="description"
            placeholder="What happened? Include URLs, screenshots, timestamps, or any evidence."
            required
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Your email (optional)</label>
        <div className="mt-1">
          <Input
            name="reporterEmail"
            type="email"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton pendingText="Submitting...">Submit report</SubmitButton>
      </div>
    </form>
  );
}

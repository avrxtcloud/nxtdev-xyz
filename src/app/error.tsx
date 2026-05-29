"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  const message = error.message || "Unexpected application error.";
  const lower = message.toLowerCase();
  const isAccountSuspended = lower.includes("account is suspended");
  const isDomainSuspended =
    lower.includes("subdomain is suspended") ||
    lower.includes("domain is suspended") ||
    lower.includes("this subdomain is suspended");
  const title = isAccountSuspended
    ? "Your account is suspended"
    : isDomainSuspended
      ? "Your domain is suspended"
      : "Something went wrong";
  const body = isAccountSuspended
    ? "Access to this account is currently paused. If you believe this is a mistake, contact support with your account email."
    : isDomainSuspended
      ? "This domain cannot be changed while it is suspended. Review the abuse or safety notice, then contact support if you need help."
      : "We could not complete that request right now. Please try again, or contact support if the issue continues.";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Card className="p-8">
        <div className="inline-flex border-2 border-zinc-950 bg-red-500 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white dark:border-white">
          Error response
        </div>
        <h1 className="mt-5 text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
          {title}
        </h1>
        <p className="mt-3 text-sm font-bold leading-6 text-zinc-600 dark:text-zinc-300">
          {body}
        </p>
        {error.digest ? (
          <p className="mt-4 font-mono text-xs font-bold text-zinc-400">
            Digest: {error.digest}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button variant="secondary" type="button" onClick={() => (window.location.href = "/report")}>
            Contact support
          </Button>
        </div>
      </Card>
    </div>
  );
}

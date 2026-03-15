"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function PropagationButton(props: { recordId: string }) {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);

  type ApiAnswer = { data: string; TTL: number };
  type ApiResponse = { doh?: { Answer?: ApiAnswer[] }; error?: string };

  async function run() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/propagation?recordId=${encodeURIComponent(props.recordId)}`);
      const json = (await res.json()) as ApiResponse;
      if (!res.ok) throw new Error(json.error ?? "Failed");
      const answers = json.doh?.Answer ?? [];
      setResult(
        answers.length
          ? answers.map((a) => `${a.data} (ttl ${a.TTL})`).join("\n")
          : "No answers returned by resolver",
      );
    } catch (e) {
      setResult((e as Error).message ?? "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button type="button" size="sm" variant="ghost" onClick={run} disabled={loading}>
        {loading ? <Spinner className="h-3.5 w-3.5" /> : null}
        {loading ? "Checking..." : "Check propagation"}
      </Button>
      {result ? (
        <pre className="max-w-[520px] whitespace-pre-wrap rounded-md border border-zinc-200/70 bg-white/70 p-2 text-xs text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-200">
          {result}
        </pre>
      ) : null}
    </div>
  );
}

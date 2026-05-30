import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";

export default function EmailRoutingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex border-2 border-zinc-950 bg-cyan-200 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-zinc-950 shadow-[4px_4px_0_#facc15] dark:border-white">
            Email Masking
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-zinc-950 sm:text-7xl dark:text-white">
            Random aliases that keep your real inbox private.
          </h1>
          <p className="mt-5 max-w-3xl text-base font-bold leading-7 text-zinc-600 dark:text-zinc-300">
            Create addresses like{" "}
            <span className="font-mono text-zinc-950 dark:text-lime-300">
              a19f3c8b2d10@{env.EMAIL_ALIAS_DOMAIN}
            </span>
            . Mail is forwarded by Cloudflare Email Routing after your destination inbox verifies Cloudflare's email.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard/email-aliases">
              <Button size="lg">Create email mask</Button>
            </Link>
            <Link href="/docs/support">
              <Button variant="secondary" size="lg">Need help?</Button>
            </Link>
          </div>
        </div>

        <Card className="p-0">
          <div className="border-b-2 border-zinc-950 bg-zinc-950 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white dark:border-white">
            Verification flow
          </div>
          <div className="grid gap-0">
            {[
              ["1", "Enter destination", "Tell NxtDev where forwarded mail should land."],
              ["2", "Cloudflare sends email", "Cloudflare sends a verification link to that destination inbox."],
              ["3", "Click verify", "The destination owner must approve forwarding before the mask becomes active."],
              ["4", "Use the alias", "Once active, use the random mask for signups, public pages, and contact forms."],
            ].map(([step, title, body]) => (
              <div key={step} className="grid grid-cols-[auto_1fr] gap-4 border-b-2 border-zinc-950 p-5 last:border-b-0 dark:border-white">
                <div className="flex h-10 w-10 items-center justify-center border-2 border-zinc-950 bg-lime-300 font-black text-zinc-950 shadow-[3px_3px_0_#18181b] dark:border-white dark:shadow-[3px_3px_0_#fafafa]">
                  {step}
                </div>
                <div>
                  <h2 className="text-lg font-black text-zinc-950 dark:text-white">{title}</h2>
                  <p className="mt-1 text-sm font-bold leading-6 text-zinc-500 dark:text-zinc-300">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}

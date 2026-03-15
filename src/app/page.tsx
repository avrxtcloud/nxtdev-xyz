import Link from "next/link";
import { Show, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { env } from "@/lib/env";
import { AnnouncementBanner } from "@/components/announcement-banner";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <AnnouncementBanner />
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Claim a free subdomain.
            <span className="block bg-gradient-to-r from-zinc-950 via-zinc-800 to-indigo-600 bg-clip-text text-transparent dark:from-white dark:via-zinc-200 dark:to-indigo-300">
              Ship faster with real DNS.
            </span>
          </h1>
          <p className="max-w-xl text-zinc-600 dark:text-zinc-300">
            Claim up to 2 free subdomains under{" "}
            <span className="font-medium">{env.ROOT_DOMAIN}</span> and manage DNS
            records in seconds. Built on Cloudflare.
          </p>
          <div className="flex flex-wrap gap-3">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <Button>Claim your subdomain</Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard">
                <Button>Go to dashboard</Button>
              </Link>
            </Show>
            <Link href="/docs">
              <Button variant="secondary">Read docs</Button>
            </Link>
          </div>
          <p className="text-xs text-zinc-500">
            By using {env.ROOT_DOMAIN} you agree to our{" "}
            <Link className="underline" href="/terms">
              Terms
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/privacy">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/abuse">
              Abuse Policy
            </Link>
            .
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <div className="text-sm font-semibold">2 subdomains</div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Free base subdomains per user.
            </div>
          </Card>
          <Card>
            <div className="text-sm font-semibold">100 records</div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Per subdomain (includes SRV and delegation NS).
            </div>
          </Card>
          <Card className="sm:col-span-2">
            <div className="text-sm font-semibold">Safety system</div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Blocks phishing patterns and checks IP reputation for A/AAAA records.
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-sm font-semibold">Websites</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Point to Vercel, Netlify, or any host using CNAME/A.
          </div>
        </Card>
        <Card>
          <div className="text-sm font-semibold">APIs</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Run your own backend with A/AAAA, or reverse proxy via Cloudflare.
          </div>
        </Card>
        <Card>
          <div className="text-sm font-semibold">Email & games</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            MX/TXT/SRV support for real infra experiments.
          </div>
        </Card>
      </div>
    </main>
  );
}

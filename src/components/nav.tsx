import Link from "next/link";
import Image from "next/image";
import {
  Show,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";

export async function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="inline-flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="nxtdev"
              width={28}
              height={28}
              priority
              className="rounded-md"
            />
            <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
              {env.ROOT_DOMAIN}
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link className="px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50" href="/docs">
            Docs
          </Link>
          <Link className="px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50" href="/abuse">
            Abuse
          </Link>
          <Link className="px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50" href="/report">
            Report
          </Link>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="secondary" size="sm">
                Sign in
              </Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard">
              <Button variant="secondary" size="sm">
                Dashboard
              </Button>
            </Link>
            <UserButton />
            <SignOutButton>
              <Button variant="ghost" size="sm">
                Sign out
              </Button>
            </SignOutButton>
          </Show>
        </nav>
      </div>
    </header>
  );
}

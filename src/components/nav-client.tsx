"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Show,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function IconMenu(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="currentColor"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h11A1.5 1.5 0 0 1 17 5.5v0A1.5 1.5 0 0 1 15.5 7h-11A1.5 1.5 0 0 1 3 5.5zM3 10a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 17 10v0a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 10zM3 14.5A1.5 1.5 0 0 1 4.5 13h11a1.5 1.5 0 0 1 0 3h-11A1.5 1.5 0 0 1 3 14.5z" />
    </svg>
  );
}

function IconX(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="currentColor"
      className={props.className}
      aria-hidden="true"
    >
      <path d="M4.3 4.3a1 1 0 0 1 1.4 0L10 8.6l4.3-4.3a1 1 0 1 1 1.4 1.4L11.4 10l4.3 4.3a1 1 0 0 1-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 0 1-1.4-1.4L8.6 10 4.3 5.7a1 1 0 0 1 0-1.4z" />
    </svg>
  );
}

export function NavClient(props: { rootDomain: string }) {
  const [open, setOpen] = useState(false);

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
              {props.rootDomain}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Link
            className="px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
            href="/docs"
          >
            Docs
          </Link>
          <Link
            className="px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
            href="/abuse"
          >
            Abuse
          </Link>
          <Link
            className="px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
            href="/report"
          >
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

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <IconX /> : <IconMenu />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="md:hidden">
          <div className="mx-auto max-w-6xl px-4 pb-4">
            <div className="grid gap-2 rounded-xl border border-zinc-200/70 bg-white/80 p-3 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
              <Link
                className="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100/70 dark:text-zinc-200 dark:hover:bg-white/10"
                href="/docs"
                onClick={() => setOpen(false)}
              >
                Docs
              </Link>
              <Link
                className="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100/70 dark:text-zinc-200 dark:hover:bg-white/10"
                href="/abuse"
                onClick={() => setOpen(false)}
              >
                Abuse
              </Link>
              <Link
                className="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100/70 dark:text-zinc-200 dark:hover:bg-white/10"
                href="/report"
                onClick={() => setOpen(false)}
              >
                Report
              </Link>
              <Link
                className="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100/70 dark:text-zinc-200 dark:hover:bg-white/10"
                href="/status"
                onClick={() => setOpen(false)}
              >
                Status
              </Link>

              <div className="mt-2 flex flex-wrap gap-2 border-t border-zinc-200/70 pt-3 dark:border-white/10">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <Button className="w-full" variant="secondary" size="sm">
                      Sign in
                    </Button>
                  </SignInButton>
                </Show>
                <Show when="signed-in">
                  <Link className="w-full" href="/dashboard" onClick={() => setOpen(false)}>
                    <Button className="w-full" variant="secondary" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                  <div className="flex w-full items-center justify-between rounded-lg border border-zinc-200/70 bg-white/60 px-3 py-2 dark:border-white/10 dark:bg-zinc-950/40">
                    <div className="text-sm text-zinc-700 dark:text-zinc-200">
                      Account
                    </div>
                    <UserButton />
                  </div>
                  <SignOutButton>
                    <Button className="w-full" variant="ghost" size="sm">
                      Sign out
                    </Button>
                  </SignOutButton>
                </Show>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

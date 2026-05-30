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
    <header className="sticky top-0 z-[100] border-b-2 border-zinc-950 bg-[#f4f1e8]/90 backdrop-blur-xl transition-all duration-300 dark:border-white dark:bg-zinc-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="transition-transform hover:scale-105 active:scale-95">
            <span className="inline-flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="nxtdev"
                width={40}
                height={40}
                priority
                className="border-2 border-zinc-950 bg-white shadow-[3px_3px_0_#18181b] dark:border-white dark:shadow-[3px_3px_0_#fafafa]"
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {[
              { label: "Blog", href: "/blog" },
              { label: "Docs", href: "/docs" },
              { label: "Abuse", href: "/abuse" },
              { label: "Report", href: "/report" },
              { label: "Status", href: "/status" },
            ].map((link) => (
              <Link
                key={link.href}
                className="px-4 py-2 text-sm font-black text-zinc-600 transition-all hover:bg-zinc-950 hover:text-white dark:text-zinc-300 dark:hover:bg-white dark:hover:text-zinc-950"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <div className="hidden sm:block">
              <SignInButton mode="modal">
                <Button variant="ghost" className="rounded-lg text-sm font-black text-zinc-700 dark:text-zinc-300">
                  Sign in
                </Button>
              </SignInButton>
            </div>
            <SignInButton mode="modal">
              <Button className="h-10 rounded-lg bg-zinc-950 px-6 text-sm font-black text-white shadow-[4px_4px_0_#facc15] transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-950">
                Start for free
              </Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className="hidden sm:block">
              <Button variant="secondary" className="h-10 rounded-lg border-2 border-zinc-950 text-sm font-black dark:border-white">
                Dashboard
              </Button>
            </Link>
            <div className="scale-110 active:scale-95 transition-transform">
              <UserButton appearance={{ elements: { userButtonAvatarBox: "h-9 w-9 border-2 border-zinc-950 dark:border-white shadow-sm" } }} />
            </div>
          </Show>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-lg text-zinc-700 md:hidden dark:text-zinc-300"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <IconX className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-16 z-50 p-4 md:hidden animate-[fade-in-down_200ms_ease-out]">
          <div className="grid gap-2 border-2 border-zinc-950 bg-[#f4f1e8] p-6 shadow-[8px_8px_0_#18181b] dark:border-white dark:bg-zinc-950 dark:shadow-[8px_8px_0_#fafafa]">
            {[
              { label: "Blog", href: "/blog" },
              { label: "Documentation", href: "/docs" },
              { label: "Abuse Policy", href: "/abuse" },
              { label: "Report Abuse", href: "/report" },
              { label: "System Status", href: "/status" },
            ].map((link) => (
              <Link
                key={link.href}
                className="flex items-center justify-between px-4 py-4 text-base font-black text-zinc-900 transition-all hover:bg-zinc-950 hover:text-white dark:text-zinc-100 dark:hover:bg-white dark:hover:text-zinc-950"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <svg className="w-5 h-5 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-3 border-t-2 border-zinc-950 pt-6 dark:border-white">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <Button className="h-14 w-full rounded-lg font-black" size="lg">
                    Start for free
                  </Button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button className="h-14 w-full rounded-lg font-black" variant="secondary" size="lg">
                    Sign in
                  </Button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <Button className="h-14 w-full rounded-lg font-black" size="lg">
                    Dashboard
                  </Button>
                </Link>
                <div className="flex h-14 items-center justify-between border-2 border-zinc-950 bg-white px-4 dark:border-white dark:bg-zinc-900">
                  <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Your Account
                  </span>
                  <UserButton />
                </div>
                <SignOutButton>
                  <Button className="h-14 w-full rounded-lg font-black" variant="ghost" size="lg">
                    Sign out
                  </Button>
                </SignOutButton>
              </Show>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

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
    <header className="sticky top-0 z-[100] border-b border-white/10 bg-[#080809]/82 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-5 lg:gap-9">
          <Link href="/" className="group flex items-center gap-3" aria-label="nxtdev home">
            <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-violet-300/50 bg-[#0d0d10] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"><Image src="/logo.svg" alt="" width={36} height={36} priority /></span>
            <span className="hidden leading-none sm:block">
              <span className="block text-sm font-black tracking-[-.06em] text-white">nxtdev</span>
              <span className="mt-1 block font-mono text-[8px] font-bold uppercase tracking-[.24em] text-violet-200">by avrxt</span>
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
                className="rounded-md px-3 py-2 text-[11px] font-bold uppercase tracking-[.14em] text-zinc-400 transition-all hover:bg-white/[.06] hover:text-white"
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
                <Button variant="ghost" className="text-sm">
                  Sign in
                </Button>
              </SignInButton>
            </div>
            <SignInButton mode="modal">
              <Button className="h-10 px-5 text-xs uppercase tracking-[.12em]">
                Start for free
              </Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className="hidden sm:block">
              <Button variant="secondary" className="h-10 text-xs uppercase tracking-[.12em]">
                Dashboard
              </Button>
            </Link>
            <div className="scale-110 active:scale-95 transition-transform">
              <UserButton appearance={{ elements: { userButtonAvatarBox: "h-9 w-9 border border-violet-300/60" } }} />
            </div>
          </Show>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-zinc-200 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <IconX className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-[72px] z-50 p-4 md:hidden animate-avrxt-enter">
          <div className="avrxt-panel grid gap-2 rounded-xl p-3 shadow-2xl">
            {[
              { label: "Blog", href: "/blog" },
              { label: "Documentation", href: "/docs" },
              { label: "Abuse Policy", href: "/abuse" },
              { label: "Report Abuse", href: "/report" },
              { label: "System Status", href: "/status" },
            ].map((link) => (
              <Link
                key={link.href}
                className="flex items-center justify-between rounded-lg px-4 py-4 text-sm font-semibold text-zinc-200 transition-all hover:bg-white/[.07] hover:text-white"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <svg className="w-5 h-5 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-3 border-t border-white/10 pt-4">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <Button className="h-12 w-full text-xs uppercase tracking-[.12em]" size="lg">
                    Start for free
                  </Button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button className="h-12 w-full text-xs uppercase tracking-[.12em]" variant="secondary" size="lg">
                    Sign in
                  </Button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <Button className="h-12 w-full text-xs uppercase tracking-[.12em]" size="lg">
                    Dashboard
                  </Button>
                </Link>
                <div className="flex h-12 items-center justify-between rounded-lg border border-white/10 bg-white/[.04] px-4">
                  <span className="text-sm font-medium text-zinc-100">
                    Your Account
                  </span>
                  <UserButton />
                </div>
                <SignOutButton>
                  <Button className="h-12 w-full text-xs uppercase tracking-[.12em]" variant="ghost" size="lg">
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

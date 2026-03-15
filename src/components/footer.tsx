import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200/70 px-4 py-10 text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-xs text-zinc-500">
          © {new Date().getFullYear()} nxtdev.xyz.
          <span className="mx-2 opacity-60">•</span>
          Developed by{" "}
          <a
            className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-50"
            href="https://avrxt.in"
            target="_blank"
            rel="noreferrer"
          >
            @avrxt
          </a>
          <span className="mx-2 opacity-60">•</span>
          <a
            className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-50"
            href="https://avrxt.in/guestbook"
            target="_blank"
            rel="noreferrer"
          >
            Leave feedback
          </a>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-zinc-900 dark:hover:text-zinc-50" href="/docs">
            Docs
          </Link>
          <Link className="hover:text-zinc-900 dark:hover:text-zinc-50" href="/terms">
            Terms
          </Link>
          <Link className="hover:text-zinc-900 dark:hover:text-zinc-50" href="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-zinc-900 dark:hover:text-zinc-50" href="/abuse">
            Abuse
          </Link>
          <Link className="hover:text-zinc-900 dark:hover:text-zinc-50" href="/report">
            Report
          </Link>
          <Link className="hover:text-zinc-900 dark:hover:text-zinc-50" href="/status">
            Status
          </Link>
        </div>
      </div>
    </footer>
  );
}


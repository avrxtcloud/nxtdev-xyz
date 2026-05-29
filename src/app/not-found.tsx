import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-3xl items-center px-4 py-16">
      <Card className="w-full p-8">
        <div className="inline-flex border-2 border-zinc-950 bg-amber-300 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-zinc-950 dark:border-white">
          404
        </div>
        <h1 className="mt-5 text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
          Page not found
        </h1>
        <p className="mt-3 text-sm font-bold leading-6 text-zinc-600 dark:text-zinc-300">
          This route does not exist, or the resource was moved, deleted, or suspended.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/">
            <Button>Go home</Button>
          </Link>
          <Link href="/docs">
            <Button variant="secondary">Open docs</Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}

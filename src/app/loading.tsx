import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <Card className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70" />
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          Loading…
        </div>
      </Card>
    </main>
  );
}


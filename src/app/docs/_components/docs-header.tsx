import { Badge } from "@/components/ui/badge";
import { cn } from "@/components/ui/cn";

export function DocsHeader(props: {
  title: string;
  description: React.ReactNode;
  badge?: { label: string; tone?: "ok" | "warn" | "bad" | "neutral" };
  className?: string;
}) {
  return (
    <header className={cn("space-y-3", props.className)}>
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
          Docs
        </div>
        {props.badge ? (
          <Badge tone={props.badge.tone ?? "neutral"}>{props.badge.label}</Badge>
        ) : null}
      </div>
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        <span className="bg-gradient-to-r from-zinc-950 via-zinc-800 to-indigo-600 bg-clip-text text-transparent dark:from-white dark:via-zinc-200 dark:to-indigo-300">
          {props.title}
        </span>
      </h1>
      <div className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {props.description}
      </div>
    </header>
  );
}


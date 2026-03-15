import Link from "next/link";
import { getActiveAnnouncements } from "@/lib/system/announcements";
import { getSystemFlags } from "@/lib/system/flags";
import { Badge } from "@/components/ui/badge";

export async function AnnouncementBanner(props: { showAdminLink?: boolean }) {
  const [flags, announcements] = await Promise.all([
    getSystemFlags(),
    getActiveAnnouncements(2),
  ]);

  const maintenance =
    !flags.domainCreationEnabled || !flags.dnsEditingEnabled
      ? {
          title: "Maintenance mode",
          body: flags.maintenanceMessage,
          level: "warn" as const,
        }
      : null;

  const items = [
    ...(maintenance ? [maintenance] : []),
    ...announcements.map((a) => ({
      title: a.title,
      body: a.body,
      level: a.level,
    })),
  ].slice(0, 2);

  if (items.length === 0) return null;

  function tone(level: string) {
    if (level === "danger") return "bad";
    if (level === "warn") return "warn";
    return "neutral";
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <div className="grid gap-3">
        {items.map((i, idx) => (
          <div
            key={`${i.title}-${idx}`}
            className="rounded-xl border border-zinc-200/70 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-zinc-950/40"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Badge tone={tone(i.level)}>{i.level}</Badge>
                  <div className="truncate text-sm font-semibold">{i.title}</div>
                </div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {i.body}
                </div>
              </div>
              {props.showAdminLink ? (
                <Link
                  href="/admin/announcements"
                  className="text-xs underline text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                >
                  Manage
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


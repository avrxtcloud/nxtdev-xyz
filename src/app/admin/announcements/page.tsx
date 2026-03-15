import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listAnnouncements } from "@/lib/system/announcements";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import {
  createAnnouncementAction,
  deleteAnnouncementAction,
  toggleAnnouncementAction,
} from "@/app/admin/announcements/actions";

export default async function AdminAnnouncementsPage() {
  const { error: tableErr } = await supabaseAdmin
    .from("Announcement")
    .select("id", { head: true, count: "exact" })
    .limit(1);
  const tableMissing =
    !!tableErr &&
    (tableErr.message?.includes("schema cache") ||
      tableErr.message?.includes("Could not find the table"));

  const announcements = await listAnnouncements(50);

  return (
    <div className="grid gap-4">
      <Card>
        <div className="text-sm font-semibold">Announcements</div>
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Publish maintenance notices and incident updates. Active announcements
          show on the home page and DNS pages.
        </div>
      </Card>

      {tableMissing ? (
        <Card>
          <div className="text-sm font-semibold">Setup required</div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            If you see “schema cache” errors, run the latest{" "}
            <span className="font-mono">supabase_schema.sql</span> in Supabase SQL
            Editor to create the <span className="font-mono">Announcement</span>{" "}
            table, then reload Supabase API schema cache.
          </div>
        </Card>
      ) : null}

      <Card>
        <div className="text-sm font-semibold">Create announcement</div>
        <form action={createAnnouncementAction} className="mt-4 grid gap-3">
          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Title</label>
              <div className="mt-1">
                <Input name="title" maxLength={80} required placeholder="Maintenance window" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Level</label>
              <div className="mt-1">
                <select
                  name="level"
                  defaultValue="info"
                  className="h-10 w-full rounded-md border border-zinc-200 bg-white/80 px-3 text-sm text-zinc-900 backdrop-blur focus:outline-none focus:ring-2 focus:ring-zinc-400/30 dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-50 dark:focus:ring-white/10"
                >
                  <option value="info">Info</option>
                  <option value="warn">Warning</option>
                  <option value="danger">Critical</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Body</label>
            <div className="mt-1">
              <Textarea
                name="body"
                maxLength={600}
                required
                placeholder="We’re performing maintenance. DNS edits may be temporarily unavailable."
              />
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium">Starts at (optional)</label>
              <div className="mt-1">
                <Input name="startsAt" type="datetime-local" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Ends at (optional)</label>
              <div className="mt-1">
                <Input name="endsAt" type="datetime-local" />
              </div>
            </div>
            <label className="flex items-center gap-2 pt-7 text-sm">
              <input type="checkbox" name="published" /> Publish immediately
            </label>
          </div>

          <div className="flex justify-end">
            <SubmitButton pendingText="Creating...">Create</SubmitButton>
          </div>
        </form>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">Recent announcements</div>
          <div className="text-xs text-zinc-500">{announcements.length} shown</div>
        </div>

        <div className="mt-4 grid gap-3">
          {announcements.length === 0 ? (
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              No announcements yet.
            </div>
          ) : (
            announcements.map((a) => (
              <div
                key={a.id}
                className="rounded-lg border border-zinc-200/70 bg-white/50 p-4 dark:border-white/10 dark:bg-zinc-950/30"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{a.title}</div>
                    <Badge
                      tone={
                        a.level === "danger"
                          ? "bad"
                          : a.level === "warn"
                            ? "warn"
                            : "neutral"
                      }
                    >
                      {a.level}
                    </Badge>
                    {a.published ? <Badge tone="ok">Published</Badge> : <Badge>Draft</Badge>}
                  </div>

                  <div className="flex gap-2">
                    <form action={toggleAnnouncementAction.bind(null, a.id, !a.published)}>
                      <Button size="sm" variant="secondary" type="submit">
                        {a.published ? "Unpublish" : "Publish"}
                      </Button>
                    </form>
                    <form action={deleteAnnouncementAction.bind(null, a.id)}>
                      <Button size="sm" variant="danger" type="submit">
                        Delete
                      </Button>
                    </form>
                  </div>
                </div>
                <div className="mt-2 whitespace-pre-wrap text-sm text-zinc-600 dark:text-zinc-300">
                  {a.body}
                </div>
                <div className="mt-2 text-xs text-zinc-500">
                  {a.startsAt ? `Starts: ${new Date(a.startsAt).toLocaleString()}` : null}
                  {a.endsAt ? ` · Ends: ${new Date(a.endsAt).toLocaleString()}` : null}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

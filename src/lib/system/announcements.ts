import { supabaseAdmin } from "@/db/supabaseAdmin";

export type AnnouncementLevel = "info" | "warn" | "danger";

export type Announcement = {
  id: string;
  title: string;
  body: string;
  level: AnnouncementLevel;
  published: boolean;
  startsAt: string;
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function getActiveAnnouncements(limit = 3): Promise<Announcement[]> {
  const now = new Date().toISOString();
  const { data, error } = await supabaseAdmin
    .from("Announcement")
    .select("*")
    .eq("published", true)
    .lte("startsAt", now)
    .or(`endsAt.is.null,endsAt.gte.${now}`)
    .order("startsAt", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data ?? []) as unknown as Announcement[];
}

export async function listAnnouncements(limit = 50): Promise<Announcement[]> {
  const { data, error } = await supabaseAdmin
    .from("Announcement")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(limit);
  if (error) {
    // If the table isn't created yet, avoid crashing the app.
    if (error.message?.includes("schema cache") || error.message?.includes("Could not find the table")) {
      return [];
    }
    throw new Error(error.message);
  }
  return (data ?? []) as unknown as Announcement[];
}

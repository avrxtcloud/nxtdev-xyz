"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { requireAdmin } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { supabaseAdmin } from "@/db/supabaseAdmin";

function getString(fd: FormData, key: string) {
  return String(fd.get(key) ?? "").trim();
}

function getBool(fd: FormData, key: string) {
  const v = fd.get(key);
  if (v === null) return false;
  const s = String(v);
  return s === "on" || s === "true" || s === "1";
}

export async function createAnnouncementAction(fd: FormData) {
  const admin = await requireAdmin();
  const title = getString(fd, "title");
  const body = getString(fd, "body");
  const level = (getString(fd, "level") || "info").toLowerCase();
  const published = getBool(fd, "published");
  const startsAt = getString(fd, "startsAt");
  const endsAt = getString(fd, "endsAt");

  if (!title || title.length > 80) throw new Error("Invalid title");
  if (!body || body.length > 600) throw new Error("Invalid body");
  if (!["info", "warn", "danger"].includes(level)) throw new Error("Invalid level");

  const now = new Date().toISOString();
  const row = {
    id: randomUUID(),
    title,
    body,
    level,
    published,
    startsAt: startsAt ? new Date(startsAt).toISOString() : now,
    endsAt: endsAt ? new Date(endsAt).toISOString() : null,
    createdAt: now,
    updatedAt: now,
    createdByUserId: admin.id,
    updatedByUserId: admin.id,
  };

  const { error } = await supabaseAdmin.from("Announcement").insert(row);
  if (error) throw new Error(error.message);

  await audit({
    actorUserId: admin.id,
    action: "admin.announcement.create",
    targetType: "announcement",
    targetId: row.id,
    metadata: { title, level, published },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/domains");
  revalidatePath("/admin/announcements");
}

export async function toggleAnnouncementAction(id: string, published: boolean) {
  const admin = await requireAdmin();
  const { error } = await supabaseAdmin
    .from("Announcement")
    .update({ published, updatedAt: new Date().toISOString(), updatedByUserId: admin.id })
    .eq("id", id);
  if (error) throw new Error(error.message);

  await audit({
    actorUserId: admin.id,
    action: "admin.announcement.toggle",
    targetType: "announcement",
    targetId: id,
    metadata: { published },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/domains");
  revalidatePath("/admin/announcements");
}

export async function deleteAnnouncementAction(id: string) {
  const admin = await requireAdmin();
  const { error } = await supabaseAdmin.from("Announcement").delete().eq("id", id);
  if (error) throw new Error(error.message);

  await audit({
    actorUserId: admin.id,
    action: "admin.announcement.delete",
    targetType: "announcement",
    targetId: id,
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/domains");
  revalidatePath("/admin/announcements");
}


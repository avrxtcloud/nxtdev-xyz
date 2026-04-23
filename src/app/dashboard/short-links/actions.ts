"use server";

import { revalidatePath } from "next/cache";
import { getOrCreateAppUser } from "@/lib/auth";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { createShortLink, deleteShortLink, updateShortLink } from "@/lib/services/shortio";

export async function createShortLinkAction(formData: FormData) {
  const { appUser } = await getOrCreateAppUser();
  const originalUrl = formData.get("originalUrl") as string;

  if (!originalUrl) throw new Error("Original URL is required");

  // Check limit
  const { count, error: countErr } = await supabaseAdmin
    .from("ShortLink")
    .select("id", { head: true, count: "exact" })
    .eq("userId", appUser.id);
    
  if (countErr) throw new Error(countErr.message);
  if ((count ?? 0) >= 4) throw new Error("You have reached the limit of 4 short links.");

  // Create on Short.io
  const shortioRes = await createShortLink(originalUrl);

  // Save to DB
  const { error: dbErr } = await supabaseAdmin.from("ShortLink").insert({
    id: Math.random().toString(36).substring(2, 15), // Basic ID generation matching the project pattern if no cuid() helper
    userId: appUser.id,
    originalUrl: shortioRes.originalURL,
    shortSlug: shortioRes.path,
    shortUrl: shortioRes.shortURL,
    shortioLinkId: shortioRes.idString,
  });

  if (dbErr) {
    // Attempt to cleanup Short.io if DB insert fails
    await deleteShortLink(shortioRes.idString).catch(console.error);
    throw new Error(dbErr.message);
  }

  revalidatePath("/dashboard/short-links");
}

export async function updateShortLinkAction(id: string, shortioLinkId: string, formData: FormData) {
  await getOrCreateAppUser();
  const originalUrl = formData.get("originalUrl") as string;

  if (!originalUrl) throw new Error("Original URL is required");

  // Update on Short.io
  const shortioRes = await updateShortLink(shortioLinkId, originalUrl);

  // Update DB
  const { error: dbErr } = await supabaseAdmin
    .from("ShortLink")
    .update({
      originalUrl: shortioRes.originalURL,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id);

  if (dbErr) throw new Error(dbErr.message);

  revalidatePath("/dashboard/short-links");
}

export async function deleteShortLinkAction(id: string, shortioLinkId: string) {
  await getOrCreateAppUser();

  // Delete from Short.io
  await deleteShortLink(shortioLinkId);

  // Delete from DB
  const { error: dbErr } = await supabaseAdmin
    .from("ShortLink")
    .delete()
    .eq("id", id);

  if (dbErr) throw new Error(dbErr.message);

  revalidatePath("/dashboard/short-links");
}

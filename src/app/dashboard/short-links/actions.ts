"use server";

import { revalidatePath } from "next/cache";
import { getOrCreateAppUser } from "@/lib/auth";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { createShortLink, deleteShortLink, updateShortLink } from "@/lib/services/shortio";

export async function createShortLinkAction(state: any, formData: FormData) {
  try {
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
      id: Math.random().toString(36).substring(2, 15), 
      userId: appUser.id,
      originalUrl: shortioRes.originalURL,
      shortSlug: shortioRes.path,
      shortUrl: shortioRes.shortURL,
      shortioLinkId: shortioRes.idString,
    });

    if (dbErr) {
      await deleteShortLink(shortioRes.idString).catch(console.error);
      throw new Error(dbErr.message);
    }

    revalidatePath("/dashboard/short-links");
    return { success: true };
  } catch (err: any) {
    console.error("Create Short Link Error:", err);
    return { error: err.message || "Failed to create short link" };
  }
}

export async function updateShortLinkAction(state: any, formData: FormData) {
  // Note: Usually update uses bound args, but we can handle both
  const id = formData.get("id") as string;
  const shortioLinkId = formData.get("shortioLinkId") as string;
  try {
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
    return { success: true };
  } catch (err: any) {
    console.error("Update Short Link Error:", err);
    return { error: err.message || "Failed to edit short link" };
  }
}

export async function deleteShortLinkAction(id: string, shortioLinkId: string, state: any, formData?: FormData) {
  try {
    await getOrCreateAppUser();

    // Delete from Short.io - wrap in try to ignore if already gone
    try {
      await deleteShortLink(shortioLinkId);
    } catch (e) {
      console.warn("Short.io delete failed, might already be gone:", e);
    }

    // Delete from DB
    const { error: dbErr } = await supabaseAdmin
      .from("ShortLink")
      .delete()
      .eq("id", id);

    if (dbErr) throw new Error(dbErr.message);

    revalidatePath("/dashboard/short-links");
    return { success: true };
  } catch (err: any) {
    console.error("Delete Short Link Error:", err);
    return { error: err.message || "Failed to delete short link" };
  }
}

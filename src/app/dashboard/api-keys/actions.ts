"use server";

import { revalidatePath } from "next/cache";
import { getOrCreateAppUser } from "@/lib/auth";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { crypto } from "node:crypto";

export async function createApiKeyAction(formData: FormData) {
  const { appUser } = await getOrCreateAppUser();
  const name = formData.get("name") as string;

  if (!name) throw new Error("Name is required");

  const key = `nxt_${crypto.randomBytes(24).toString("hex")}`;
  
  const { error } = await supabaseAdmin.from("ApiKey").insert({
    id: crypto.randomUUID(),
    userId: appUser.id,
    key,
    name,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/api-keys");
  return { key }; // Return key once for display
}

export async function deleteApiKeyAction(id: string) {
  const { appUser } = await getOrCreateAppUser();

  const { error } = await supabaseAdmin
    .from("ApiKey")
    .delete()
    .eq("id", id)
    .eq("userId", appUser.id);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/api-keys");
}

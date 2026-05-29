"use server";

import { revalidatePath } from "next/cache";
import { randomBytes, randomUUID } from "node:crypto";
import { z } from "zod";
import { getOrCreateAppUser } from "@/lib/auth";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { env } from "@/lib/env";
import {
  createAliasRule,
  createDestinationAddress,
  deleteAliasRule,
  getDestinationAddress,
  listDestinationAddresses,
} from "@/lib/cloudflare/email-routing";

const DestinationSchema = z.object({
  destinationAddress: z.string().trim().toLowerCase().email("Enter a valid destination email."),
});

function genericMessage(error: unknown, fallback: string) {
  const message = (error as Error)?.message ?? "";
  if (message.toLowerCase().includes("already exists")) {
    return "That destination or alias already exists. Try refreshing your aliases.";
  }
  if (message.toLowerCase().includes("verification")) {
    return "Cloudflare sent a verification email. Click the link in that inbox, then refresh status.";
  }
  return fallback;
}

function buildAliasAddress() {
  const local = randomBytes(6).toString("hex");
  const domain = env.EMAIL_ALIAS_DOMAIN.trim().toLowerCase().replace(/^@/, "").replace(/\.+$/, "");
  return `${local}@${domain}`;
}

async function getOrCreateDestinationAddress(email: string) {
  try {
    return await createDestinationAddress(email);
  } catch (error) {
    const message = (error as Error)?.message?.toLowerCase() ?? "";
    if (!message.includes("already")) throw error;
    const existing = await listDestinationAddresses();
    const match = existing.find((address) => address.email?.toLowerCase() === email);
    if (!match) throw error;
    return match;
  }
}

export async function createEmailAliasAction(state: any, formData: FormData) {
  try {
    const { appUser } = await getOrCreateAppUser();
    const parsed = DestinationSchema.safeParse({
      destinationAddress: formData.get("destinationAddress"),
    });
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "Invalid destination email." };
    }

    const { count, error: countError } = await supabaseAdmin
      .from("EmailAlias")
      .select("id", { head: true, count: "exact" })
      .eq("userId", appUser.id);
    if (countError) throw new Error(countError.message);
    if ((count ?? 0) >= 5) {
      return { error: "You can create up to 5 email masks for now." };
    }

    const aliasAddress = buildAliasAddress();
    const destination = await getOrCreateDestinationAddress(parsed.data.destinationAddress);
    const verified = Boolean(destination.verified);
    const now = new Date().toISOString();

    const { error } = await supabaseAdmin.from("EmailAlias").insert({
      id: randomUUID(),
      userId: appUser.id,
      aliasAddress,
      destinationAddress: parsed.data.destinationAddress,
      cloudflareRuleId: null,
      cloudflareDestinationId: destination.id ?? null,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
    if (error) throw new Error(error.message);

    revalidatePath("/dashboard/email-aliases");
    return {
      success: true,
      pending: !verified,
      aliasAddress,
      message: verified
        ? "Destination is verified. Refresh once to activate the forwarding rule."
        : "Email mask created. Cloudflare sent a verification email to your destination inbox.",
    };
  } catch (error) {
    console.error("Create email alias failed:", error);
    return { error: genericMessage(error, "Could not create the email mask. Please try again.") };
  }
}

export async function refreshEmailAliasAction(aliasId: string) {
  try {
    const { appUser } = await getOrCreateAppUser();
    const { data: alias, error } = await supabaseAdmin
      .from("EmailAlias")
      .select("*")
      .eq("id", aliasId)
      .eq("userId", appUser.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!alias) return { error: "Email mask not found." };
    if (!alias.cloudflareDestinationId) {
      return { error: "Verification status is not available for this mask." };
    }

    const destination = await getDestinationAddress(alias.cloudflareDestinationId as string);
    const verified = Boolean(destination.verified);
    let status = verified ? "active" : "pending";
    let cloudflareRuleId = alias.cloudflareRuleId as string | null;

    if (verified && !cloudflareRuleId) {
      const rule = await createAliasRule(
        alias.aliasAddress as string,
        alias.destinationAddress as string,
      );
      cloudflareRuleId = rule.id ?? null;
      if (!cloudflareRuleId) {
        status = "pending";
      }
    }

    const { error: updateError } = await supabaseAdmin
      .from("EmailAlias")
      .update({ status, cloudflareRuleId, updatedAt: new Date().toISOString() })
      .eq("id", aliasId)
      .eq("userId", appUser.id);
    if (updateError) throw new Error(updateError.message);

    revalidatePath("/dashboard/email-aliases");
    return {
      success: true,
      status,
      message: status === "active" ? "Destination verified. Your mask is active." : "Still waiting for destination verification.",
    };
  } catch (error) {
    console.error("Refresh email alias failed:", error);
    return { error: "Could not refresh verification status. Please try again." };
  }
}

export async function deleteEmailAliasAction(aliasId: string) {
  try {
    const { appUser } = await getOrCreateAppUser();
    const { data: alias, error } = await supabaseAdmin
      .from("EmailAlias")
      .select("id,cloudflareRuleId")
      .eq("id", aliasId)
      .eq("userId", appUser.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!alias) return { error: "Email mask not found." };

    if (alias.cloudflareRuleId) {
      await deleteAliasRule(alias.cloudflareRuleId as string).catch(console.error);
    }

    const { error: deleteError } = await supabaseAdmin
      .from("EmailAlias")
      .delete()
      .eq("id", aliasId)
      .eq("userId", appUser.id);
    if (deleteError) throw new Error(deleteError.message);

    revalidatePath("/dashboard/email-aliases");
    return { success: true };
  } catch (error) {
    console.error("Delete email alias failed:", error);
    return { error: "Could not delete the email mask. Please try again." };
  }
}

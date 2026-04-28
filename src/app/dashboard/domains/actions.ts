"use server";

import { revalidatePath } from "next/cache";
import { getOrCreateAppUser } from "@/lib/auth";
import { claimSubdomain, deleteOwnedSubdomain } from "@/lib/services/subdomains";
import { assertDomainCreationEnabled } from "@/lib/system/flags";
import { redirect } from "next/navigation";

export async function claimSubdomainAction(state: any, formData: FormData) {
  try {
    const label = String(formData.get("label") ?? "");
    const { appUser, isAdmin, isGithubVerified } = await getOrCreateAppUser();
    
    if (!isGithubVerified) {
      return { error: "Please verify your GitHub account first." };
    }
    
    await assertDomainCreationEnabled({ isAdmin });
    
    await claimSubdomain({
      userId: appUser.id,
      actorUserId: appUser.id,
      label,
    });
    
    revalidatePath("/dashboard/domains");
    return { success: true };
  } catch (err: any) {
    console.error("Claim Subdomain Error:", err);
    return { error: err.message || "Failed to claim subdomain" };
  }
}

export async function deleteSubdomainAction(subdomainId: string, state: any, formData?: FormData) {
  try {
    const { appUser } = await getOrCreateAppUser();
    await deleteOwnedSubdomain({
      userId: appUser.id,
      actorUserId: appUser.id,
      subdomainId,
    });
    revalidatePath("/dashboard/domains");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err: any) {
    console.error("Delete Subdomain Error:", err);
    return { error: err.message || "Failed to delete subdomain" };
  }
}

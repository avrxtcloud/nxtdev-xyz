"use server";

import { revalidatePath } from "next/cache";
import { getOrCreateAppUser } from "@/lib/auth";
import { claimSubdomain, deleteOwnedSubdomain } from "@/lib/services/subdomains";
import { assertDomainCreationEnabled } from "@/lib/system/flags";
import { redirect } from "next/navigation";

export async function claimSubdomainAction(formData: FormData) {
  const label = String(formData.get("label") ?? "");
  const { appUser, isAdmin, isGithubVerified } = await getOrCreateAppUser();
  if (!isGithubVerified) redirect("/dashboard/verify");
  await assertDomainCreationEnabled({ isAdmin });
  await claimSubdomain({
    userId: appUser.id,
    actorUserId: appUser.id,
    label,
  });
  revalidatePath("/dashboard/domains");
}

export async function deleteSubdomainAction(subdomainId: string) {
  const { appUser } = await getOrCreateAppUser();
  await deleteOwnedSubdomain({
    userId: appUser.id,
    actorUserId: appUser.id,
    subdomainId,
  });
  revalidatePath("/dashboard/domains");
  revalidatePath("/dashboard");
}

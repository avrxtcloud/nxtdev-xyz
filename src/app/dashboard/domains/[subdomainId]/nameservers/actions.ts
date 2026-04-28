"use server";

import { revalidatePath } from "next/cache";
import { getOrCreateAppUser } from "@/lib/auth";
import {
  addDelegatedNameserver,
  removeDelegatedNameserver,
  switchBackToDefaultDns,
} from "@/lib/services/dns";
import { assertDnsEditingEnabled } from "@/lib/system/flags";

export async function addNameserverAction(subdomainId: string, state: any, fd: FormData) {
  try {
    const nameserver = String(fd.get("nameserver") ?? "").trim();
    if (!nameserver) throw new Error("Nameserver required");

    const { appUser, isAdmin, isGithubVerified } = await getOrCreateAppUser();
    if (!isGithubVerified) return { error: "Please verify your account." };
    await assertDnsEditingEnabled({ isAdmin });

    await addDelegatedNameserver({
      actorUserId: appUser.id,
      userId: appUser.id,
      subdomainId,
      nameserver,
    });
    revalidatePath(`/dashboard/domains/${subdomainId}/nameservers`);
    revalidatePath(`/dashboard/domains/${subdomainId}/records`);
    revalidatePath(`/dashboard/domains`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to add nameserver" };
  }
}

export async function removeNameserverAction(
  subdomainId: string,
  nsId: string,
  state: any,
  fd?: FormData
) {
  try {
    const { appUser, isAdmin, isGithubVerified } = await getOrCreateAppUser();
    if (!isGithubVerified) return { error: "Please verify your account." };
    await assertDnsEditingEnabled({ isAdmin });

    await removeDelegatedNameserver({
      actorUserId: appUser.id,
      userId: appUser.id,
      subdomainId,
      delegatedId: nsId,
    });
    revalidatePath(`/dashboard/domains/${subdomainId}/nameservers`);
    revalidatePath(`/dashboard/domains/${subdomainId}/records`);
    revalidatePath(`/dashboard/domains`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to remove nameserver" };
  }
}

export async function switchBackAction(subdomainId: string, state: any, fd?: FormData) {
  try {
    const { appUser, isAdmin, isGithubVerified } = await getOrCreateAppUser();
    if (!isGithubVerified) return { error: "Please verify your account." };
    await assertDnsEditingEnabled({ isAdmin });

    await switchBackToDefaultDns({
      actorUserId: appUser.id,
      userId: appUser.id,
      subdomainId,
    });
    revalidatePath(`/dashboard/domains/${subdomainId}/nameservers`);
    revalidatePath(`/dashboard/domains/${subdomainId}/records`);
    revalidatePath(`/dashboard/domains`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to switch back" };
  }
}

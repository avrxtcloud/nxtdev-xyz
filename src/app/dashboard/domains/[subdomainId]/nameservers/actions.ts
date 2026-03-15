"use server";

import { revalidatePath } from "next/cache";
import { getOrCreateAppUser } from "@/lib/auth";
import {
  addDelegatedNameserver,
  removeDelegatedNameserver,
  switchBackToDefaultDns,
} from "@/lib/services/dns";
import { assertDnsEditingEnabled } from "@/lib/system/flags";
import { redirect } from "next/navigation";

export async function addNameserverAction(subdomainId: string, fd: FormData) {
  const nameserver = String(fd.get("nameserver") ?? "").trim();
  const { appUser, isAdmin, isGithubVerified } = await getOrCreateAppUser();
  if (!isGithubVerified) redirect("/dashboard/verify");
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
}

export async function removeNameserverAction(
  subdomainId: string,
  delegatedId: string,
) {
  const { appUser, isAdmin, isGithubVerified } = await getOrCreateAppUser();
  if (!isGithubVerified) redirect("/dashboard/verify");
  await assertDnsEditingEnabled({ isAdmin });
  await removeDelegatedNameserver({
    actorUserId: appUser.id,
    userId: appUser.id,
    subdomainId,
    delegatedId,
  });
  revalidatePath(`/dashboard/domains/${subdomainId}/nameservers`);
  revalidatePath(`/dashboard/domains/${subdomainId}/records`);
  revalidatePath(`/dashboard/domains`);
}

export async function switchBackAction(subdomainId: string) {
  const { appUser, isAdmin, isGithubVerified } = await getOrCreateAppUser();
  if (!isGithubVerified) redirect("/dashboard/verify");
  await assertDnsEditingEnabled({ isAdmin });
  await switchBackToDefaultDns({
    actorUserId: appUser.id,
    userId: appUser.id,
    subdomainId,
  });
  revalidatePath(`/dashboard/domains/${subdomainId}/nameservers`);
  revalidatePath(`/dashboard/domains/${subdomainId}/records`);
  revalidatePath(`/dashboard/domains`);
}

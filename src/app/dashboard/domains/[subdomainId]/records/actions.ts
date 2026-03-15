"use server";

import { revalidatePath } from "next/cache";
import { getOrCreateAppUser } from "@/lib/auth";
import {
  createUserDnsRecord,
  deleteUserDnsRecord,
  updateUserDnsRecord,
} from "@/lib/services/dns";
import { assertDnsEditingEnabled } from "@/lib/system/flags";
import { redirect } from "next/navigation";

function getString(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

function getInt(fd: FormData, key: string): number | undefined {
  const raw = getString(fd, key);
  if (!raw) return undefined;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return undefined;
  return parsed;
}

function getBool(fd: FormData, key: string): boolean | undefined {
  const raw = fd.get(key);
  if (raw === null) return undefined;
  const v = String(raw);
  return v === "on" || v === "true" || v === "1";
}

function parseRecordFormData(fd: FormData) {
  const type = getString(fd, "type").toUpperCase();
  const host = getString(fd, "host") || "@";
  const ttl = getInt(fd, "ttl");

  if (type === "MX") {
    return {
      type,
      host,
      content: getString(fd, "content"),
      ttl,
      priority: getInt(fd, "priority") ?? 10,
    };
  }
  if (type === "SRV") {
    return {
      type,
      host,
      service: getString(fd, "service"),
      proto: getString(fd, "proto"),
      ttl,
      priority: getInt(fd, "priority") ?? 0,
      weight: getInt(fd, "weight") ?? 0,
      port: getInt(fd, "port") ?? 0,
      target: getString(fd, "target"),
    };
  }

  const proxied = getBool(fd, "proxied");
  return {
    type,
    host,
    content: getString(fd, "content"),
    ttl,
    ...(type === "A" || type === "AAAA" || type === "CNAME" ? { proxied } : {}),
  };
}

export async function createRecordAction(subdomainId: string, fd: FormData) {
  const { appUser, isAdmin, isGithubVerified } = await getOrCreateAppUser();
  if (!isGithubVerified) redirect("/dashboard/verify");
  await assertDnsEditingEnabled({ isAdmin });
  await createUserDnsRecord({
    actorUserId: appUser.id,
    userId: appUser.id,
    subdomainId,
    input: parseRecordFormData(fd),
  });
  revalidatePath(`/dashboard/domains/${subdomainId}/records`);
  revalidatePath(`/dashboard/domains`);
}

export async function updateRecordAction(
  subdomainId: string,
  recordId: string,
  fd: FormData,
) {
  const { appUser, isAdmin, isGithubVerified } = await getOrCreateAppUser();
  if (!isGithubVerified) redirect("/dashboard/verify");
  await assertDnsEditingEnabled({ isAdmin });
  await updateUserDnsRecord({
    actorUserId: appUser.id,
    userId: appUser.id,
    subdomainId,
    recordId,
    input: parseRecordFormData(fd),
  });
  revalidatePath(`/dashboard/domains/${subdomainId}/records`);
  revalidatePath(`/dashboard/domains/${subdomainId}/records/${recordId}`);
  revalidatePath(`/dashboard/domains`);
}

export async function deleteRecordAction(
  subdomainId: string,
  recordId: string,
) {
  const { appUser, isAdmin, isGithubVerified } = await getOrCreateAppUser();
  if (!isGithubVerified) redirect("/dashboard/verify");
  await assertDnsEditingEnabled({ isAdmin });
  await deleteUserDnsRecord({
    actorUserId: appUser.id,
    userId: appUser.id,
    subdomainId,
    recordId,
  });
  revalidatePath(`/dashboard/domains/${subdomainId}/records`);
  revalidatePath(`/dashboard/domains`);
}

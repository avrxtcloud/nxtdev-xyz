import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { randomUUID } from "node:crypto";

function usernameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "user";
  return local
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 24);
}

async function ensureUniqueUsername(base: string): Promise<string> {
  let candidate = base || "user";
  for (let i = 0; i < 10; i++) {
    const { count, error } = await supabaseAdmin
      .from("User")
      .select("id", { head: true, count: "exact" })
      .eq("username", candidate);
    if (error) throw new Error(error.message);
    if ((count ?? 0) === 0) return candidate;
    candidate = `${base}-${Math.floor(Math.random() * 10_000)}`;
  }
  return `${base}-${Date.now().toString().slice(-6)}`;
}

export async function requireClerkUser() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  return user;
}

function hasVerifiedGithub(clerk: Awaited<ReturnType<typeof currentUser>>): boolean {
  const accounts = (clerk as unknown as { externalAccounts?: unknown[] })
    ?.externalAccounts;
  if (!accounts || !Array.isArray(accounts)) return false;

  return accounts.some((a) => {
    const provider = (a as { provider?: string }).provider ?? "";
    const status = (a as { verification?: { status?: string } }).verification?.status;
    const isGithub = provider === "oauth_github" || provider === "github";
    const isVerified = status ? status === "verified" : true;
    return isGithub && isVerified;
  });
}

async function getOrCreateAppUserInternal(clerk: Awaited<ReturnType<typeof currentUser>>) {
  if (!clerk) throw new Error("Unauthorized");
  const email = clerk.emailAddresses[0]?.emailAddress?.toLowerCase();
  if (!email) throw new Error("No email on Clerk user");

  const isAdmin = env.ADMIN_EMAILS.includes(email);
  const desiredRole = isAdmin ? "admin" : "user";
  const isGithubVerified = isAdmin ? true : hasVerifiedGithub(clerk);

  const { data: existing, error: findError } = await supabaseAdmin
    .from("User")
    .select("*")
    .eq("clerkUserId", clerk.id)
    .maybeSingle();
  if (findError) throw new Error(findError.message);

  const now = new Date().toISOString();

  const appUser = existing
    ? await (async () => {
        const { data, error } = await supabaseAdmin
          .from("User")
          .update({ email, role: desiredRole, updatedAt: now })
          .eq("id", existing.id)
          .select("*")
          .single();
        if (error) throw new Error(error.message);
        return data;
      })()
    : await (async () => {
        const username = await ensureUniqueUsername(
          (clerk.username?.toLowerCase() ?? "") || usernameFromEmail(email),
        );
        const { data, error } = await supabaseAdmin
          .from("User")
          .insert({
            id: randomUUID(),
            clerkUserId: clerk.id,
            email,
            username,
            role: desiredRole,
            status: "active",
            createdAt: now,
            updatedAt: now,
          })
          .select("*")
          .single();
        if (error) throw new Error(error.message);
        return data;
      })();

  if (appUser.status !== "active") {
    throw new Error(`Account is ${appUser.status}`);
  }

  return { clerk, appUser, isAdmin: desiredRole === "admin", isGithubVerified };
}

export async function getOrCreateAppUser() {
  const clerk = await requireClerkUser();
  return getOrCreateAppUserInternal(clerk);
}

export async function getOrCreateAppUserNoRedirect() {
  const clerk = await currentUser();
  return getOrCreateAppUserInternal(clerk);
}

export async function requireAdmin() {
  const { appUser, isAdmin } = await getOrCreateAppUser();
  if (!isAdmin) redirect("/dashboard");
  return appUser;
}

export async function requireGithubVerified() {
  const { appUser, isGithubVerified } = await getOrCreateAppUser();
  if (!isGithubVerified) redirect("/dashboard/verify");
  return appUser;
}

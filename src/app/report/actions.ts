"use server";

import { audit } from "@/lib/audit";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { randomUUID } from "node:crypto";
import { env } from "@/lib/env";
import { redirect } from "next/navigation";

function normalizeDomain(input: string): string {
  const raw = input.trim().toLowerCase();
  if (!raw) return "";
  try {
    if (raw.includes("://")) {
      return new URL(raw).hostname.toLowerCase().replace(/\.+$/, "");
    }
  } catch {
    // ignore
  }
  return raw.replace(/\.+$/, "").split("/")[0] ?? "";
}

function computeBaseFqdn(domain: string): string | null {
  const root = env.ROOT_DOMAIN.toLowerCase();
  const rootParts = root.split(".");
  const parts = domain.split(".").filter(Boolean);
  if (parts.length <= rootParts.length) return null;
  const tail = parts.slice(parts.length - rootParts.length).join(".");
  if (tail !== root) return null;
  const baseLabel = parts[parts.length - rootParts.length - 1];
  if (!baseLabel) return null;
  return `${baseLabel}.${root}`;
}

const REASONS = new Set([
  "Phishing",
  "Malware",
  "Spam",
  "Scam/Fraud",
  "Copyright",
  "Other",
]);

export async function submitAbuseReport(formData: FormData) {
  const domain = normalizeDomain(String(formData.get("domain") ?? ""));
  const reason = String(formData.get("reason") ?? "").trim();
  const otherReason = String(formData.get("otherReason") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const reporterEmail = String(formData.get("reporterEmail") ?? "").trim();

  if (!domain || domain.length > 255) throw new Error("Invalid domain");
  if (!reason || reason.length > 64) throw new Error("Invalid reason");
  if (!REASONS.has(reason)) throw new Error("Invalid reason");
  if (otherReason.length > 64) throw new Error("Invalid reason");
  if (!description || description.length > 2000) throw new Error("Invalid description");
  if (reporterEmail.length > 255) throw new Error("Invalid reporter email");

  const baseFqdn = computeBaseFqdn(domain);
  if (!baseFqdn) {
    throw new Error(`Domain must be under ${env.ROOT_DOMAIN}`);
  }

  const { data: sub, error: subErr } = await supabaseAdmin
    .from("Subdomain")
    .select("id,status,baseFqdn")
    .eq("baseFqdn", baseFqdn)
    .maybeSingle();
  if (subErr) throw new Error(subErr.message);
  if (!sub) throw new Error("That domain is not claimed");
  if (sub.status !== "active") throw new Error("That domain is not active");

  const finalReason =
    reason === "Other" && otherReason.length ? otherReason : reason;

  const { data: created, error } = await supabaseAdmin
    .from("AbuseReport")
    .insert({
      id: randomUUID(),
      domain,
      reason: finalReason,
      description,
      reporterEmail: reporterEmail || null,
      status: "open",
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  await audit({
    actorUserId: null,
    action: "abuse.report.create",
    targetType: "abuse_report",
    targetId: created.id,
    metadata: { domain, baseFqdn, reason: finalReason },
  });

  redirect("/report?submitted=1");
}

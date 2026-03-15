import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { supabaseAdmin } from "@/db/supabaseAdmin";

export const runtime = "nodejs";

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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const domain = normalizeDomain(String(url.searchParams.get("domain") ?? ""));
  if (!domain) return NextResponse.json({ valid: false, reason: "Missing domain" }, { status: 200 });

  const baseFqdn = computeBaseFqdn(domain);
  if (!baseFqdn) {
    return NextResponse.json(
      { valid: false, reason: `Domain must be under ${env.ROOT_DOMAIN}` },
      { status: 200 },
    );
  }

  const { data: sub, error } = await supabaseAdmin
    .from("Subdomain")
    .select("id,status,baseFqdn")
    .eq("baseFqdn", baseFqdn)
    .maybeSingle();
  if (error) return NextResponse.json({ valid: false, reason: error.message }, { status: 500 });

  if (!sub) {
    return NextResponse.json(
      { valid: true, active: false, baseFqdn, reason: "Not claimed" },
      { status: 200 },
    );
  }

  if (sub.status !== "active") {
    return NextResponse.json(
      { valid: true, active: false, baseFqdn, reason: "Suspended" },
      { status: 200 },
    );
  }

  return NextResponse.json({ valid: true, active: true, baseFqdn }, { status: 200 });
}


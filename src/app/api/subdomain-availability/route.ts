import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { baseFqdnForLabel, reservedLabelSchema, subdomainLabelSchema } from "@/lib/validators/domain";
import { matchesPhishingKeyword } from "@/lib/safety/keywords";
import { getOrCreateAppUserNoRedirect } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    await getOrCreateAppUserNoRedirect();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const labelRaw = String(url.searchParams.get("label") ?? "").trim().toLowerCase();
  if (!labelRaw) {
    return NextResponse.json({ error: "Missing label" }, { status: 400 });
  }

  // Allow checking reservations even for short labels (e.g., "a"), while still
  // enforcing character rules.
  const reservedParsed = reservedLabelSchema.safeParse(labelRaw);
  if (!reservedParsed.success) {
    return NextResponse.json(
      { available: false, reason: reservedParsed.error.issues[0]?.message ?? "Invalid label" },
      { status: 200 },
    );
  }

  const baseFqdn = baseFqdnForLabel(reservedParsed.data, env.ROOT_DOMAIN);

  const { count: reservedCount, error: reservedError } = await supabaseAdmin
    .from("ReservedSubdomain")
    .select("id", { head: true, count: "exact" })
    .eq("baseFqdn", baseFqdn);
  if (reservedError) {
    // If the table isn't set up yet, treat as not reserved.
    if (
      !reservedError.message?.includes("schema cache") &&
      !reservedError.message?.includes("Could not find the table")
    ) {
      return NextResponse.json({ error: reservedError.message }, { status: 500 });
    }
  } else if ((reservedCount ?? 0) > 0) {
    return NextResponse.json(
      {
        available: false,
        reserved: true,
        baseFqdn,
        reason: "Reserved - contact Administrator to claim this domain",
      },
      { status: 200 },
    );
  }

  const parsed = subdomainLabelSchema.safeParse(labelRaw);
  if (!parsed.success) {
    return NextResponse.json(
      { available: false, baseFqdn, reason: parsed.error.issues[0]?.message ?? "Invalid label" },
      { status: 200 },
    );
  }

  const keyword = matchesPhishingKeyword(parsed.data);
  if (keyword) {
    return NextResponse.json(
      { available: false, baseFqdn, reason: "Blocked by safety policy", keyword },
      { status: 200 },
    );
  }

  const { count, error } = await supabaseAdmin
    .from("Subdomain")
    .select("id", { head: true, count: "exact" })
    .eq("baseFqdn", baseFqdn);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const taken = (count ?? 0) > 0;
  return NextResponse.json(
    { available: !taken, baseFqdn, reason: taken ? "Already taken" : "Available" },
    { status: 200 },
  );
}

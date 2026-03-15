import { NextResponse } from "next/server";
import { getOrCreateAppUserNoRedirect } from "@/lib/auth";
import { queryDoh } from "@/lib/doh";
import { supabaseAdmin } from "@/db/supabaseAdmin";

export const runtime = "nodejs";

export async function GET(req: Request) {
  let appUserId: string;
  try {
    const { appUser } = await getOrCreateAppUserNoRedirect();
    appUserId = appUser.id;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const recordId = url.searchParams.get("recordId");
  if (!recordId) {
    return NextResponse.json({ error: "Missing recordId" }, { status: 400 });
  }

  const { data: record, error } = await supabaseAdmin
    .from("DnsRecord")
    .select("fqdn,type,subdomainId")
    .eq("id", recordId)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!record) return NextResponse.json({ error: "Record not found" }, { status: 404 });

  const { count, error: ownErr } = await supabaseAdmin
    .from("Subdomain")
    .select("id", { head: true, count: "exact" })
    .eq("id", record.subdomainId as string)
    .eq("userId", appUserId);
  if (ownErr) return NextResponse.json({ error: ownErr.message }, { status: 500 });
  if (!count) return NextResponse.json({ error: "Record not found" }, { status: 404 });

  try {
    const doh = await queryDoh(record.fqdn as string, record.type as string);
    return NextResponse.json({
      fqdn: record.fqdn,
      type: record.type,
      doh,
    });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message ?? "Failed to query DoH" },
      { status: 500 },
    );
  }
}

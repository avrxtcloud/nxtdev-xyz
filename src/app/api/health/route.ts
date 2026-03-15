import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/db/supabaseAdmin";

export const runtime = "nodejs";

function has(name: string): boolean {
  const v = process.env[name];
  return !!(v && v.trim().length);
}

export async function GET() {
  const env = {
    ROOT_DOMAIN: has("ROOT_DOMAIN"),
    NEXT_PUBLIC_APP_URL: has("NEXT_PUBLIC_APP_URL"),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: has("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
    CLERK_SECRET_KEY: has("CLERK_SECRET_KEY"),
    NEXT_PUBLIC_SUPABASE_URL: has("NEXT_PUBLIC_SUPABASE_URL"),
    SUPABASE_SERVICE_ROLE_KEY: has("SUPABASE_SERVICE_ROLE_KEY"),
    CLOUDFLARE_ZONE_ID: has("CLOUDFLARE_ZONE_ID"),
    CLOUDFLARE_API_TOKEN: has("CLOUDFLARE_API_TOKEN"),
    ABUSEIPDB_API_KEY: has("ABUSEIPDB_API_KEY"),
    ADMIN_EMAILS: has("ADMIN_EMAILS"),
  };

  const checks: Record<string, { ok: boolean; error?: string }> = {};

  try {
    // Table existence + connectivity checks
    const { error: userErr } = await supabaseAdmin
      .from("User")
      .select("id", { head: true, count: "exact" })
      .limit(1);
    checks.supabase_user_table = userErr
      ? { ok: false, error: userErr.message }
      : { ok: true };

    const { error: settingsErr } = await supabaseAdmin
      .from("SystemSetting")
      .select("key", { head: true, count: "exact" })
      .limit(1);
    checks.supabase_systemsetting_table = settingsErr
      ? { ok: false, error: settingsErr.message }
      : { ok: true };
  } catch (e) {
    checks.supabase_client = {
      ok: false,
      error: (e as Error)?.message ?? "Failed to initialize Supabase client",
    };
  }

  const ok =
    env.NEXT_PUBLIC_SUPABASE_URL &&
    env.SUPABASE_SERVICE_ROLE_KEY &&
    Object.values(checks).every((c) => c.ok);

  return NextResponse.json(
    {
      ok,
      env,
      checks,
      now: new Date().toISOString(),
    },
    { status: ok ? 200 : 503 },
  );
}


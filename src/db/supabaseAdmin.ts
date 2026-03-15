import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function getClient(): SupabaseClient {
  if (cached) return cached;
  cached = createClient(
    required("NEXT_PUBLIC_SUPABASE_URL"),
    required("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  );
  return cached;
}

// Keep the existing call sites (`supabaseAdmin.from(...)`) while making env loading lazy
// so we can show friendly setup errors in production instead of crashing at module import.
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getClient() as never as Record<string, unknown>;
    const value = client[prop as never];
    if (typeof value !== "function") return value;
    return (...args: unknown[]) =>
      (value as (...a: unknown[]) => unknown).apply(client, args);
  },
});

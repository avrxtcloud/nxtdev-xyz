function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function optional(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length ? value : undefined;
}

function optionalInt(name: string, fallback: number): number {
  const value = optional(name);
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return fallback;
  return parsed;
}

export const env = {
  ROOT_DOMAIN: (optional("ROOT_DOMAIN") ?? "nxtdev.xyz")
    .trim()
    .split(/\s+/)[0]
    ?.replace(/\.+$/, ""),
  NEXT_PUBLIC_APP_URL:
    optional("NEXT_PUBLIC_APP_URL") ?? "http://localhost:3000",

  get NEXT_PUBLIC_SUPABASE_URL() {
    return required("NEXT_PUBLIC_SUPABASE_URL");
  },
  get SUPABASE_SERVICE_ROLE_KEY() {
    return required("SUPABASE_SERVICE_ROLE_KEY");
  },

  get CLOUDFLARE_ZONE_ID() {
    return required("CLOUDFLARE_ZONE_ID");
  },
  get CLOUDFLARE_API_TOKEN() {
    return required("CLOUDFLARE_API_TOKEN");
  },

  get ABUSEIPDB_API_KEY() {
    return required("ABUSEIPDB_API_KEY");
  },
  get ABUSEIPDB_THRESHOLD() {
    return optionalInt("ABUSEIPDB_THRESHOLD", 30);
  },

  get RISK_SUSPEND_THRESHOLD() {
    return optionalInt("RISK_SUSPEND_THRESHOLD", 60);
  },

  ADMIN_EMAILS: (optional("ADMIN_EMAILS") ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
} as const;

import { supabaseAdmin } from "@/db/supabaseAdmin";

export type SystemFlags = {
  domainCreationEnabled: boolean;
  dnsEditingEnabled: boolean;
  maintenanceMessage: string;
};

const DEFAULT_FLAGS: SystemFlags = {
  domainCreationEnabled: true,
  dnsEditingEnabled: true,
  maintenanceMessage: "Maintenance in progress. Please try again later.",
};

const KEYS = {
  domainCreationEnabled: "domainCreationEnabled",
  dnsEditingEnabled: "dnsEditingEnabled",
  maintenanceMessage: "maintenanceMessage",
} as const;

export async function getSystemFlags(): Promise<SystemFlags> {
  const { data, error } = await supabaseAdmin
    .from("SystemSetting")
    .select("key,value")
    .in("key", Object.values(KEYS));

  if (error) {
    // If the table isn't set up yet, default to enabled.
    return DEFAULT_FLAGS;
  }

  const byKey = new Map<string, unknown>();
  for (const row of data ?? []) {
    byKey.set(row.key as string, row.value);
  }

  const domainCreationEnabled = byKey.has(KEYS.domainCreationEnabled)
    ? Boolean(byKey.get(KEYS.domainCreationEnabled))
    : DEFAULT_FLAGS.domainCreationEnabled;
  const dnsEditingEnabled = byKey.has(KEYS.dnsEditingEnabled)
    ? Boolean(byKey.get(KEYS.dnsEditingEnabled))
    : DEFAULT_FLAGS.dnsEditingEnabled;
  const maintenanceMessageRaw = byKey.get(KEYS.maintenanceMessage);
  const maintenanceMessage =
    typeof maintenanceMessageRaw === "string" && maintenanceMessageRaw.trim().length
      ? maintenanceMessageRaw.trim()
      : DEFAULT_FLAGS.maintenanceMessage;

  return { domainCreationEnabled, dnsEditingEnabled, maintenanceMessage };
}

export async function assertDomainCreationEnabled(opts: { isAdmin: boolean }) {
  if (opts.isAdmin) return;
  const flags = await getSystemFlags();
  if (!flags.domainCreationEnabled) throw new Error(flags.maintenanceMessage);
}

export async function assertDnsEditingEnabled(opts: { isAdmin: boolean }) {
  if (opts.isAdmin) return;
  const flags = await getSystemFlags();
  if (!flags.dnsEditingEnabled) throw new Error(flags.maintenanceMessage);
}

export async function setSystemSetting(params: {
  key: string;
  value: unknown;
  actorUserId: string;
}) {
  const now = new Date().toISOString();
  const { error } = await supabaseAdmin.from("SystemSetting").upsert(
    {
      key: params.key,
      value: params.value,
      updatedAt: now,
      updatedByUserId: params.actorUserId,
    },
    { onConflict: "key" },
  );
  if (error) {
    if (error.message?.includes("schema cache") || error.message?.includes("Could not find the table")) {
      throw new Error(
        "Missing Supabase tables: SystemSetting. Run `supabase_schema.sql` in Supabase SQL Editor, then reload the schema cache.",
      );
    }
    throw new Error(error.message);
  }
}

export const SYSTEM_SETTING_KEYS = KEYS;

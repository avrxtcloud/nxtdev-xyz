"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { setSystemSetting, SYSTEM_SETTING_KEYS } from "@/lib/system/flags";

function toBool(value: FormDataEntryValue | null): boolean {
  if (value === null) return false;
  const v = String(value);
  return v === "on" || v === "true" || v === "1";
}

function toBoolOrNull(value: FormDataEntryValue | null): boolean | null {
  if (value === null) return null;
  return toBool(value);
}

export async function updateSystemSettingsAction(fd: FormData) {
  const admin = await requireAdmin();

  const maintenanceMode = toBool(fd.get("maintenanceMode"));
  const domainCreationEnabledMaybe = toBoolOrNull(fd.get("domainCreationEnabled"));
  const dnsEditingEnabledMaybe = toBoolOrNull(fd.get("dnsEditingEnabled"));
  const maintenanceMessage = String(fd.get("maintenanceMessage") ?? "").trim();

  // If maintenance is OFF but the per-flag checkboxes are missing from the submission
  // (e.g., due to browser behavior / disabled fields), default to enabled instead of
  // accidentally persisting "false,false" and forcing maintenance mode.
  const finalDomainCreationEnabled = maintenanceMode
    ? false
    : domainCreationEnabledMaybe ?? true;
  const finalDnsEditingEnabled = maintenanceMode ? false : dnsEditingEnabledMaybe ?? true;

  await Promise.all([
    setSystemSetting({
      key: SYSTEM_SETTING_KEYS.domainCreationEnabled,
      value: finalDomainCreationEnabled,
      actorUserId: admin.id,
    }),
    setSystemSetting({
      key: SYSTEM_SETTING_KEYS.dnsEditingEnabled,
      value: finalDnsEditingEnabled,
      actorUserId: admin.id,
    }),
    setSystemSetting({
      key: SYSTEM_SETTING_KEYS.maintenanceMessage,
      value: maintenanceMessage || "Maintenance in progress. Please try again later.",
      actorUserId: admin.id,
    }),
  ]);

  await audit({
    actorUserId: admin.id,
    action: "admin.settings.update",
    targetType: "system",
    targetId: null,
    metadata: {
      maintenanceMode,
      domainCreationEnabled: finalDomainCreationEnabled,
      dnsEditingEnabled: finalDnsEditingEnabled,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/domains");
  revalidatePath("/admin/settings");
}

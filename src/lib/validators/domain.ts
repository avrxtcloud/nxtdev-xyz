import { z } from "zod";

const labelBaseSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(32)
  .regex(/^[a-z0-9-]+$/, "Only a-z, 0-9, and '-' allowed")
  .refine((v) => !v.startsWith("-") && !v.endsWith("-"), {
    message: "Cannot start or end with '-'",
  })
  .refine((v) => !v.includes("--"), { message: "Cannot include '--'" });

export const subdomainLabelSchema = labelBaseSchema.min(
  4,
  "Must be at least 4 characters",
);

// Admin-only: allow reserving short labels (e.g., "a") while still enforcing character rules.
export const reservedLabelSchema = labelBaseSchema.min(1, "Invalid label");

export function baseFqdnForLabel(label: string, rootDomain: string): string {
  const normalizedRoot = rootDomain.trim().toLowerCase().replace(/\.+$/, "");
  const normalizedLabel = label.trim().toLowerCase();
  return `${normalizedLabel}.${normalizedRoot}`;
}

export function fqdnForHost(host: string, baseFqdn: string): string {
  const normalizedBase = baseFqdn.trim().toLowerCase().replace(/\.+$/, "");
  const normalizedHost = host.trim().toLowerCase();
  if (normalizedHost === "@" || normalizedHost === "") return normalizedBase;
  return `${normalizedHost}.${normalizedBase}`;
}

export function assertFqdnWithinBase(fqdn: string, baseFqdn: string) {
  const f = fqdn.trim().toLowerCase().replace(/\.+$/, "");
  const b = baseFqdn.trim().toLowerCase().replace(/\.+$/, "");
  if (f === b) return;
  if (f.endsWith(`.${b}`)) return;
  throw new Error("Record name must be within your subdomain");
}

import { z } from "zod";
import net from "node:net";

export const recordTypeSchema = z.enum([
  "A",
  "AAAA",
  "CNAME",
  "TXT",
  "MX",
  "SRV",
  "NS",
]);

export const hostSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(63, "Host label too long")
  .refine((v) => v === "@" || v === "" || /^[a-z0-9._-]+$/.test(v), {
    message: "Host must be '@' or a relative name (a-z, 0-9, '.', '_' and '-')",
  })
  .refine((v) => !v.startsWith(".") && !v.endsWith("."), {
    message: "Host cannot start or end with '.'",
  });

export const ttlSchema = z
  .number()
  .int()
  .min(60)
  .max(86_400)
  .default(3600);

const proxiedSchema = z.boolean().optional();

const ipv4Schema = z.string().refine((v) => net.isIP(v) === 4, {
  message: "Invalid IPv4 address",
});
const ipv6Schema = z.string().refine((v) => net.isIP(v) === 6, {
  message: "Invalid IPv6 address",
});

const hostnameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(255)
  .refine((v) => /^[a-z0-9.-]+$/.test(v), { message: "Invalid hostname" })
  .refine((v) => !v.includes(".."), { message: "Invalid hostname" })
  .refine((v) => !/^\d+\.\d+\.\d+\.\d+$/.test(v), {
    message: "Must be a hostname, not an IP",
  });

export const createRecordSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("A"),
    host: hostSchema,
    content: ipv4Schema,
    ttl: ttlSchema.optional(),
    proxied: proxiedSchema,
  }),
  z.object({
    type: z.literal("AAAA"),
    host: hostSchema,
    content: ipv6Schema,
    ttl: ttlSchema.optional(),
    proxied: proxiedSchema,
  }),
  z.object({
    type: z.literal("CNAME"),
    host: hostSchema,
    content: hostnameSchema,
    ttl: ttlSchema.optional(),
    proxied: proxiedSchema,
  }),
  z.object({
    type: z.literal("TXT"),
    host: hostSchema,
    content: z.string().min(1).max(1024),
    ttl: ttlSchema.optional(),
  }),
  z.object({
    type: z.literal("MX"),
    host: hostSchema,
    content: hostnameSchema,
    priority: z.number().int().min(0).max(65535),
    ttl: ttlSchema.optional(),
  }),
  z.object({
    type: z.literal("SRV"),
    host: hostSchema,
    service: z
      .string()
      .trim()
      .toLowerCase()
      .regex(/^_[a-z0-9-]+$/, "Service must look like _sip"),
    proto: z
      .string()
      .trim()
      .toLowerCase()
      .regex(/^_(tcp|udp|tls)$/, "Proto must be _tcp, _udp, or _tls"),
    priority: z.number().int().min(0).max(65535),
    weight: z.number().int().min(0).max(65535),
    port: z.number().int().min(1).max(65535),
    target: hostnameSchema,
    ttl: ttlSchema.optional(),
  }),
  z.object({
    type: z.literal("NS"),
    host: hostSchema,
    content: hostnameSchema,
    ttl: ttlSchema.optional(),
  }),
]);

export type CreateRecordInput = z.infer<typeof createRecordSchema>;

export function normalizeTtl(ttl: number | undefined): number {
  return typeof ttl === "number" && Number.isFinite(ttl) ? ttl : 3600;
}

export function assertProxiedAllowed(type: string, proxied: boolean | undefined) {
  if (!proxied) return;
  if (type === "A" || type === "AAAA" || type === "CNAME") return;
  throw new Error("Proxied is only allowed for A/AAAA/CNAME records");
}

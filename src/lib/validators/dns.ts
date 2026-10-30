import { z } from "zod";
import net from "node:net";

/** The intentionally small public DNS contract. Provider proxying and delegation are not exposed. */
export const recordTypeSchema = z.enum(["A", "AAAA", "CNAME", "TXT"]);

export const hostSchema = z.string().trim().toLowerCase().max(63, "Host label too long")
  .refine((value) => value === "@" || value === "" || /^[a-z0-9._-]+$/.test(value), { message: "Host must be '@' or a relative name" })
  .refine((value) => !value.startsWith(".") && !value.endsWith("."), { message: "Host cannot start or end with '.'" });

export const ttlSchema = z.number().int().min(60).max(86_400).default(3600);
const ipv4Schema = z.string().refine((value) => net.isIP(value) === 4, { message: "Invalid IPv4 address" });
const ipv6Schema = z.string().refine((value) => net.isIP(value) === 6, { message: "Invalid IPv6 address" });
const hostnameSchema = z.string().trim().toLowerCase().max(255)
  .refine((value) => /^[a-z0-9.-]+$/.test(value) && !value.includes("..") && !/^\d+\.\d+\.\d+\.\d+$/.test(value), { message: "Invalid hostname" });

export const createRecordSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("A"), host: hostSchema, content: ipv4Schema, ttl: ttlSchema.optional() }),
  z.object({ type: z.literal("AAAA"), host: hostSchema, content: ipv6Schema, ttl: ttlSchema.optional() }),
  z.object({ type: z.literal("CNAME"), host: hostSchema, content: hostnameSchema, ttl: ttlSchema.optional() }),
  z.object({ type: z.literal("TXT"), host: hostSchema, content: z.string().min(1).max(1024), ttl: ttlSchema.optional() }),
]);

export type CreateRecordInput = z.infer<typeof createRecordSchema>;
export function normalizeTtl(ttl: number | undefined): number { return typeof ttl === "number" && Number.isFinite(ttl) ? ttl : 3600; }

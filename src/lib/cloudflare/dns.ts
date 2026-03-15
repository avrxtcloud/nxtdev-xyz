import { cfFetch, zonePath } from "@/lib/cloudflare/client";

export type CfDnsRecord = {
  id: string;
  type: string;
  name: string;
  content: string;
  ttl: number;
  proxied?: boolean;
  priority?: number;
  data?: unknown;
};

export type CreateCfRecordInput = {
  type: string;
  name: string;
  content?: string;
  ttl: number;
  proxied?: boolean;
  priority?: number;
  data?: unknown;
};

export async function createDnsRecord(input: CreateCfRecordInput) {
  return cfFetch<CfDnsRecord>(zonePath("/dns_records"), {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateDnsRecord(recordId: string, input: Partial<CreateCfRecordInput>) {
  return cfFetch<CfDnsRecord>(zonePath(`/dns_records/${recordId}`), {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function deleteDnsRecord(recordId: string) {
  return cfFetch<{ id: string }>(zonePath(`/dns_records/${recordId}`), {
    method: "DELETE",
  });
}

export async function getDnsRecord(recordId: string) {
  return cfFetch<CfDnsRecord>(zonePath(`/dns_records/${recordId}`), {
    method: "GET",
  });
}

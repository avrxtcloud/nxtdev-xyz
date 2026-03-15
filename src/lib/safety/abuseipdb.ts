import { env } from "@/lib/env";

export type AbuseIpdbResult = {
  ipAddress: string;
  isWhitelisted?: boolean;
  abuseConfidenceScore: number;
  countryCode?: string;
  usageType?: string;
  isp?: string;
  domain?: string;
  totalReports?: number;
  lastReportedAt?: string | null;
};

export async function checkAbuseIpdb(ipAddress: string): Promise<AbuseIpdbResult> {
  const url = new URL("https://api.abuseipdb.com/api/v2/check");
  url.searchParams.set("ipAddress", ipAddress);
  url.searchParams.set("maxAgeInDays", "90");

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      Key: env.ABUSEIPDB_API_KEY,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`AbuseIPDB check failed (${res.status}): ${text}`.slice(0, 250));
  }

  const json = (await res.json()) as { data: AbuseIpdbResult };
  return json.data;
}


export type DohAnswer = {
  name: string;
  type: number;
  TTL: number;
  data: string;
};

export type DohResponse = {
  Status: number;
  TC?: boolean;
  RD?: boolean;
  RA?: boolean;
  AD?: boolean;
  CD?: boolean;
  Question?: Array<{ name: string; type: number }>;
  Answer?: DohAnswer[];
  Authority?: DohAnswer[];
};

export async function queryDoh(name: string, type: string): Promise<DohResponse> {
  const url = new URL("https://cloudflare-dns.com/dns-query");
  url.searchParams.set("name", name);
  url.searchParams.set("type", type);

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/dns-json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`DoH query failed (${res.status})`);
  return (await res.json()) as DohResponse;
}


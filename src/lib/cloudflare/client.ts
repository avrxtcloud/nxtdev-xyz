import { env } from "@/lib/env";

type CfEnvelope<T> = {
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: Array<{ code: number; message: string }>;
  result: T;
};

export async function cfFetch<T>(
  pathname: string,
  init: RequestInit & { query?: Record<string, string | number | undefined> } = {},
): Promise<T> {
  const url = new URL(`https://api.cloudflare.com/client/v4${pathname}`);
  if (init.query) {
    for (const [k, v] of Object.entries(init.query)) {
      if (v === undefined) continue;
      url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url.toString(), {
    ...init,
    headers: {
      Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  const text = await res.text();
  let json: CfEnvelope<T> | null = null;
  try {
    json = JSON.parse(text) as CfEnvelope<T>;
  } catch {
    // ignore
  }

  if (!res.ok || !json?.success) {
    const errorMsg = json?.errors?.[0]?.message ?? `${res.status} ${res.statusText}`;
    throw new Error(`Cloudflare API error: ${errorMsg}`);
  }

  return json.result;
}

export function zonePath(path: string) {
  return `/zones/${env.CLOUDFLARE_ZONE_ID}${path}`;
}

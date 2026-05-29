import { env } from "@/lib/env";

type CloudflareEnvelope<T> = {
  success: boolean;
  errors?: Array<{ message?: string }>;
  result: T;
};

export type EmailRoutingAddress = {
  id?: string;
  email?: string;
  verified?: string | null;
};

export type EmailRoutingRule = {
  id?: string;
  enabled?: boolean;
  name?: string;
};

async function cfEmailFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const payload = (await response.json()) as CloudflareEnvelope<T>;
  if (!response.ok || !payload.success) {
    const message =
      payload.errors?.map((e) => e.message).filter(Boolean).join("; ") ||
      `Cloudflare Email Routing API error: ${response.status}`;
    throw new Error(message);
  }
  return payload.result;
}

export async function createDestinationAddress(email: string) {
  return cfEmailFetch<EmailRoutingAddress>(
    `/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/email/routing/addresses`,
    {
      method: "POST",
      body: JSON.stringify({ email }),
    },
  );
}

export async function listDestinationAddresses() {
  return cfEmailFetch<EmailRoutingAddress[]>(
    `/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/email/routing/addresses`,
  );
}

export async function getDestinationAddress(destinationId: string) {
  return cfEmailFetch<EmailRoutingAddress>(
    `/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/email/routing/addresses/${destinationId}`,
  );
}

export async function createAliasRule(aliasAddress: string, destinationAddress: string) {
  return cfEmailFetch<EmailRoutingRule>(
    `/zones/${env.CLOUDFLARE_ZONE_ID}/email/routing/rules`,
    {
      method: "POST",
      body: JSON.stringify({
        name: `NxtDev mask ${aliasAddress}`,
        enabled: true,
        matchers: [{ type: "literal", field: "to", value: aliasAddress }],
        actions: [{ type: "forward", value: [destinationAddress] }],
      }),
    },
  );
}

export async function deleteAliasRule(ruleId: string) {
  await cfEmailFetch<EmailRoutingRule>(
    `/zones/${env.CLOUDFLARE_ZONE_ID}/email/routing/rules/${ruleId}`,
    { method: "DELETE" },
  );
}

import { env } from "@/lib/env";

export type ShortioLink = {
  idString: string;
  originalURL: string;
  shortURL: string;
  path: string;
  domain: string;
};

async function shortioRequest(path: string, options: RequestInit = {}) {
  const url = `https://api.short.io${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Authorization": env.SHORTIO_API_KEY,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `Short.io API error: ${response.status}`);
  }

  return response.json();
}

export async function createShortLink(originalUrl: string, path?: string): Promise<ShortioLink> {
  return shortioRequest("/links", {
    method: "POST",
    body: JSON.stringify({
      originalURL: originalUrl,
      domain: env.SHORTIO_DOMAIN,
      path: path || undefined,
    }),
  });
}

export async function updateShortLink(linkId: string, originalUrl: string): Promise<ShortioLink> {
  return shortioRequest(`/links/${linkId}`, {
    method: "POST", // Short.io uses POST for updates too
    body: JSON.stringify({
      originalURL: originalUrl,
    }),
  });
}

export async function deleteShortLink(linkId: string): Promise<void> {
  await shortioRequest(`/links/${linkId}`, {
    method: "DELETE",
  });
}

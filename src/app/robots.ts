import type { MetadataRoute } from "next";

const rootDomain =
  (process.env.ROOT_DOMAIN ?? "nxtdev.xyz")
    .trim()
    .split(/\s+/)[0]
    ?.replace(/\.+$/, "") || "nxtdev.xyz";

const baseUrlRaw =
  (process.env.NEXT_PUBLIC_APP_URL ?? "").startsWith("http")
    ? (process.env.NEXT_PUBLIC_APP_URL as string)
    : `https://${rootDomain}`;

const baseUrl = baseUrlRaw.replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/admin", "/dashboard", "/api"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}


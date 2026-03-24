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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "/",
    "/blog",
    "/blog/what-is-nxtdev.xyz",
    "/blog/how-to-optimize-your-subdomain-for-seo",
    "/blog/why-dns-security-matters-for-developers",
    "/docs",
    "/terms",
    "/privacy",
    "/abuse",
    "/report",
    "/status",
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}


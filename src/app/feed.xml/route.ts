import { env } from "@/lib/env";

export async function GET() {
  const posts = [
    {
      title: "What is nxtdev.xyz?",
      description: "Learn about our mission to provide developers with professional subdomains and enterprise-grade DNS infrastructure.",
      slug: "what-is-nxtdev.xyz",
      date: "2026-03-24T00:00:00.000Z",
    },
    {
      title: "How to Optimize Your Subdomain for SEO",
      description: "Learn the best practices for setting up your nxtdev.xyz subdomain to rank higher on Google search results.",
      slug: "how-to-optimize-your-subdomain-for-seo",
      date: "2026-03-24T00:00:00.000Z",
    },
    {
      title: "Why DNS Security Matters for Developers",
      description: "Explore the importance of DNS security and how nxtdev.xyz keeps your subdomains safe with advanced safety checks.",
      slug: "why-dns-security-matters-for-developers",
      date: "2026-03-23T00:00:00.000Z",
    },
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>nxtdev.xyz Blog</title>
    <link>${env.NEXT_PUBLIC_APP_URL}/blog</link>
    <description>Latest insights, tutorials, and updates from nxtdev.xyz</description>
    <atom:link href="${env.NEXT_PUBLIC_APP_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>${env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}</link>
      <description>${post.description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}</guid>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

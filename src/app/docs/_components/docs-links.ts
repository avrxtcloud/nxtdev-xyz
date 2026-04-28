export type DocLink = {
  title: string;
  href: string;
  description: string;
  badge?: string;
};

export const DOC_SECTIONS: Array<{ title: string; items: DocLink[] }> = [
  {
    title: "Getting started",
    items: [
      {
        title: "Quick start",
        href: "/docs/quick-start",
        description: "Claim a subdomain and publish your first records.",
        badge: "Start here",
      },
    ],
  },
  {
    title: "Reference",
    items: [
      {
        title: "Limits",
        href: "/docs/limits",
        description: "Subdomains, records, TTL ranges, and rate limits.",
      },
      {
        title: "Record types",
        href: "/docs/record-types",
        description: "Supported DNS records and validation rules.",
      },
      {
        title: "NS delegation",
        href: "/docs/nsdelegation",
        description: "Delegate your base domain to external nameservers.",
      },
    ],
  },
  {
    title: "Help",
    items: [
      {
        title: "Support",
        href: "/docs/support",
        description: "Contact, status page, and what to include in a ticket.",
      },
    ],
  },
];

export const DOC_LINKS: DocLink[] = DOC_SECTIONS.flatMap((s) => s.items);


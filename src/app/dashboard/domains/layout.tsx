import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Domains",
  description: "Claim subdomains and manage domain ownership.",
};

export default function DomainsLayout(props: { children: React.ReactNode }) {
  return props.children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nameservers",
  description: "Manage nameserver delegation for a claimed nxtdev subdomain.",
};

export default function NameserversLayout(props: { children: React.ReactNode }) {
  return props.children;
}

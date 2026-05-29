import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DNS Records",
  description: "Manage DNS records for a claimed nxtdev subdomain.",
};

export default function RecordsLayout(props: { children: React.ReactNode }) {
  return props.children;
}

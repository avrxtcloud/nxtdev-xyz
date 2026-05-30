import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Masking",
  description: "Create Cloudflare Email Routing aliases that forward to a verified destination inbox.",
};

export default function EmailRoutingLayout(props: { children: React.ReactNode }) {
  return props.children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Masks",
  description: "Create Cloudflare Email Routing aliases for your NxtDev account.",
};

export default function EmailAliasesLayout(props: { children: React.ReactNode }) {
  return props.children;
}

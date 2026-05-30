import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Keys",
  description: "Create and manage API keys for DDNS and automation.",
};

export default function ApiKeysLayout(props: { children: React.ReactNode }) {
  return props.children;
}

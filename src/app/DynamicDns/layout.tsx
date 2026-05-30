import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic DNS",
  description: "Keep home servers, labs, and dynamic IP deployments online with nxtdev DDNS.",
};

export default function DynamicDnsLayout(props: { children: React.ReactNode }) {
  return props.children;
}

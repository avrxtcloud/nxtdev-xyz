import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DDNS Setup Guide",
  description: "Configure dynamic DNS updates for nxtdev subdomains.",
};

export default function DDNSLayout(props: { children: React.ReactNode }) {
  return props.children;
}

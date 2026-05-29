import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Subscribe to nxtdev updates, feature releases, and DNS platform news.",
};

export default function SubscribeLayout(props: { children: React.ReactNode }) {
  return props.children;
}

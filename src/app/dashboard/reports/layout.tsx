import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports",
  description: "View reports submitted for your nxtdev resources.",
};

export default function ReportsLayout(props: { children: React.ReactNode }) {
  return props.children;
}

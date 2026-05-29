import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Short Links",
  description: "Create and manage short links for nxtdev projects.",
};

export default function ShortLinksLayout(props: { children: React.ReactNode }) {
  return props.children;
}

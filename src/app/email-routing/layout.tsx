import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Routing",
  description: "Create privacy-friendly email aliases for nxtdev domains.",
};

export default function EmailRoutingLayout(props: { children: React.ReactNode }) {
  return props.children;
}

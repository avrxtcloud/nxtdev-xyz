import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect GitHub",
  description: "Connect GitHub to unlock DNS record and nameserver management.",
};

export default function VerifyLayout(props: { children: React.ReactNode }) {
  return props.children;
}

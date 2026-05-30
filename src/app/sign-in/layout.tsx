import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to manage your nxtdev subdomains and DNS records.",
};

export default function SignInLayout(props: { children: React.ReactNode }) {
  return props.children;
}

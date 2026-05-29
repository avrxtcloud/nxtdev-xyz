import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account and claim a free nxtdev subdomain.",
};

export default function SignUpLayout(props: { children: React.ReactNode }) {
  return props.children;
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "System Status",
  description: "Live operational status for nxtdev services.",
};

export default function StatusPage() {
  redirect("https://status.nxtdev.xyz");
}

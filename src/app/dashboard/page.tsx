import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function DashboardHome() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <div className="text-sm font-semibold">Manage subdomains</div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Claim up to 2 base subdomains and manage DNS records.
        </p>
        <div className="mt-4">
          <Link className="text-sm underline" href="/dashboard/domains">
            Go to domains →
          </Link>
        </div>
      </Card>
      <Card>
        <div className="text-sm font-semibold">Abuse reports</div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          View reports filed against your domains.
        </p>
        <div className="mt-4">
          <Link className="text-sm underline" href="/dashboard/reports">
            Go to reports →
          </Link>
        </div>
      </Card>
    </div>
  );
}


import { Card } from "@/components/ui/card";

export default function AdminHome() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <div className="text-sm font-semibold">Moderation</div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Review abuse reports, suspend domains, and manage users.
        </p>
      </Card>
      <Card>
        <div className="text-sm font-semibold">Audit logs</div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Track DNS changes and administrative actions.
        </p>
      </Card>
    </div>
  );
}


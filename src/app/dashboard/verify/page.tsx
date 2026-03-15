 "use client";

import { UserProfile } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";

export default function VerifyIdentityPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Verify your identity
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        To prevent scams and spam, you must connect a GitHub account before you
        can claim a subdomain or edit DNS records.
      </p>

      <Card className="mt-6 p-0">
        <UserProfile routing="hash" />
      </Card>
    </main>
  );
}

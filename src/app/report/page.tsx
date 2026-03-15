import { Card } from "@/components/ui/card";
import { env } from "@/lib/env";
import { submitAbuseReport } from "@/app/report/actions";
import { ReportForm } from "@/app/report/ReportForm";

export default async function ReportPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>;
}) {
  const { submitted } = await searchParams;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Report a domain</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        Report phishing, malware, spam, or other abuse under{" "}
        <span className="font-medium">{env.ROOT_DOMAIN}</span>.
      </p>

      {submitted === "1" ? (
        <Card className="mt-6">
          <div className="text-sm font-semibold">Report submitted</div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Thanks — our moderators will review it. If the domain is in active
            abuse, we may suspend it quickly.
          </div>
        </Card>
      ) : null}

      <Card className="mt-6">
        <ReportForm rootDomain={env.ROOT_DOMAIN} action={submitAbuseReport} />
      </Card>
    </main>
  );
}


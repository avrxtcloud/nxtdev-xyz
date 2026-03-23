import DocsContainer from "@/components/docs-container";
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
    <DocsContainer
      title="Report Abuse"
      subtitle={`Help us keep ${env.ROOT_DOMAIN} safe for everyone.`}
      backLink="/"
    >
      <div className="space-y-8">
        <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
          We take reports of abuse very seriously. If you have discovered a subdomain under <span className="text-zinc-900 dark:text-white font-bold">{env.ROOT_DOMAIN}</span> that is hosting phishing, malware, or engaging in other malicious activities, please let us know immediately.
        </p>

        {submitted === "1" ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 animate-bounce-subtle">
            <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-200 font-black mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              Report successfully submitted
            </div>
            <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
              Thank you for helping us maintain a safe community. Our security team will review the report and take action within 24 hours.
            </p>
          </div>
        ) : null}

        <Card className="p-8 rounded-[2.5rem] border-zinc-100/50 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Abuse Details</h2>
            <p className="text-sm text-zinc-500 font-medium mt-1">Please provide as much information as possible.</p>
          </div>
          <ReportForm rootDomain={env.ROOT_DOMAIN} action={submitAbuseReport} />
        </Card>

        <div className="p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">What happens next?</h3>
          <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
            <li className="flex gap-3">
              <span className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] shrink-0">1</span>
              <span>Our automated system performs an immediate scan of the reported domain.</span>
            </li>
            <li className="flex gap-3">
              <span className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] shrink-0">2</span>
              <span>A human moderator reviews the evidence and the domain history.</span>
            </li>
            <li className="flex gap-3">
              <span className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] shrink-0">3</span>
              <span>If confirmed, the domain is suspended and the responsible account is flagged or banned.</span>
            </li>
          </ul>
        </div>
      </div>
    </DocsContainer>
  );
}


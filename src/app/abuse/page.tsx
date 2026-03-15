export default function AbusePolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Abuse Policy</h1>
      <p className="mt-2 text-xs text-zinc-500">Effective date: March 15, 2026</p>

      <div className="mt-6 space-y-6 text-sm text-zinc-600 dark:text-zinc-300">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Zero‑tolerance abuse categories
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Phishing, impersonation, credential theft.</li>
            <li>Malware distribution, exploit hosting, command‑and‑control.</li>
            <li>Spam infrastructure, bulk messaging, or email abuse.</li>
            <li>Fraud, scams, illegal activity, or harmful deception.</li>
            <li>Copyright/DMCA violations and repeat infringement.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Automated protections
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Subdomain labels may be blocked by phishing keyword patterns.</li>
            <li>A/AAAA targets may be blocked by IP reputation checks.</li>
            <li>High‑risk subdomains may be automatically suspended.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Reporting abuse
          </h2>
          <p>
            File a report at <span className="font-mono">/report</span> with the
            domain and a short description. If possible, include evidence such
            as URLs, headers, screenshots, or timestamps.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Enforcement actions
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Delete individual DNS records.</li>
            <li>Suspend or delete a subdomain.</li>
            <li>Suspend or ban an account.</li>
            <li>Preserve logs and cooperate with valid legal requests.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

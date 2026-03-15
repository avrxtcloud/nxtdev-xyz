export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-xs text-zinc-500">Effective date: March 15, 2026</p>

      <div className="mt-6 space-y-6 text-sm text-zinc-600 dark:text-zinc-300">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            1. Service overview
          </h2>
          <p>
            We provide free subdomains and DNS management tools for developers.
            By using this service, you agree to these Terms and the Abuse Policy.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            2. Accounts
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>You must provide accurate account information.</li>
            <li>You are responsible for activity under your account and subdomains.</li>
            <li>We may require additional verification if abuse is suspected.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            3. Acceptable use
          </h2>
          <p>You may not use the service to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Phish, impersonate, or deceive others.</li>
            <li>Host or distribute malware, exploits, or harmful code.</li>
            <li>Operate spam or bulk messaging infrastructure.</li>
            <li>Commit fraud, illegal activity, or rights infringement.</li>
            <li>Attempt to bypass safety controls or rate limits.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            4. Enforcement
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>We may suspend or delete subdomains and DNS records at any time.</li>
            <li>We may suspend or ban accounts for abuse or risk.</li>
            <li>We may cooperate with law enforcement where required.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            5. Availability and changes
          </h2>
          <p>
            The service is provided “as is” without warranties. We may change or
            discontinue features at any time.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            6. Contact
          </h2>
          <p>
            For abuse reports, use <span className="font-mono">/report</span>. For
            support, contact <span className="font-mono">support@nxtdev.xyz</span>.
          </p>
          <p className="text-xs text-zinc-500">
            This page is provided for product use and is not legal advice.
          </p>
        </section>
      </div>
    </main>
  );
}

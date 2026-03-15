export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-xs text-zinc-500">Effective date: March 15, 2026</p>

      <div className="mt-6 space-y-6 text-sm text-zinc-600 dark:text-zinc-300">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            1. What we collect
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="font-medium">Account info</span>: email address and
              username (via Clerk).
            </li>
            <li>
              <span className="font-medium">Service data</span>: claimed subdomains,
              DNS records you create, delegation settings, and abuse reports.
            </li>
            <li>
              <span className="font-medium">Security/audit data</span>: actions you
              perform (audit logs), rate-limit counters, and risk signals to
              prevent abuse.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            2. How we use data
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Provide and operate DNS management for your subdomains.</li>
            <li>Detect and prevent abuse, fraud, and security incidents.</li>
            <li>Respond to abuse reports and moderation requests.</li>
            <li>Maintain service reliability and debugging (logs).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            3. Where data is processed
          </h2>
          <p>
            This service relies on third‑party infrastructure providers to run the
            product:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Clerk (authentication)</li>
            <li>Supabase (database)</li>
            <li>Cloudflare (DNS)</li>
            <li>Vercel (hosting)</li>
            <li>AbuseIPDB (IP reputation checks for A/AAAA records)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            4. Cookies
          </h2>
          <p>
            We use cookies/headers needed for authentication and session management
            (provided by our auth provider). We do not intentionally use cookies for
            third‑party advertising.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            5. Data retention
          </h2>
          <p>
            We retain account and audit data as needed to operate the service and
            prevent abuse. We may retain abuse reports and related logs for longer
            periods where necessary for security, compliance, or investigations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            6. Your choices
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>You can delete your subdomains in the dashboard.</li>
            <li>
              To request account deletion, contact{" "}
              <span className="font-mono">privacy@nxtdev.xyz</span>.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            7. Contact
          </h2>
          <p>
            Privacy questions: <span className="font-mono">privacy@nxtdev.xyz</span>. Support:{" "}
            <span className="font-mono">support@nxtdev.xyz</span>.
          </p>
          <p className="text-xs text-zinc-500">
            This page is provided for product use and is not legal advice.
          </p>
        </section>
      </div>
    </main>
  );
}

import DocsContainer from "@/components/docs-container";

export default function AbusePolicyPage() {
  return (
    <DocsContainer
      title="Abuse Policy"
      subtitle="Last updated: March 15, 2026"
      backLink="/"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Zero-tolerance Categories</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            We maintain a strict zero-tolerance policy for activities that harm users or the integrity of the internet. The following activities will result in immediate suspension:
          </p>
          <ul className="grid sm:grid-cols-2 gap-4 list-none pl-0">
            {[
              "Phishing & Impersonation",
              "Malware & Exploit Hosting",
              "Spam & Bulk Messaging",
              "Fraud & Deception",
              "Copyright Violations",
              "Illegal Activity"
            ].map(item => (
              <li key={item} className="p-4 border border-zinc-100 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Automated Protections</h2>
          <div className="prose prose-zinc dark:prose-invert">
            <p>Our systems continuously monitor all subdomains for suspicious behavior:</p>
            <ul>
              <li><strong>Keyword Filtering:</strong> Subdomain labels are checked against known phishing patterns.</li>
              <li><strong>IP Reputation:</strong> A/AAAA targets are verified via AbuseIPDB and other signals.</li>
              <li><strong>Risk Scoring:</strong> Every domain accumulates a risk score based on its history and records.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Reporting & Enforcement</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            To report abuse, please visit our <a href="/report" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Specialized Reporting Page</a>. We take every report seriously and investigate promptly. Actions include record deletion, subdomain suspension, and account termination.
          </p>
        </section>
      </div>
    </DocsContainer>
  );
}

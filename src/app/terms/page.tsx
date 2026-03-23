import DocsContainer from "@/components/docs-container";
import { env } from "@/lib/env";

export default function TermsPage() {
  return (
    <DocsContainer
      title="Terms of Service"
      subtitle="Last updated: March 15, 2026"
      backLink="/"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">1. Acceptance of Terms</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            By accessing or using {env.ROOT_DOMAIN}, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our service. We reserve the right to modify these terms at any time.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">2. Service Description</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            {env.ROOT_DOMAIN} provides free subdomains and DNS management tools for developers. The service is provided "as is" and "as available" without warranties of any kind.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">3. User Responsibilities</h2>
          <div className="prose prose-zinc dark:prose-invert">
            <ul>
              <li>You are responsible for all activity that occurs under your subdomain.</li>
              <li>You must comply with our Abuse Policy at all times.</li>
              <li>You may not use the service for any illegal or unauthorized purpose.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">4. Termination</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            We reserve the right to terminate or suspend your access to the service immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">5. Limitation of Liability</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            In no event shall {env.ROOT_DOMAIN} or its maintainers be liable for any damages arising out of the use or inability to use the service.
          </p>
        </section>
      </div>
    </DocsContainer>
  );
}

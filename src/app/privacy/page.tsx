import DocsContainer from "@/components/docs-container";
import { env } from "@/lib/env";

export default function PrivacyPage() {
  return (
    <DocsContainer
      title="Privacy Policy"
      subtitle="Last updated: March 15, 2026"
      backLink="/"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">1. Data Collection</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            We collect minimal data necessary to provide the service, including your email address (via Clerk) and DNS record configurations. No personal traffic data passing through your subdomains is inspected or stored by {env.ROOT_DOMAIN}.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
            <li>Account details from Clerk (email, name, ID).</li>
            <li>DNS configurations and subdomain names.</li>
            <li>Technical logs for security and abuse prevention.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">2. Third-Party Services</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            We use Cloudflare for DNS infrastructure, Clerk for authentication, and Supabase for database storage. Please refer to their respective privacy policies for details on how they handle your data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">3. Cookies</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            We use essential cookies via Clerk to manage session authentication. We do not use any tracking, analytics, or advertisement cookies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">4. Security</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            We take reasonable measures to protect your information from unauthorized access, loss, or disclosure. However, no internet-based service is 100% secure.
          </p>
        </section>
      </div>
    </DocsContainer>
  );
}

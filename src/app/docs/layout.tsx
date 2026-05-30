import type { Metadata } from "next";
import { DocsNav } from "./_components/docs-nav";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Guides and API references for nxtdev DNS, DDNS, records, limits, and support.",
};

export default function DocsLayout(props: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <DocsNav variant="sidebar" />
          </div>
        </aside>

        <div className="space-y-8">
          <div className="lg:hidden">
            <DocsNav variant="top" />
          </div>
          {props.children}
        </div>
      </div>
    </main>
  );
}

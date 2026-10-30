import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

type LegalSection = {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
};

type LegalPageProps = {
  label: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
  notice?: { title: string; description: ReactNode };
};

export function LegalPage({ label, title, description, updated, sections, notice }: LegalPageProps) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0d]/90 px-6 py-10 shadow-[0_32px_90px_rgba(0,0,0,.34)] sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl animate-signal-orbit" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent animate-scanline" />
        <div className="relative max-w-3xl animate-avrxt-enter">
          <p className="avrxt-eyebrow flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5" /> {label}</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-.07em] text-white sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">{description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 font-mono uppercase tracking-[.14em]">Effective {updated}</span>
            <Link href="/report" className="group inline-flex items-center gap-1.5 text-violet-200 transition hover:text-white">Report an issue <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[.025] p-4 lg:sticky lg:top-24 animate-avrxt-enter" style={{ animationDelay: "70ms" }}>
          <p className="avrxt-eyebrow text-zinc-500">On this page</p>
          <nav className="mt-4 grid gap-1">
            {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/[.06] hover:text-white"><span className="mr-2 font-mono text-[10px] text-violet-200">{section.number}</span>{section.title}</a>)}
          </nav>
        </aside>

        <div className="rounded-2xl border border-white/10 bg-[#0c0c0e]/80 p-6 shadow-[0_18px_55px_rgba(0,0,0,.2)] sm:p-9">
          {notice ? <Alert className="mb-9 border-violet-300/20 bg-violet-300/[.06] text-zinc-100"><CheckCircle2 className="text-violet-200" /><AlertTitle className="font-semibold text-white">{notice.title}</AlertTitle><AlertDescription className="text-zinc-400">{notice.description}</AlertDescription></Alert> : null}
          <div className="space-y-10">
            {sections.map((section, index) => (
              <section id={section.id} key={section.id} className="scroll-mt-28 animate-avrxt-enter" style={{ animationDelay: `${Math.min(100 + index * 55, 420)}ms` }}>
                <div className="flex items-start gap-4">
                  <span className="mt-1 font-mono text-xs tracking-[.16em] text-violet-200">{section.number}</span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-semibold tracking-[-.04em] text-white">{section.title}</h2>
                    <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-400 sm:text-[15px]">{section.children}</div>
                  </div>
                </div>
                {index < sections.length - 1 ? <Separator className="mt-10 bg-white/10" /> : null}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

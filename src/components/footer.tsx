import Link from "next/link";

const groups = [
  { title: "Platform", links: [["Documentation", "/docs"], ["Dashboard", "/dashboard"], ["Dynamic DNS", "/DynamicDns"], ["Status", "/status"]] },
  { title: "Safety", links: [["Abuse policy", "/abuse"], ["Report abuse", "/report"], ["Privacy", "/privacy"], ["Terms", "/terms"]] },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#080809] px-4 pb-8 pt-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.25fr_1fr_1fr]">
          <div>
            <p className="avrxt-eyebrow">nxtdev.xyz / by avrxt</p>
            <h2 className="mt-4 max-w-sm text-3xl font-semibold tracking-[-.06em] text-white">Names for what you are building next.</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">A focused free subdomain platform for verified developers. No proxy switch, no noisy control plane.</p>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="avrxt-eyebrow text-zinc-500">{group.title}</h3>
              <nav className="mt-5 grid gap-3">
                {group.links.map(([label, href]) => <Link className="w-fit text-sm text-zinc-400 transition-colors hover:text-violet-200" href={href} key={href}>{label}</Link>)}
              </nav>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[.16em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} nxtdev.xyz</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2"><span>Managed DNS</span><span>Abuse-aware</span><a className="text-zinc-400 hover:text-white" href="https://www.avrxt.dev" target="_blank" rel="noreferrer">avrxt.dev ↗</a></div>
        </div>
      </div>
    </footer>
  );
}

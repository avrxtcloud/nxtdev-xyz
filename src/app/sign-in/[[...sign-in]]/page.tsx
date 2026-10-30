import { SignIn } from "@clerk/nextjs";
import { GitFork } from "lucide-react";

const appearance = {
  variables: { colorPrimary: "#c4b5fd", colorBackground: "#111114", colorText: "#f5f5f4", colorTextSecondary: "#a1a1aa", colorInputBackground: "#17171a", colorInputText: "#f5f5f4", borderRadius: "0.75rem", fontFamily: "var(--font-space-grotesk), ui-sans-serif, system-ui" },
  elements: { card: "rounded-xl border border-white/10 bg-[#111114] shadow-none", headerTitle: "font-semibold tracking-[-.04em] text-white", headerSubtitle: "text-zinc-400", socialButtonsBlockButton: "rounded-lg border border-white/15 bg-white/[.06] font-semibold text-white hover:bg-white/[.1]", formButtonPrimary: "rounded-lg border border-violet-300/50 bg-violet-300 font-semibold text-zinc-950 hover:bg-violet-200", formFieldInput: "rounded-lg border border-white/15 bg-[#17171a] text-white", footerActionLink: "font-semibold text-violet-200 underline decoration-violet-300/50 underline-offset-4" },
};

export default function SignInPage() {
  return <main className="relative mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl items-center justify-center px-4 py-16"><div className="pointer-events-none absolute h-80 w-80 rounded-full bg-violet-400/10 blur-3xl animate-signal-orbit" /><section className="relative grid w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0f]/90 p-2 shadow-[0_30px_90px_rgba(0,0,0,.45)] animate-avrxt-enter"><div className="border border-white/10 bg-[linear-gradient(145deg,rgba(196,181,253,.08),transparent_38%)] p-6 sm:p-8"><p className="avrxt-eyebrow">Identity gateway</p><h1 className="mt-3 text-2xl font-semibold tracking-[-.05em] text-white">Welcome back.</h1><p className="mt-2 text-sm leading-6 text-zinc-400">Sign in with your email or GitHub. GitHub connection unlocks protected DNS changes.</p><div className="mt-6"><SignIn appearance={appearance} /></div><p className="mt-5 flex items-center gap-2 text-xs text-zinc-500"><GitFork className="h-3.5 w-3.5 text-violet-200" /> GitHub social sign-in appears when it is enabled in the Clerk application.</p></div></section></main>;
}

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-20">
      <div className="border-2 border-zinc-950 bg-cyan-200 p-2 shadow-[8px_8px_0_#18181b] dark:border-white dark:bg-zinc-900 dark:shadow-[8px_8px_0_#fafafa]">
        <SignUp
          appearance={{
            variables: {
              colorPrimary: "#18181b",
              colorBackground: "#ffffff",
              colorText: "#18181b",
              borderRadius: "0px",
              fontFamily: "inherit",
            },
            elements: {
              card: "rounded-none border-2 border-zinc-950 dark:border-white shadow-none",
              headerTitle: "font-black tracking-tight text-zinc-950",
              headerSubtitle: "font-bold text-zinc-500",
              socialButtonsBlockButton: "rounded-none border-2 border-zinc-950 font-black shadow-[3px_3px_0_#22d3ee]",
              formButtonPrimary: "rounded-none border-2 border-zinc-950 bg-zinc-950 font-black text-white shadow-[4px_4px_0_#facc15]",
              formFieldInput: "rounded-none border-2 border-zinc-950 font-bold",
              footerActionLink: "font-black text-zinc-950 underline decoration-cyan-400 decoration-2 underline-offset-4",
            },
          }}
        />
      </div>
    </main>
  );
}

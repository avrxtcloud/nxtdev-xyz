import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-20 bg-zinc-50/50 dark:bg-zinc-950/20">
      <div className="relative group p-1">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-15 group-hover:opacity-25 transition duration-1000 group-hover:duration-200"></div>
        <SignIn appearance={{ elements: { card: "rounded-[2rem] border-zinc-100 dark:border-zinc-800 shadow-2xl" } }} />
      </div>
    </main>
  );
}


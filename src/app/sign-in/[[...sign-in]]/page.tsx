import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-20">
      <div className="border-2 border-zinc-950 bg-amber-200 p-2 shadow-[8px_8px_0_#18181b] dark:border-white dark:bg-zinc-900 dark:shadow-[8px_8px_0_#fafafa]">
        <SignIn appearance={{ elements: { card: "rounded-none border-2 border-zinc-950 dark:border-white shadow-none" } }} />
      </div>
    </main>
  );
}

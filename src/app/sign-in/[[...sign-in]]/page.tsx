import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="mx-auto flex max-w-6xl justify-center px-4 py-14">
      <SignIn />
    </main>
  );
}


import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="mx-auto flex max-w-6xl justify-center px-4 py-14">
      <SignUp />
    </main>
  );
}


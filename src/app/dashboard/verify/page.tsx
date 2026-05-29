 "use client";

import { UserProfile } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";

export default function VerifyIdentityPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
        Connect GitHub
      </h1>
      <p className="mt-3 max-w-2xl text-sm font-bold leading-6 text-zinc-600 dark:text-zinc-300">
        You can claim a subdomain before connecting GitHub. Connect GitHub when
        you are ready to manage DNS records, nameservers, and production routing.
      </p>

      <Card className="mt-8 p-2">
        <UserProfile
          routing="hash"
          appearance={{
            variables: {
              colorPrimary: "#18181b",
              borderRadius: "0px",
              fontFamily: "inherit",
            },
            elements: {
              card: "rounded-none shadow-none",
              navbar: "font-black",
              pageScrollBox: "rounded-none",
              profileSectionPrimaryButton: "rounded-none border-2 border-zinc-950 bg-zinc-950 font-black text-white shadow-[4px_4px_0_#facc15]",
              formButtonPrimary: "rounded-none border-2 border-zinc-950 bg-zinc-950 font-black text-white shadow-[4px_4px_0_#facc15]",
              formFieldInput: "rounded-none border-2 border-zinc-950 font-bold",
            },
          }}
        />
      </Card>
    </main>
  );
}

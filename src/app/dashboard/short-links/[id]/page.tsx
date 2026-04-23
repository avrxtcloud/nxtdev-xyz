import { getOrCreateAppUser } from "@/lib/auth";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { Card } from "@/components/ui/card";
import { UpdateShortLinkForm } from "../_components/update-form";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditShortLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { appUser } = await getOrCreateAppUser();

  const { data: link, error } = await supabaseAdmin
    .from("ShortLink")
    .select("*")
    .eq("id", id)
    .eq("userId", appUser.id)
    .single();

  if (error || !link) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card className="p-8 rounded-[2.5rem] border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none">
        <div className="mb-8">
          <Link href="/dashboard/short-links" className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors flex items-center gap-2 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Links
          </Link>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Edit Short Link</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium font-mono">
            {link.shortUrl}
          </p>
        </div>

        <UpdateShortLinkForm link={link} />
      </Card>
    </div>
  );
}

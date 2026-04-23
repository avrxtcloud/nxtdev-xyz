import { getOrCreateAppUser } from "@/lib/auth";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { updateShortLinkAction } from "../actions";
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

        <form action={updateShortLinkAction.bind(null, link.id, link.shortioLinkId)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">New Destination URL</label>
            <Input name="originalUrl" defaultValue={link.originalUrl} placeholder="https://example.com/new-dest" required />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Link href="/dashboard/short-links">
              <Button variant="secondary" type="button" className="rounded-xl px-6 h-12 uppercase font-black tracking-widest text-[10px]">Cancel</Button>
            </Link>
            <SubmitButton pendingText="Saving..." className="rounded-xl px-8 h-12 font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20">Save Changes</SubmitButton>
          </div>
        </form>
      </Card>
    </div>
  );
}

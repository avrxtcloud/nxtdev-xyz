import Link from "next/link";
import { getOrCreateAppUser } from "@/lib/auth";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateShortLinkForm } from "./_components/create-form";
import { DeleteLinkButton } from "./_components/delete-button";

export default async function ShortLinksPage() {
  const { appUser } = await getOrCreateAppUser();

  const { data: links, error } = await supabaseAdmin
    .from("ShortLink")
    .select("*")
    .eq("userId", appUser.id)
    .order("createdAt", { ascending: false });

  if (error) throw new Error(error.message);

  return (
    <div className="grid gap-8">
      <Card className="p-8 rounded-[2.5rem] border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Create Short Link</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Transform long URLs into clean <span className="font-mono text-blue-600 dark:text-blue-400">go.nxtdev.xyz/slug</span> links.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="text-2xl font-black text-zinc-900 dark:text-white">{links?.length ?? 0}/4</div>
            <div className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Slots Used</div>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800">
           {(links?.length ?? 0) >= 4 ? (
             <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-900/40 text-sm font-bold text-orange-800 dark:text-orange-200 flex items-center gap-3">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               Maximum limit of 4 links reached. Delete one to create another.
             </div>
           ) : (
            <CreateShortLinkForm />
           )}
        </div>
      </Card>

      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-widest">Active Redirects</h3>
          <div className="h-px flex-1 mx-6 bg-zinc-100 dark:bg-zinc-800 hidden sm:block"></div>
        </div>

        <div className="grid gap-6">
           {(!links || links.length === 0) ? (
             <div className="flex flex-col items-center justify-center p-20 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
               <div className="h-16 w-16 bg-zinc-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-4 text-zinc-400">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.102 1.101" /></svg>
               </div>
               <div className="text-zinc-900 dark:text-white font-bold mb-1">No short links found</div>
               <p className="text-sm text-zinc-500 font-medium">Create your first redirect above to get started.</p>
             </div>
           ) : (
             links.map((link) => (
                <Card key={link.id} className="p-6 rounded-[2rem] group border-zinc-100 dark:border-zinc-800 shadow-sm transition-all hover:shadow-lg">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-3 flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="text-xl font-black text-blue-600 dark:text-blue-400 tracking-tight font-mono">{link.shortUrl}</div>
                        <Badge tone="ok" className="rounded-full px-3 py-0.5 text-[9px] uppercase font-black">Active</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500 font-medium text-sm truncate">
                         <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                         <span className="truncate">{link.originalUrl}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                       <Link href={link.shortUrl} target="_blank" className="flex-1 sm:flex-none">
                         <Button variant="secondary" size="md" className="w-full sm:w-auto rounded-2xl">Visit Link</Button>
                       </Link>
                       <Link href={`/dashboard/short-links/${link.id}`} className="flex-1 sm:flex-none">
                         <Button variant="secondary" size="md" className="w-full sm:w-auto rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">Edit</Button>
                       </Link>
                       <DeleteLinkButton id={link.id} shortioLinkId={link.shortioLinkId} />
                    </div>
                  </div>
                </Card>
             ))
           )}
        </div>
      </section>
    </div>
  );
}

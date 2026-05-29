import Link from "next/link";
import { getOrCreateAppUser } from "@/lib/auth";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreateApiKeyForm } from "./_components/create-form";
import { DeleteApiKeyButton } from "./_components/delete-button";

export default async function ApiKeysPage() {
  const { appUser } = await getOrCreateAppUser();

  const { data: keys, error } = await supabaseAdmin
    .from("ApiKey")
    .select("*")
    .eq("userId", appUser.id)
    .order("createdAt", { ascending: false });

  if (error) throw new Error(error.message);

  return (
    <div className="grid gap-8">
      <Card className="p-8 rounded-lg border-zinc-950/20 dark:border-white/20 shadow-xl shadow-zinc-200/20 dark:shadow-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">API Keys</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Generate tokens for DDNS updates and programmatic access.
            </p>
          </div>
        </div>

        <CreateApiKeyForm />
      </Card>

      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-widest text-xs">Your Active Keys</h3>
          <div className="h-px flex-1 mx-6 bg-zinc-100 dark:bg-zinc-800"></div>
        </div>

        <div className="grid gap-4">
           {(!keys || keys.length === 0) ? (
             <div className="text-center py-12 text-zinc-500 text-sm font-medium">
                No API keys generated yet.
             </div>
           ) : (
             keys.map((k) => (
                <Card key={k.id} className="p-5 rounded-lg border-zinc-950/20 dark:border-white/20 flex items-center justify-between group">
                  <div className="space-y-1">
                    <div className="font-bold text-zinc-900 dark:text-white">{k.name}</div>
                    <div className="flex items-center gap-3">
                       <code className="text-[10px] font-mono text-zinc-400">{k.key.substring(0, 8)}****************</code>
                       <div className="text-[10px] text-zinc-500 font-medium">Created {new Date(k.createdAt).toLocaleDateString()}</div>
                       {k.lastUsedAt && (
                         <Badge tone="ok" className="text-[8px] px-2 py-0">Last used {new Date(k.lastUsedAt).toLocaleDateString()}</Badge>
                       )}
                    </div>
                  </div>

                  <DeleteApiKeyButton id={k.id} />
                </Card>
             ))
           )}
        </div>
      </section>

      <Card className="p-6 rounded-lg bg-amber-100/50 dark:bg-zinc-900 border-zinc-950/20 dark:border-white/20">
         <div className="flex items-start gap-4">
            <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-950/20 dark:border-white/20 text-zinc-950">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
               <h4 className="text-sm font-bold text-zinc-950 dark:text-white">Quick Endpoint Reference</h4>
               <p className="mt-1 text-xs text-zinc-800 dark:text-lime-300 font-medium leading-relaxed">
                 Route: <code className="bg-amber-100 dark:bg-zinc-900 px-1 rounded">https://api.nxtdev.xyz/update?key=YOUR_KEY&domain=YOUR_DOMAIN&ip=YOUR_IP</code>
               </p>
               <Link href="/DDNS" className="mt-2 inline-block text-[10px] font-black uppercase tracking-widest text-zinc-950 hover:underline">
                 View Setup Guide -&gt;
               </Link>
            </div>
         </div>
      </Card>
    </div>
  );
}

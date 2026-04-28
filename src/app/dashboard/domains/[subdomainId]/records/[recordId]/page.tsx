import Link from "next/link";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { getOrCreateAppUser } from "@/lib/auth";
import {
  getOwnedSubdomainOrThrow,
  isDelegationEnabled,
} from "@/lib/services/subdomains";
import { Card } from "@/components/ui/card";
import { updateRecordAction } from "@/app/dashboard/domains/[subdomainId]/records/actions";
import { EditRecordForm } from "./EditRecordForm";

export default async function EditRecordPage({
  params,
}: {
  params: Promise<{ subdomainId: string; recordId: string }>;
}) {
  const { subdomainId, recordId } = await params;
  const { appUser } = await getOrCreateAppUser();
  const subdomain = await getOwnedSubdomainOrThrow({
    userId: appUser.id,
    subdomainId,
  });
  const delegated = await isDelegationEnabled(subdomain.id);

  const { data: record, error } = await supabaseAdmin
    .from("DnsRecord")
    .select("*")
    .eq("id", recordId)
    .eq("subdomainId", subdomain.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!record) throw new Error("Record not found");

  const disabled = delegated || subdomain.status !== "active";

  return (
    <div className="grid gap-8">
      <Card className="p-8 rounded-[2.5rem] border-zinc-100/50 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="font-black font-mono text-blue-600 dark:text-blue-400 h-6 px-2 bg-blue-50 dark:bg-blue-900/40 rounded flex items-center justify-center text-xs">{record.type}</span>
               <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Modify DNS Record</h2>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Updating settings for <span className="font-mono text-zinc-900 dark:text-zinc-100">{record.fqdn}</span>
            </p>
          </div>
          <Link
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            href={`/dashboard/domains/${subdomain.id}/records`}
          >
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            Back to Zone
          </Link>
        </div>

        {disabled && (
          <div className="mb-8 p-5 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/40 rounded-2xl flex items-center gap-4 text-sm font-bold text-orange-800 dark:text-orange-200">
             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
             Editing is disabled while delegation is active or the domain is suspended.
          </div>
        )}

        <EditRecordForm
          subdomainId={subdomain.id}
          record={record}
          action={updateRecordAction}
          disabled={disabled}
        />
      </Card>
      
      <div className="px-8 py-6 bg-zinc-50/50 dark:bg-zinc-900/40 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 space-y-4">
         <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Technical Details</h3>
         <div className="grid gap-4 sm:grid-cols-2 text-[10px] font-bold text-zinc-500">
            <div className="flex items-center gap-3">
               <span className="w-20 uppercase tracking-tighter opacity-70">Cloudflare ID:</span>
               <span className="font-mono text-zinc-600 dark:text-zinc-400 select-all">{record.cloudflareRecordId}</span>
            </div>
            <div className="flex items-center gap-3">
               <span className="w-20 uppercase tracking-tighter opacity-70">Internal ID:</span>
               <span className="font-mono text-zinc-600 dark:text-zinc-400 select-all">{record.id}</span>
            </div>
            <div className="flex items-center gap-3">
               <span className="w-20 uppercase tracking-tighter opacity-70">Last Updated:</span>
               <span className="text-zinc-600 dark:text-zinc-400">{new Date(record.updatedAt).toLocaleString()}</span>
            </div>
         </div>
      </div>
    </div>
  );
}

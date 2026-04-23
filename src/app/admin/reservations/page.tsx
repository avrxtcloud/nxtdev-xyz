import { Card } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { UserSelect, type AdminUserOption } from "@/app/admin/reservations/UserSelect";
import {
  deleteReservationAction,
  releaseReservationToUserAction,
  reserveSubdomainAction,
} from "@/app/admin/reservations/actions";
import { SearchInput } from "@/components/ui/search-input";

export const dynamic = "force-dynamic";

type UserRef = {
  id: string;
  email?: string | null;
  username?: string | null;
  status?: string | null;
};

type ReservationRow = {
  id: string;
  label: string;
  baseFqdn: string;
  note: string | null;
  reservedForUserId: string | null;
  createdByUserId: string | null;
  createdAt: string;
};

export default async function AdminReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const { error: tableErr } = await supabaseAdmin
    .from("ReservedSubdomain")
    .select("id", { head: true, count: "exact" })
    .limit(1);
    
  const tableMissing =
    !!tableErr &&
    (tableErr.message?.includes("schema cache") ||
      tableErr.message?.includes("Could not find the table"));

  let resQuery = supabaseAdmin
    .from("ReservedSubdomain")
    .select("*");
    
  if (q && !tableMissing) {
    resQuery = resQuery.or(`label.ilike.%${q}%,baseFqdn.ilike.%${q}%,note.ilike.%${q}%`);
  }

  const [{ data: reservations, error: resErr }, { data: releaseUsers, error: usersErr }] =
    await Promise.all([
      tableMissing
        ? Promise.resolve({ data: [], error: null })
        : resQuery.order("createdAt", { ascending: false }).limit(200),
      supabaseAdmin
        .from("User")
        .select("id,email,username,status")
        .order("createdAt", { ascending: false })
        .limit(500),
    ]);

  if (resErr) throw new Error(resErr.message);
  if (usersErr) throw new Error(usersErr.message);

  const usersById = new Map<string, UserRef>();
  for (const u of releaseUsers ?? []) {
    usersById.set(u.id as string, {
      id: u.id as string,
      email: (u.email as string) ?? null,
      username: (u.username as string) ?? null,
      status: (u.status as string) ?? null,
    });
  }

  const userOptions: AdminUserOption[] = (releaseUsers ?? [])
    .filter((u) => (u.status as string) === "active")
    .map((u) => ({
      id: u.id as string,
      label: (u.email as string) ?? (u.username as string) ?? (u.id as string),
      description: u.username ? `@${u.username}` : undefined,
    }));

  const rows = (reservations ?? []) as unknown as ReservationRow[];
  const extraIds = Array.from(new Set(
    rows.flatMap(r => [r.reservedForUserId, r.createdByUserId])
      .filter(id => id && !usersById.has(id))
  )) as string[];

  const { data: extraUsers, error: extraErr } = extraIds.length
    ? await supabaseAdmin.from("User").select("id,email,username").in("id", extraIds)
    : { data: [], error: null };
  if (extraErr) throw new Error(extraErr.message);
  for (const u of extraUsers ?? []) {
    usersById.set(u.id as string, {
      id: u.id as string,
      email: (u.email as string) ?? null,
      username: (u.username as string) ?? null,
    });
  }

  return (
    <div className="grid gap-6">
      <Card className="p-6 rounded-[2rem] border-zinc-100 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black uppercase tracking-widest text-zinc-900 dark:text-white">Reserved Subdomains</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Reserved labels are unavailable to the public.
            </p>
          </div>
          <SearchInput placeholder="Search labels or notes..." className="w-full md:w-96" />
        </div>
      </Card>

      {tableMissing ? (
        <Card className="p-6 rounded-[2rem] border-orange-100 bg-orange-50/30 dark:border-orange-900/30 dark:bg-orange-900/10">
          <div className="text-sm font-bold text-orange-900 dark:text-orange-100">Setup required</div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Run the latest <span className="font-mono">supabase_schema.sql</span>{" "}
            to create the <span className="font-mono font-bold text-orange-700 dark:text-orange-300">ReservedSubdomain</span> table.
          </div>
        </Card>
      ) : null}

      <Card className="p-6 rounded-[2rem] border-zinc-100 dark:border-zinc-800">
        <form action={reserveSubdomainAction} className="grid gap-6">
          <div className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white">Reserve a label</div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Label</label>
              <Input name="label" placeholder="example" maxLength={32} required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Assign to user</label>
              <UserSelect
                name="reservedForUserId"
                users={userOptions}
                placeholder="Not assigned"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Internal Note</label>
              <Input name="note" placeholder="Reason / context" maxLength={200} />
            </div>
          </div>
          <div className="flex justify-end">
            <SubmitButton pendingText="Reserving..." className="rounded-xl px-8 h-12 font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20">Reserve</SubmitButton>
          </div>
        </form>
      </Card>

      {/* Desktop Table */}
      <Card className="hidden lg:block rounded-[2rem] border-zinc-100 dark:border-zinc-800 overflow-hidden">
        <Table>
          <thead>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <Th>Domain</Th>
              <Th>Reserved for</Th>
              <Th>Note</Th>
              <Th>Created by</Th>
              <Th>Created</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {rows.length === 0 ? (
              <tr>
                <Td colSpan={6} className="py-20 text-center text-sm text-zinc-500">
                  No reserved labels yet.
                </Td>
              </tr>
            ) : (
              rows.map((r) => {
                const reservedFor = r.reservedForUserId ? usersById.get(r.reservedForUserId) : null;
                const createdBy = r.createdByUserId ? usersById.get(r.createdByUserId) : null;
                return (
                  <tr key={r.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                    <Td className="font-mono text-xs font-semibold">{r.baseFqdn}</Td>
                    <Td className="font-mono text-xs text-zinc-500">
                      {reservedFor?.email ?? "-"}
                    </Td>
                    <Td className="text-xs text-zinc-600 dark:text-zinc-300 italic">
                      {r.note ?? "-"}
                    </Td>
                    <Td className="font-mono text-xs text-zinc-400">
                      {createdBy?.email ?? "-"}
                    </Td>
                    <Td className="font-mono text-xs text-zinc-400">
                      {new Date(r.createdAt).toISOString().slice(0, 10)}
                    </Td>
                    <Td className="text-right">
                      <div className="flex justify-end gap-2">
                        <ReservationActions row={r} userOptions={userOptions} />
                      </div>
                    </Td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </Card>

      {/* Mobile view */}
      <div className="grid gap-4 lg:hidden">
        {rows.map((r) => {
           const reservedFor = r.reservedForUserId ? usersById.get(r.reservedForUserId) : null;
           return (
            <Card key={r.id} className="p-5 rounded-2xl border-zinc-100 dark:border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-black text-blue-600 dark:text-blue-400 font-mono">{r.baseFqdn}</div>
                <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{new Date(r.createdAt).toISOString().slice(0, 10)}</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Reserved For</div>
                <div className="font-mono text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 p-2 rounded-lg truncate">
                  {reservedFor?.email ?? "Not assigned"}
                </div>
              </div>

              {r.note && (
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Note</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-300 italic">
                    {r.note}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-zinc-50 dark:border-zinc-800">
                <ReservationActions row={r} userOptions={userOptions} isMobile />
              </div>
            </Card>
           );
        })}
      </div>
    </div>
  );
}

function ReservationActions({ row, userOptions, isMobile = false }: { row: ReservationRow; userOptions: AdminUserOption[]; isMobile?: boolean }) {
  return (
    <div className={isMobile ? "flex flex-col gap-3" : "flex flex-wrap items-center gap-2"}>
      <form action={releaseReservationToUserAction.bind(null, row.id)} className={isMobile ? "grid gap-3" : "flex items-center gap-2"}>
        <div className={isMobile ? "w-full" : "min-w-[220px]"}>
          <UserSelect
            name="userId"
            users={userOptions}
            defaultUserId={row.reservedForUserId}
            placeholder="Select user"
          />
        </div>
        <SubmitButton pendingText="..." variant="secondary" className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest">
          Release
        </SubmitButton>
      </form>
      <form action={deleteReservationAction.bind(null, row.id)} className={isMobile ? "" : "inline"}>
        <Button size="sm" variant="danger" type="submit" className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest w-full lg:w-auto">
          Delete
        </Button>
      </form>
    </div>
  );
}

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

export default async function AdminReservationsPage() {
  const { error: tableErr } = await supabaseAdmin
    .from("ReservedSubdomain")
    .select("id", { head: true, count: "exact" })
    .limit(1);
  const tableMissing =
    !!tableErr &&
    (tableErr.message?.includes("schema cache") ||
      tableErr.message?.includes("Could not find the table"));

  const [{ data: reservations, error: resErr }, { data: releaseUsers, error: usersErr }] =
    await Promise.all([
      tableMissing
        ? Promise.resolve({ data: [], error: null })
        : supabaseAdmin
            .from("ReservedSubdomain")
            .select("*")
            .order("createdAt", { ascending: false })
            .limit(200),
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
  const reservedForMissing = new Set<string>();
  const createdByMissing = new Set<string>();
  for (const r of rows) {
    if (r.reservedForUserId && !usersById.has(r.reservedForUserId)) reservedForMissing.add(r.reservedForUserId);
    if (r.createdByUserId && !usersById.has(r.createdByUserId)) createdByMissing.add(r.createdByUserId);
  }

  const extraIds = Array.from(new Set([...reservedForMissing, ...createdByMissing]));
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
    <div className="grid gap-4">
      <Card>
        <div className="text-sm font-semibold">Reserved subdomains</div>
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Reserved labels are unavailable to the public. Availability checks show a contact message.
        </div>
      </Card>

      {tableMissing ? (
        <Card>
          <div className="text-sm font-semibold">Setup required</div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Run the latest <span className="font-mono">supabase_schema.sql</span>{" "}
            in Supabase SQL Editor to create{" "}
            <span className="font-mono">ReservedSubdomain</span>, then reload Supabase API schema cache.
          </div>
        </Card>
      ) : null}

      <Card>
        <form action={reserveSubdomainAction} className="grid gap-3">
          <div className="text-sm font-semibold">Reserve a label</div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="text-xs text-zinc-500">Label (1-32 chars)</div>
              <Input name="label" placeholder="example" maxLength={32} required />
            </div>
            <div className="md:col-span-1">
              <div className="text-xs text-zinc-500">Reserved for (optional)</div>
              <UserSelect
                name="reservedForUserId"
                users={userOptions}
                placeholder="Not assigned"
              />
            </div>
            <div className="md:col-span-1">
              <div className="text-xs text-zinc-500">Note (optional)</div>
              <Input name="note" placeholder="Reason / context" maxLength={200} />
            </div>
          </div>
          <div className="flex justify-end">
            <SubmitButton pendingText="Reserving...">Reserve</SubmitButton>
          </div>
        </form>
      </Card>

      <Card>
        <Table>
          <thead>
            <tr>
              <Th>Domain</Th>
              <Th>Reserved for</Th>
              <Th>Note</Th>
              <Th>Created by</Th>
              <Th>Created</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <Td colSpan={6} className="text-sm text-zinc-500">
                  No reserved labels yet.
                </Td>
              </tr>
            ) : (
              rows.map((r) => {
                const reservedFor = r.reservedForUserId ? usersById.get(r.reservedForUserId) : null;
                const createdBy = r.createdByUserId ? usersById.get(r.createdByUserId) : null;
                return (
                  <tr key={r.id}>
                    <Td className="font-mono text-xs">{r.baseFqdn}</Td>
                    <Td className="font-mono text-xs">
                      {reservedFor?.email ?? "-"}
                    </Td>
                    <Td className="text-xs text-zinc-600 dark:text-zinc-300">
                      {r.note ?? "-"}
                    </Td>
                    <Td className="font-mono text-xs">
                      {createdBy?.email ?? "-"}
                    </Td>
                    <Td className="font-mono text-xs">
                      {new Date(r.createdAt).toISOString().slice(0, 10)}
                    </Td>
                    <Td>
                      <div className="flex flex-wrap gap-2">
                        <form action={releaseReservationToUserAction.bind(null, r.id)} className="flex flex-wrap gap-2">
                          <div className="min-w-[220px]">
                            <UserSelect
                              name="userId"
                              users={userOptions}
                              defaultUserId={r.reservedForUserId}
                              placeholder="Select user"
                            />
                          </div>
                          <SubmitButton pendingText="Releasing..." variant="secondary">
                            Release
                          </SubmitButton>
                        </form>
                        <form action={deleteReservationAction.bind(null, r.id)}>
                          <Button size="sm" variant="danger" type="submit">
                            Delete
                          </Button>
                        </form>
                      </div>
                    </Td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

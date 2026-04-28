import { supabaseAdmin } from "@/db/supabaseAdmin";
import { Card } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteUserAction, setUserStatusAction } from "@/app/admin/users/actions";
import { SearchInput } from "@/components/ui/search-input";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  
  let query = supabaseAdmin.from("User").select("*");
  
  if (q) {
    query = query.or(`email.ilike.%${q}%,username.ilike.%${q}%`);
  }
  
  const { data: users, error } = await query
    .order("createdAt", { ascending: false })
    .limit(200);
    
  if (error) throw new Error(error.message);

  return (
    <div className="grid gap-6">
      <Card className="p-6 rounded-[2rem] border-zinc-100 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest text-zinc-900 dark:text-white">User Management</h2>
            <p className="text-xs font-medium text-zinc-500 mt-1">Manage platform users, roles, and status.</p>
          </div>
          <SearchInput placeholder="Search by email or username..." className="w-full md:w-96" />
        </div>
      </Card>

      {/* Desktop Table View */}
      <Card className="hidden lg:block rounded-[2rem] border-zinc-100 dark:border-zinc-800 overflow-hidden">
        <Table>
          <thead>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <Th>Email</Th>
              <Th>Username</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {(users ?? []).map((u) => (
              <tr key={u.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                <Td className="font-mono text-xs font-semibold">{u.email}</Td>
                <Td className="font-mono text-xs text-zinc-500">@{u.username}</Td>
                <Td>
                  <Badge tone="neutral" className="uppercase text-[9px] tracking-tighter">{u.role}</Badge>
                </Td>
                <Td>
                  {u.status === "active" ? (
                    <Badge tone="ok">Active</Badge>
                  ) : u.status === "suspended" ? (
                    <Badge tone="warn">Suspended</Badge>
                  ) : (
                    <Badge tone="bad">Banned</Badge>
                  )}
                </Td>
                <Td className="text-right">
                  <div className="flex justify-end gap-2">
                    <UserActions id={u.id} status={u.status} />
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Mobile Card View */}
      <div className="grid gap-4 lg:hidden">
        {(users ?? []).map((u) => (
          <Card key={u.id} className="p-5 rounded-2xl border-zinc-100 dark:border-zinc-800">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <div className="font-bold text-zinc-900 dark:text-white break-all">{u.email}</div>
                <div className="text-xs font-mono text-zinc-500">@{u.username}</div>
              </div>
              {u.status === "active" ? (
                <Badge tone="ok">Active</Badge>
              ) : u.status === "suspended" ? (
                <Badge tone="warn">Suspended</Badge>
              ) : (
                <Badge tone="bad">Banned</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
               <Badge tone="neutral" className="uppercase text-[9px] tracking-tighter">Role: {u.role}</Badge>
            </div>
            <div className="pt-4 border-t border-zinc-50 dark:border-zinc-800 flex flex-wrap gap-2">
              <UserActions id={u.id} status={u.status} size="sm" />
            </div>
          </Card>
        ))}
      </div>
      
      {(!users || users.length === 0) && (
        <div className="text-center py-20 text-zinc-500">
          No users found matching your search.
        </div>
      )}
    </div>
  );
}

function UserActions({ id, status, size = "sm" }: { id: string; status: string; size?: "sm" | "md" }) {
  return (
    <>
      <form action={setUserStatusAction.bind(null, id, "active")}>
        <Button size={size} variant="secondary" type="submit" disabled={status === "active"}>
          Activate
        </Button>
      </form>
      <form action={setUserStatusAction.bind(null, id, "suspended")}>
        <Button size={size} variant="secondary" type="submit" disabled={status === "suspended"}>
          Suspend
        </Button>
      </form>
      <form action={setUserStatusAction.bind(null, id, "banned")}>
        <Button size={size} variant="danger" type="submit" disabled={status === "banned"}>
          Ban
        </Button>
      </form>
      <form action={deleteUserAction.bind(null, id)}>
        <Button size={size} variant="danger" type="submit">
          Delete
        </Button>
      </form>
    </>
  );
}


import { supabaseAdmin } from "@/db/supabaseAdmin";
import { Card } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteUserAction, setUserStatusAction } from "@/app/admin/users/actions";

export default async function AdminUsersPage() {
  const { data: users, error } = await supabaseAdmin
    .from("User")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);

  return (
    <div className="grid gap-4">
      <Card>
        <div className="text-sm font-semibold">Users</div>
      </Card>

      <Card>
        <Table>
          <thead>
            <tr>
              <Th>Email</Th>
              <Th>Username</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {(users ?? []).map((u) => (
              <tr key={u.id}>
                <Td className="font-mono text-xs">{u.email}</Td>
                <Td className="font-mono text-xs">{u.username}</Td>
                <Td>{u.role}</Td>
                <Td>
                  {u.status === "active" ? (
                    <Badge tone="ok">Active</Badge>
                  ) : u.status === "suspended" ? (
                    <Badge tone="warn">Suspended</Badge>
                  ) : (
                    <Badge tone="bad">Banned</Badge>
                  )}
                </Td>
                <Td>
                  <div className="flex flex-wrap gap-2">
                    <form action={setUserStatusAction.bind(null, u.id, "active")}>
                      <Button size="sm" variant="secondary" type="submit">
                        Activate
                      </Button>
                    </form>
                    <form
                      action={setUserStatusAction.bind(null, u.id, "suspended")}
                    >
                      <Button size="sm" variant="secondary" type="submit">
                        Suspend
                      </Button>
                    </form>
                    <form action={setUserStatusAction.bind(null, u.id, "banned")}>
                      <Button size="sm" variant="danger" type="submit">
                        Ban
                      </Button>
                    </form>
                    <form action={deleteUserAction.bind(null, u.id)}>
                      <Button size="sm" variant="danger" type="submit">
                        Delete
                      </Button>
                    </form>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}


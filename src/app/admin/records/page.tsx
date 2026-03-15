import { supabaseAdmin } from "@/db/supabaseAdmin";
import { Card } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { adminDeleteDnsRecordAction } from "@/app/admin/records/actions";

export default async function AdminDnsRecordsPage() {
  const { data: records, error } = await supabaseAdmin
    .from("DnsRecord")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);

  const subdomainIds = Array.from(
    new Set((records ?? []).map((r) => r.subdomainId as string)),
  );
  const { data: subdomains, error: subErr } = subdomainIds.length
    ? await supabaseAdmin
        .from("Subdomain")
        .select("id,baseFqdn,userId")
        .in("id", subdomainIds)
    : { data: [], error: null };
  if (subErr) throw new Error(subErr.message);

  const userIds = Array.from(
    new Set((subdomains ?? []).map((s) => s.userId as string)),
  );
  const { data: users, error: userErr } = userIds.length
    ? await supabaseAdmin.from("User").select("id,email").in("id", userIds)
    : { data: [], error: null };
  if (userErr) throw new Error(userErr.message);

  const subById = new Map((subdomains ?? []).map((s) => [s.id as string, s]));
  const emailByUserId = new Map((users ?? []).map((u) => [u.id as string, u.email as string]));

  return (
    <div className="grid gap-4">
      <Card>
        <div className="text-sm font-semibold">DNS records</div>
      </Card>
      <Card>
        <Table>
          <thead>
            <tr>
              <Th>Type</Th>
              <Th>Name</Th>
              <Th>Content</Th>
              <Th>Owner</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {(records ?? []).map((r) => {
              const sub = subById.get(r.subdomainId as string);
              const ownerEmail = sub ? emailByUserId.get(sub.userId as string) : null;
              return (
                <tr key={r.id}>
                  <Td className="font-mono">{r.type}</Td>
                  <Td className="font-mono text-xs">{r.fqdn}</Td>
                  <Td className="font-mono text-xs">{r.content}</Td>
                  <Td className="font-mono text-xs">{ownerEmail ?? "unknown"}</Td>
                  <Td>
                    <form action={adminDeleteDnsRecordAction.bind(null, r.id)}>
                      <Button size="sm" variant="danger" type="submit">
                        Delete
                      </Button>
                    </form>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}


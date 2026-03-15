import { redirect } from "next/navigation";

export default async function SubdomainIndexPage({
  params,
}: {
  params: Promise<{ subdomainId: string }>;
}) {
  const { subdomainId } = await params;
  redirect(`/dashboard/domains/${subdomainId}/records`);
}

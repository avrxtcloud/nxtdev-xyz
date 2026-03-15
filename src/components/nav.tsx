import { env } from "@/lib/env";
import { NavClient } from "@/components/nav-client";

export async function Nav() {
  return <NavClient rootDomain={env.ROOT_DOMAIN} />;
}

import { Card } from "@/components/ui/card";
import { getSystemFlags } from "@/lib/system/flags";
import { updateSystemSettingsAction } from "@/app/admin/settings/actions";
import { supabaseAdmin } from "@/db/supabaseAdmin";
import { SettingsForm } from "@/app/admin/settings/SettingsForm";

export default async function AdminSettingsPage() {
  const { error: tableErr } = await supabaseAdmin
    .from("SystemSetting")
    .select("key", { head: true, count: "exact" })
    .limit(1);
  const tableMissing =
    !!tableErr &&
    (tableErr.message?.includes("schema cache") ||
      tableErr.message?.includes("Could not find the table"));

  const flags = await getSystemFlags();

  return (
    <div className="grid gap-4">
      <Card>
        <div className="text-sm font-semibold">System settings</div>
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Use these toggles during maintenance or incidents.
        </div>
      </Card>

      {tableMissing ? (
        <Card>
          <div className="text-sm font-semibold">Setup required</div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Run the latest <span className="font-mono">supabase_schema.sql</span>{" "}
            in Supabase SQL Editor to create{" "}
            <span className="font-mono">SystemSetting</span>, then reload Supabase
            API schema cache.
          </div>
        </Card>
      ) : null}

      <Card>
        <SettingsForm
          action={updateSystemSettingsAction}
          domainCreationEnabled={flags.domainCreationEnabled}
          dnsEditingEnabled={flags.dnsEditingEnabled}
          maintenanceMessage={flags.maintenanceMessage}
        />
      </Card>
    </div>
  );
}

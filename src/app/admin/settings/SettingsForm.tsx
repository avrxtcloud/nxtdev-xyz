"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

export function SettingsForm(props: {
  domainCreationEnabled: boolean;
  dnsEditingEnabled: boolean;
  maintenanceMessage: string;
  action: (fd: FormData) => void | Promise<void>;
}) {
  const initialMaintenance =
    !props.domainCreationEnabled && !props.dnsEditingEnabled;
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(initialMaintenance);
  const [domainCreationEnabled, setDomainCreationEnabled] = useState<boolean>(
    props.domainCreationEnabled,
  );
  const [dnsEditingEnabled, setDnsEditingEnabled] = useState<boolean>(props.dnsEditingEnabled);

  const prevEnabledRef = useRef<{ domain: boolean; dns: boolean }>({
    domain: props.domainCreationEnabled,
    dns: props.dnsEditingEnabled,
  });

  return (
    <form action={props.action} className="grid gap-4">
      <label className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium">Maintenance mode</div>
          <div className="text-xs text-zinc-500">
            Disables both domain creation and DNS editing.
          </div>
        </div>
        <input
          type="checkbox"
          name="maintenanceMode"
          checked={maintenanceMode}
          onChange={(e) => {
            const next = e.target.checked;
            setMaintenanceMode(next);
            if (next) {
              prevEnabledRef.current = {
                domain: domainCreationEnabled,
                dns: dnsEditingEnabled,
              };
              setDomainCreationEnabled(false);
              setDnsEditingEnabled(false);
            } else {
              const restoreDomain = prevEnabledRef.current.domain ?? true;
              const restoreDns = prevEnabledRef.current.dns ?? true;
              // If both restore to false, we'd instantly "look like" maintenance again.
              // Default to enabled so turning off maintenance actually turns it off.
              if (!restoreDomain && !restoreDns) {
                setDomainCreationEnabled(true);
                setDnsEditingEnabled(true);
              } else {
                setDomainCreationEnabled(restoreDomain);
                setDnsEditingEnabled(restoreDns);
              }
            }
          }}
        />
      </label>

      <label className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium">Domain creation</div>
          <div className="text-xs text-zinc-500">
            When disabled, users cannot claim new subdomains.
          </div>
        </div>
        <input
          type="checkbox"
          name="domainCreationEnabled"
          checked={domainCreationEnabled}
          disabled={maintenanceMode}
          onChange={(e) => setDomainCreationEnabled(e.target.checked)}
        />
      </label>

      <label className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium">DNS editing</div>
          <div className="text-xs text-zinc-500">
            When disabled, users cannot create/update/delete DNS records.
          </div>
        </div>
        <input
          type="checkbox"
          name="dnsEditingEnabled"
          checked={dnsEditingEnabled}
          disabled={maintenanceMode}
          onChange={(e) => setDnsEditingEnabled(e.target.checked)}
        />
      </label>

      <div>
        <div className="text-sm font-medium">Maintenance message</div>
        <div className="mt-1">
          <Input
            name="maintenanceMessage"
            defaultValue={props.maintenanceMessage}
            maxLength={200}
          />
        </div>
        <div className="mt-2 text-xs text-zinc-500">
          Shown to users when creation/editing is disabled.
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton pendingText="Saving...">Save settings</SubmitButton>
      </div>
    </form>
  );
}

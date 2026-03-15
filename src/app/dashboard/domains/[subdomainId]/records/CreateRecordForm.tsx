"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { Select } from "@/components/ui/select";

type Props = {
  action: (fd: FormData) => void | Promise<void>;
  disabled: boolean;
};

export function CreateRecordForm({ action, disabled }: Props) {
  const [type, setType] = React.useState("A");

  return (
    <form action={action} className="grid gap-3">
      <div className="grid gap-2 md:grid-cols-4">
        <div className="md:col-span-1">
          <label className="text-sm font-medium">Type</label>
          <div className="mt-1">
            <Select
              name="type"
              value={type}
              onChange={setType}
              disabled={disabled}
              options={[
                { label: "A", value: "A", description: "IPv4 address" },
                { label: "AAAA", value: "AAAA", description: "IPv6 address" },
                { label: "CNAME", value: "CNAME", description: "Alias to another hostname" },
                { label: "TXT", value: "TXT", description: "Text (SPF/verification)" },
                { label: "MX", value: "MX", description: "Mail exchanger" },
                { label: "SRV", value: "SRV", description: "Service record" },
              ]}
            />
          </div>
        </div>
        <div className="md:col-span-1">
          <label className="text-sm font-medium">Host</label>
          <div className="mt-1">
            <Input name="host" placeholder="@" defaultValue="@" disabled={disabled} />
          </div>
        </div>

        {type !== "SRV" ? (
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Content</label>
            <div className="mt-1">
              <Input
                name="content"
                placeholder={type === "A" ? "1.2.3.4" : type === "AAAA" ? "2606:4700:..." : "target"}
                disabled={disabled}
                required
              />
            </div>
          </div>
        ) : (
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Target</label>
            <div className="mt-1">
              <Input name="target" placeholder="target.example.com" disabled={disabled} required />
            </div>
          </div>
        )}
      </div>

      {type === "MX" ? (
        <div className="grid gap-2 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium">Priority</label>
            <div className="mt-1">
              <Input name="priority" type="number" min={0} max={65535} defaultValue={10} disabled={disabled} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">TTL</label>
            <div className="mt-1">
              <Input name="ttl" type="number" min={60} max={86400} placeholder="3600" disabled={disabled} />
            </div>
          </div>
        </div>
      ) : null}

      {type === "SRV" ? (
        <div className="grid gap-2 md:grid-cols-6">
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Service</label>
            <div className="mt-1">
              <Input name="service" placeholder="_minecraft" defaultValue="_service" disabled={disabled} />
            </div>
          </div>
          <div className="md:col-span-1">
            <label className="text-sm font-medium">Proto</label>
            <div className="mt-1">
              <Input name="proto" placeholder="_tcp" defaultValue="_tcp" disabled={disabled} />
            </div>
          </div>
          <div className="md:col-span-1">
            <label className="text-sm font-medium">Priority</label>
            <div className="mt-1">
              <Input name="priority" type="number" min={0} max={65535} defaultValue={0} disabled={disabled} />
            </div>
          </div>
          <div className="md:col-span-1">
            <label className="text-sm font-medium">Weight</label>
            <div className="mt-1">
              <Input name="weight" type="number" min={0} max={65535} defaultValue={0} disabled={disabled} />
            </div>
          </div>
          <div className="md:col-span-1">
            <label className="text-sm font-medium">Port</label>
            <div className="mt-1">
              <Input name="port" type="number" min={1} max={65535} defaultValue={25565} disabled={disabled} />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">TTL</label>
            <div className="mt-1">
              <Input name="ttl" type="number" min={60} max={86400} placeholder="3600" disabled={disabled} />
            </div>
          </div>
        </div>
      ) : null}

      {type === "A" || type === "AAAA" || type === "CNAME" ? (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="proxied" disabled={disabled} />
          Proxied (Cloudflare)
        </label>
      ) : null}

      {type !== "MX" && type !== "SRV" ? (
        <div className="grid gap-2 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium">TTL</label>
            <div className="mt-1">
              <Input name="ttl" type="number" min={60} max={86400} placeholder="3600" disabled={disabled} />
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex justify-end">
        <SubmitButton disabled={disabled} pendingText="Creating...">
          Create record
        </SubmitButton>
      </div>
    </form>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Select, type SelectOption } from "@/components/ui/select";

export type AdminUserOption = { id: string; label: string; description?: string };

export function UserSelect(props: {
  name: string;
  users: AdminUserOption[];
  defaultUserId?: string | null;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const options = useMemo<SelectOption[]>(
    () =>
      props.users.map((u) => ({
        value: u.id,
        label: u.label,
        description: u.description,
      })),
    [props.users],
  );

  const [value, setValue] = useState<string>(() => {
    const v = (props.defaultUserId ?? "").trim();
    return v.length ? v : "";
  });

  const withEmpty = useMemo<SelectOption[]>(
    () => [{ value: "", label: props.placeholder ?? "Select a user" }, ...options],
    [options, props.placeholder],
  );

  return (
    <Select
      name={props.name}
      value={value}
      onChange={setValue}
      options={withEmpty}
      disabled={props.disabled}
      searchable
      searchPlaceholder="Search users..."
      className={props.className}
    />
  );
}

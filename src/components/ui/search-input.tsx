"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";

export function SearchInput(props: {
  placeholder?: string;
  className?: string;
  paramName?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const paramName = props.paramName ?? "q";
  
  const [value, setValue] = React.useState(searchParams.get(paramName) ?? "");

  // Debounced update
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(paramName, value);
      } else {
        params.delete(paramName);
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timer);
  }, [value, paramName, pathname, router, searchParams]);

  return (
    <div className={props.className}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={props.placeholder ?? "Search..."}
          className="pl-9"
        />
      </div>
    </div>
  );
}

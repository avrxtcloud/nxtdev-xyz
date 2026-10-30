import { describe, expect, test } from "vitest";
import { createRecordSchema } from "@/lib/validators/dns";

describe("createRecordSchema", () => {
  test("valid A record", () => {
    const parsed = createRecordSchema.parse({
      type: "A",
      host: "@",
      content: "1.1.1.1",
      ttl: 3600,
    });
    expect(parsed.type).toBe("A");
  });

  test("rejects unsupported record types", () => {
    expect(() => createRecordSchema.parse({ type: "MX", host: "@", content: "mail.example.com" })).toThrow();
  });

  test("rejects invalid host", () => {
    expect(() =>
      createRecordSchema.parse({
        type: "TXT",
        host: ".bad",
        content: "x",
        ttl: 3600,
      }),
    ).toThrow();
  });
});


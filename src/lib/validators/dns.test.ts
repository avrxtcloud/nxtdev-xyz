import { describe, expect, test } from "vitest";
import { createRecordSchema } from "@/lib/validators/dns";

describe("createRecordSchema", () => {
  test("valid A record", () => {
    const parsed = createRecordSchema.parse({
      type: "A",
      host: "@",
      content: "1.1.1.1",
      ttl: 3600,
      proxied: false,
    });
    expect(parsed.type).toBe("A");
  });

  test("valid MX record", () => {
    const parsed = createRecordSchema.parse({
      type: "MX",
      host: "@",
      content: "mail.example.com",
      priority: 10,
      ttl: 3600,
    });
    expect(parsed.type).toBe("MX");
  });

  test("valid SRV record", () => {
    const parsed = createRecordSchema.parse({
      type: "SRV",
      host: "@",
      service: "_minecraft",
      proto: "_tcp",
      priority: 0,
      weight: 0,
      port: 25565,
      target: "server.example.com",
      ttl: 3600,
    });
    expect(parsed.type).toBe("SRV");
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


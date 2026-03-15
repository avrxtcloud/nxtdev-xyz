import { describe, expect, test } from "vitest";
import {
  assertFqdnWithinBase,
  baseFqdnForLabel,
  fqdnForHost,
  subdomainLabelSchema,
} from "@/lib/validators/domain";

describe("subdomainLabelSchema", () => {
  test("accepts valid labels", () => {
    expect(subdomainLabelSchema.parse("alice")).toBe("alice");
    expect(subdomainLabelSchema.parse("abcd")).toBe("abcd");
    expect(subdomainLabelSchema.parse("a1b-2c")).toBe("a1b-2c");
  });

  test("rejects invalid labels", () => {
    expect(() => subdomainLabelSchema.parse("a")).toThrow();
    expect(() => subdomainLabelSchema.parse("abc")).toThrow();
    expect(() => subdomainLabelSchema.parse("-abc")).toThrow();
    expect(() => subdomainLabelSchema.parse("abc-")).toThrow();
    expect(() => subdomainLabelSchema.parse("ab--cd")).toThrow();
    expect(() => subdomainLabelSchema.parse("AbCd")).not.toThrow();
  });
});

describe("fqdn construction", () => {
  test("baseFqdnForLabel", () => {
    expect(baseFqdnForLabel("alice", "nxtdev.xyz")).toBe("alice.nxtdev.xyz");
  });

  test("fqdnForHost", () => {
    expect(fqdnForHost("@", "alice.nxtdev.xyz")).toBe("alice.nxtdev.xyz");
    expect(fqdnForHost("api", "alice.nxtdev.xyz")).toBe("api.alice.nxtdev.xyz");
  });

  test("assertFqdnWithinBase", () => {
    expect(() => assertFqdnWithinBase("api.alice.nxtdev.xyz", "alice.nxtdev.xyz")).not.toThrow();
    expect(() => assertFqdnWithinBase("alice.nxtdev.xyz", "alice.nxtdev.xyz")).not.toThrow();
    expect(() => assertFqdnWithinBase("evil.nxtdev.xyz", "alice.nxtdev.xyz")).toThrow();
  });
});

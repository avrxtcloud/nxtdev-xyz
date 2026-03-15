import fs from "node:fs";
import path from "node:path";

let cached: string[] | null = null;

function keywordFilePath(): string {
  return path.join(process.cwd(), "src", "data", "phishing-keywords.txt");
}

export function loadPhishingKeywords(): string[] {
  if (cached) return cached;
  try {
    const raw = fs.readFileSync(keywordFilePath(), "utf8");
    cached = raw
      .split(/\r?\n/g)
      .map((l) => l.trim().toLowerCase())
      .filter((l) => l && !l.startsWith("#"));
  } catch {
    cached = ["paypal-login", "secure-bank", "apple-id", "crypto-wallet"];
  }
  return cached;
}

export function matchesPhishingKeyword(input: string): string | null {
  const lower = input.toLowerCase();
  for (const kw of loadPhishingKeywords()) {
    if (lower.includes(kw)) return kw;
  }
  return null;
}


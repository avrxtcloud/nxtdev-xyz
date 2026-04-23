-- Database Migrations for nxtdev.xyz v2 features

-- 1. ShortLink Table
create table if not exists "ShortLink" (
  "id" text primary key,
  "userId" text not null,
  "shortId" text not null unique, -- external id from short.io
  "path" text not null, -- slug
  "originalUrl" text not null,
  "title" text null,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  constraint "ShortLink_userId_fkey"
    foreign key ("userId") references "User"("id") on delete cascade
);
create index if not exists "ShortLink_userId_idx" on "ShortLink" ("userId");

-- 2. ApiKey Table (for DDNS)
create table if not exists "ApiKey" (
  "id" text primary key,
  "userId" text not null,
  "key" text not null unique,
  "name" text not null,
  "createdAt" timestamptz not null default now(),
  "lastUsedAt" timestamptz null,
  constraint "ApiKey_userId_fkey"
    foreign key ("userId") references "User"("id") on delete cascade
);
create index if not exists "ApiKey_userId_idx" on "ApiKey" ("userId");
create index if not exists "ApiKey_key_idx" on "ApiKey" ("key");

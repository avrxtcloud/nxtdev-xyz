# nxtdev.xyz 

Claim up to 2 free subdomains under `nxtdev.xyz` and fully manage DNS records inside a single Cloudflare zone.

## Features (MVP)
- Auth via Clerk (email/username) + admin allowlist (`ADMIN_EMAILS`)
- Identity gate: users must link GitHub OAuth in Clerk before claiming or editing DNS
- Claim/delete subdomains (max 2 per user)
- DNS records: `A`, `AAAA`, `CNAME`, `TXT`, `MX`, `SRV`, `NS` (delegation only)
- Delegation mode (NS) locks internal DNS editing until removed
- Propagation check (DNS-over-HTTPS)
- Abuse reporting + admin moderation
- Admin announcements + maintenance toggles
- Admin reserved labels (reserve/release to a user)

## Stack
- Next.js (App Router) + server actions
- Clerk Auth
- Supabase Postgres (tables created via `supabase_schema.sql`)
- Supabase HTTP API using a **service role** key (server-side only)
- Cloudflare DNS API (zone-scoped token)
- Safety: keyword blocks + AbuseIPDB checks for `A`/`AAAA`

## Local development

### 1) Configure env vars
- Copy `.env.example` to `.env.local`
- Fill in values (Clerk, Supabase, Cloudflare, AbuseIPDB, `ADMIN_EMAILS`)

### 2) Create Supabase tables
Run `supabase_schema.sql` in Supabase SQL Editor, then reload the Supabase API schema cache.

### 3) Run
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Deploy (Vercel)

### 1) Set env vars (Vercel Project Settings)
Required:
- `ROOT_DOMAIN=nxtdev.xyz`
- `NEXT_PUBLIC_APP_URL=https://nxtdev.xyz`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (**server-side only; do not expose to the browser**)
- `CLOUDFLARE_ZONE_ID`
- `CLOUDFLARE_API_TOKEN`
- `ABUSEIPDB_API_KEY`
- `ADMIN_EMAILS` (comma-separated)

Recommended:
- `ABUSEIPDB_THRESHOLD=30`
- `RISK_SUSPEND_THRESHOLD=60`

### 2) Connect domain
- Point `nxtdev.xyz` to Vercel (or use Vercel DNS)
- `/status` redirects to `https://status.nxtdev.xyz` (host this separately)

### 3) Branding assets
- Replace `public/logo.png` and `public/og.png` with your final assets

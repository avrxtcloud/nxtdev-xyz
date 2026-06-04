<div align="center">

<br />

<img src="https://www.nxtdev.xyz/logo.svg" alt="nxtdev.xyz" height="72" />

<br /><br />

### Free subdomains - Email aliases - Short links - built for developers

[![Subdomains Claimed](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.nxtdev.xyz%2Fstats&query=total&label=subdomains%20claimed&color=00ff88&style=flat-square)](https://nxtdev.xyz)
[![Built on Cloudflare](https://img.shields.io/badge/built%20on-Cloudflare-F48120?style=flat-square&logo=cloudflare&logoColor=white)](https://cloudflare.com)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Made by aviorxt](https://img.shields.io/badge/made%20by-aviorxt-a78bfa?style=flat-square)](https://www.avrxt.in)
[![Version](https://img.shields.io/badge/version-v3.2-00ff88?style=flat-square)](https://github.com/erroraero)
[![Last Updated](https://img.shields.io/badge/last%20updated-May%202026-slategray?style=flat-square)](https://github.com/erroraero)

<br />

[**Get Started ->**](https://www.nxtdev.xyz) &nbsp;-&nbsp; [Claim a Domain](https://www.nxtdev.xyz/dashboard/domains) &nbsp;-&nbsp; [Email Aliases](https://www.nxtdev.xyz/dashboard/email-aliases) &nbsp;-&nbsp; [Short Links](https://www.nxtdev.xyz/dashboard/short-links) &nbsp;-&nbsp; [Status](https://status.nxtdev.xyz)

<br />

<img src="https://www.nxtdev.xyz/og.png" alt="nxtdev.xyz preview" width="600" style="border-radius:12px" />

<br />

</div>

---

## What is nxtdev.xyz?

**nxtdev.xyz** is a free developer toolkit - real DNS subdomains, email aliases, and short links, all on Cloudflare's global network. No credit card. No waitlist. Ship in seconds.

```
yourproject.nxtdev.xyz        ->  your Vercel / Netlify / VPS deploy
api.yourproject.nxtdev.xyz    ->  your backend
me@yourproject.nxtdev.xyz     ->  your email alias
nxtdev.xyz/go/your-link       ->  your short link
```

---

## Features

### Subdomain Registry

Claim a real subdomain under `nxtdev.xyz` and point it anywhere - Vercel, Netlify, Cloudflare Pages, a VPS, a game server, anywhere.

- **2 subdomains free**, forever - no tricks
- Up to **100 DNS records** per subdomain
- Cloudflare-backed - global propagation in seconds
- Supports `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `SRV`, and NS delegation

[Claim your subdomain ->](https://www.nxtdev.xyz/dashboard/domains)

---

### Email Aliases

Create lightweight email aliases under your nxtdev subdomain. Forward to any inbox - no self-hosting required.

- Perfect for project emails, throwaway contacts, or portfolio identity
- Set up via MX + TXT records in your subdomain dashboard

[Set up email aliases ->](https://www.nxtdev.xyz/dashboard/email-aliases)

---

### Short Links

Brand your links with `nxtdev.xyz/go/your-slug`. Clean, shareable, Cloudflare-fast.

- Create and manage short links from your dashboard
- Great for project demos, portfolio links, and sharing APIs

[Create short links ->](https://www.nxtdev.xyz/dashboard/short-links)

---

## DNS Record Support

| Record | Use Case |
|--------|----------|
| `A` / `AAAA` | Point to any server IP (IPv4 or IPv6) |
| `CNAME` | Vercel, Netlify, Render, GitHub Pages, any host |
| `MX` | Self-hosted or managed email delivery |
| `TXT` | SPF, DKIM, site verification tokens |
| `SRV` | Game servers, XMPP, custom protocols |
| `NS` | Delegate to your own nameservers (unlimited records) |

---

## Quick Start

### 1. Sign in

Head to **[nxtdev.xyz](https://www.nxtdev.xyz)** and log in with GitHub - no forms, no friction.

### 2. Claim your subdomain

Pick your handle, configure your records, done.

```
# Point to Vercel
Type:   CNAME
Name:   yourname.nxtdev.xyz
Value:  cname.vercel-dns.com
TTL:    Auto

# Point to a VPS
Type:   A
Name:   yourname.nxtdev.xyz
Value:  1.2.3.4
TTL:    60
```

### 3. Ship

Your subdomain is live. No waiting. No propagation lag. Cloudflare handles it.

---

## Use Cases

| | |
|---|---|
| **Portfolios & Websites** | Deploy to Vercel, Netlify, Cloudflare Pages, or GitHub Pages. Point a CNAME and go live. |
| **APIs & Backends** | Running a side project on a VPS or Railway? Use an `A` record or Cloudflare Worker reverse proxy. |
| **Email & Identity** | Set up MX + TXT for a real project email. `me@yourproject.nxtdev.xyz` hits differently. |
| **Game Servers** | SRV records for Minecraft, XMPP, or any custom protocol. |
| **Status Pages** | `status.yourproject.nxtdev.xyz` pointing at Uptime Kuma or BetterUptime. |
| **Short Links** | Share clean links for demos, portfolios, and side projects. |

---

## Safety

Every submission is automatically reviewed:

- Phishing pattern detection
- IP reputation checks on `A` / `AAAA` records
- Private IP ranges blocked (`10.x`, `192.168.x`, `172.16-31.x`)
- Abuse reports handled within 24h

To report abuse: [nxtdev.xyz/report](https://www.nxtdev.xyz/report) or email `abuse@nxtdev.xyz`

---

## FAQ

<details>
<summary><strong>Is this actually free?</strong></summary>

Yes. 2 subdomains, forever free. The free tier is the point - not a funnel.

</details>

<details>
<summary><strong>How do I get unlimited records?</strong></summary>

Delegate your nameservers to nxtdev.xyz infrastructure and get full control with unlimited records. Full guide at [nxtdev.xyz/docs](https://www.nxtdev.xyz/docs).

</details>

<details>
<summary><strong>How fast does DNS propagate?</strong></summary>

Cloudflare. Usually under 60 seconds globally - sometimes faster.

</details>

<details>
<summary><strong>Can I use this for a production project?</strong></summary>

Yes. The DNS layer is Cloudflare - the same infrastructure powering millions of production sites.

</details>

<details>
<summary><strong>Can I point to a local/private IP?</strong></summary>

No. Private ranges are blocked on `A`/`AAAA` records for security reasons.

</details>

<details>
<summary><strong>What gets flagged by the safety system?</strong></summary>

Known phishing patterns, IPs on abuse lists, and credential harvesting patterns. Legitimate projects are never blocked. Appeal at `abuse@nxtdev.xyz`.

</details>

---

## Links

| | |
|---|---|
| Website | [nxtdev.xyz](https://www.nxtdev.xyz) |
| Dashboard | [nxtdev.xyz/dashboard/domains](https://www.nxtdev.xyz/dashboard/domains) |
| Email Aliases | [nxtdev.xyz/dashboard/email-aliases](https://www.nxtdev.xyz/dashboard/email-aliases) |
| Short Links | [nxtdev.xyz/dashboard/short-links](https://www.nxtdev.xyz/dashboard/short-links) |
| Abuse Report | [nxtdev.xyz/report](https://www.nxtdev.xyz/report) |
| Status | [status.nxtdev.xyz](https://status.nxtdev.xyz) |

## Team

<table>
<tr>
<td align="center" width="25%">
  <a href="https://www.avrxt.in">
    <img src="https://github.com/aviorxt.png" width="64" height="64" style="border-radius:50%" alt="aviorxt" /><br />
    <strong>@aviorxt</strong>
  </a><br />
  <sub><a href="https://www.avrxt.in">avrxt.in</a></sub>
</td>
<td align="center" width="25%">
  <a href="https://github.com/erroraero">
    <img src="https://github.com/erroraero.png" width="64" height="64" style="border-radius:50%" alt="erroraero" /><br />
    <strong>@erroraero</strong>
  </a><br />
  <sub><a href="https://error.nxtdev.xyz">error.nxtdev.xyz</a></sub>
</td>
<td align="center" width="25%">
  <a href="https://ebnn.xyz">
    <img src="https://github.com/Ebnxyz.png" width="64" height="64" style="border-radius:50%" alt="Ebnxyz" /><br />
    <strong>@Ebnxyz</strong>
  </a><br />
  <sub><a href="https://ebnn.xyz">ebnn.xyz</a></sub>
</td>
<td align="center" width="25%">
  <a href="https://naruto.nxtdev.xyz">
    <img src="https://github.com/006naruto.png" width="64" height="64" style="border-radius:50%" alt="006naruto" /><br />
    <strong>@006naruto</strong>
  </a><br />
  <sub><a href="https://naruto.nxtdev.xyz">naruto.nxtdev.xyz</a></sub>
</td>
</tr>
</table>

---

<div align="center">

Built by the nxtdev team

**[nxtdev.xyz ->](https://www.nxtdev.xyz)**

<sub>Last updated: May 30, 2026 &nbsp;-&nbsp; [@erroraero](https://github.com/erroraero)</sub>

</div>

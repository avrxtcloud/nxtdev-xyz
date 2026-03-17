<div align="center">

<br />

```
 ███╗   ██╗██╗  ██╗████████╗██████╗ ███████╗██╗   ██╗    ██╗  ██╗██╗   ██╗███████╗
 ████╗  ██║╚██╗██╔╝╚══██╔══╝██╔══██╗██╔════╝██║   ██║    ╚██╗██╔╝╚██╗ ██╔╝╚══███╔╝
 ██╔██╗ ██║ ╚███╔╝    ██║   ██║  ██║█████╗  ██║   ██║     ╚███╔╝  ╚████╔╝   ███╔╝ 
 ██║╚██╗██║ ██╔██╗    ██║   ██║  ██║██╔══╝  ╚██╗ ██╔╝     ██╔██╗   ╚██╔╝   ███╔╝  
 ██║ ╚████║██╔╝ ██╗   ██║   ██████╔╝███████╗ ╚████╔╝     ██╔╝ ██╗   ██║   ███████╗
 ╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚══════╝  ╚═══╝      ╚═╝  ╚═╝   ╚═╝   ╚══════╝
```

**Claim a free subdomain. Ship faster with real DNS.**

[![Subdomains Claimed](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.nxtdev.xyz%2Fstats&query=total&label=subdomains%20claimed&color=00ff88&style=flat-square)](https://nxtdev.xyz)
[![Built on Cloudflare](https://img.shields.io/badge/built%20on-Cloudflare-F48120?style=flat-square&logo=cloudflare&logoColor=white)](https://cloudflare.com)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

<br />

[**→ Claim your subdomain**](https://nxtdev.xyz) · [Docs](https://nxtdev.xyz/docs) · [Status](https://status.nxtdev.xyz)

<br />

</div>

---

## What is nxtdev.xyz?

**nxtdev.xyz** gives every developer a real, production-grade subdomain — for free. No credit card. No BS. Just point your DNS and ship.

```
yourthing.nxtdev.xyz  →  your Vercel deploy
api.yourthing.nxtdev.xyz  →  your backend
mail.yourthing.nxtdev.xyz  →  your self-hosted email
```

Built on Cloudflare's global network. Live in seconds.

---

## Features

### 🚀 Free Tier — No catch
- **2 subdomains** per account, free forever
- Up to **100 DNS records** per subdomain (default limit)
- Cloudflare-backed — global propagation in seconds

### ♾️ Unlimited — Bring your nameservers
- Point your own nameservers to nxtdev.xyz infra
- **Unlimited records**, full control

### 🛡️ Safety System
Every submission goes through:
- Phishing pattern detection
- IP reputation checks on `A`/`AAAA` records
- Abuse reports handled within 24h

### 🔌 DNS Record Support

| Record | Use Case |
|--------|----------|
| `A` / `AAAA` | Point to any server IP |
| `CNAME` | Vercel, Netlify, Render, any host |
| `MX` | Self-hosted or managed email |
| `TXT` | SPF, DKIM, verification tokens |
| `SRV` | Game servers, XMPP, custom protocols |

---

## Quick Start

### 1. Claim your subdomain

Head to **[nxtdev.xyz](https://nxtdev.xyz)** and log in with GitHub.

### 2. Add your DNS records

```
Type:   CNAME
Name:   yourname.nxtdev.xyz
Value:  cname.vercel-dns.com
TTL:    Auto
```

Or for a VPS:

```
Type:   A
Name:   yourname.nxtdev.xyz
Value:  1.2.3.4
TTL:    60
```

### 3. Done

Your subdomain is live. No waiting. No propagation delays (Cloudflare handles it).

---

## Use Cases

<table>
<tr>
<td width="33%">

**🌐 Websites**

Deploy to Vercel, Netlify, Cloudflare Pages, GitHub Pages or any host. Point a CNAME and you're live.

</td>
<td width="33%">

**⚙️ APIs & Backends**

Running a side project API on a VPS or Railway? Use an `A` record or reverse proxy via Cloudflare Workers.

</td>
<td width="33%">

**📬 Email & Real Infra**

Set up MX + TXT records for self-hosted email. SRV records for game servers. This is actual DNS.

</td>
</tr>
</table>

---

## Subdomain Ideas

```
portfolio.nxtdev.xyz     — your dev portfolio
api.nxtdev.xyz           — personal API playground
blog.nxtdev.xyz          — ghost / hashnode / whatever
mc.nxtdev.xyz            — minecraft server (SRV)
status.nxtdev.xyz        — uptime page
dev.nxtdev.xyz           — staging environment
```

---

## FAQ

<details>
<summary><strong>Is this really free?</strong></summary>

Yes. 2 subdomains, forever free. We're not pivoting to paid-only. The free tier is the point.

</details>

<details>
<summary><strong>How do I get unlimited records?</strong></summary>

Change your nameservers to point at our infrastructure. Full docs at [nxtdev.xyz/docs](https://nxtdev.xyz/docs).

</details>

<details>
<summary><strong>What's the TTL / propagation time?</strong></summary>

Cloudflare. Usually under 60 seconds globally.

</details>

<details>
<summary><strong>Can I use this for production?</strong></summary>

Absolutely. The DNS infrastructure is Cloudflare — same as what powers millions of production sites.

</details>

<details>
<summary><strong>What gets blocked by the safety system?</strong></summary>

Known phishing patterns, IPs on abuse lists, and anything that looks like credential harvesting. Legitimate projects are never blocked. Appeal at abuse@nxtdev.xyz.

</details>

<details>
<summary><strong>Can I point to a private/local IP?</strong></summary>

No. Private ranges (10.x, 192.168.x, 172.16–31.x) are blocked on A/AAAA records for security.

</details>

---

<div align="center">

Built for developers who just want to ship.

**[nxtdev.xyz →](https://nxtdev.xyz)**

</div>

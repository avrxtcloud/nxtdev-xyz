/**
 * nxtdev.xyz DDNS API Worker (Premium Version)
 * 
 * Endpoint: GET https://api.nxtdev.xyz/update?key=...&domain=...&ip=...
 * Supports: Auto-creation, Sync to DB, IPv4/IPv6 detection, Sub-labels.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname !== "/update") {
      return new Response("nxtdev DDNS API - Usage: /update?key=...&domain=...&ip=...", { status: 404 });
    }

    const key = url.searchParams.get("key");
    const domainInput = url.searchParams.get("domain")?.toLowerCase();
    const ip = url.searchParams.get("ip");

    if (!key || !domainInput || !ip) {
      return new Response("Missing parameters (key, domain, ip)", { status: 400 });
    }

    // 1. Detect Base Domain and Host Label
    const parts = domainInput.split(".");
    const rootPart = "nxtdev.xyz";
    if (!domainInput.endsWith(rootPart)) {
      return new Response("Invalid domain (must end with .nxtdev.xyz)", { status: 400 });
    }

    // Example: my.host.example.com -> parts: [my, host, example, com]
    // Here: parts: [..., label, nxtdev, xyz]
    const baseIndex = parts.length - 3; // index of the subdomain label
    if (baseIndex < 0) return new Response("Invalid domain structure", 400);
    
    const baseLabel = parts[baseIndex];
    const baseFqdn = `${baseLabel}.${rootPart}`;
    const hostLabel = parts.slice(0, baseIndex).join(".") || "@";

    // 2. Detect IP Type
    const isIPv6 = ip.includes(":");
    const recordType = isIPv6 ? "AAAA" : "A";

    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

    // 3. Verify API Key
    const keyRes = await fetch(`${supabaseUrl}/rest/v1/ApiKey?key=eq.${key}&select=userId`, {
      headers: { "apikey": supabaseKey, "Authorization": `Bearer ${supabaseKey}` }
    });
    const keys = await keyRes.json();
    if (!keys || keys.length === 0) return new Response("Invalid API Key", { status: 401 });
    const userId = keys[0].userId;

    // 4. Verify Subdomain Ownership
    const subRes = await fetch(`${supabaseUrl}/rest/v1/Subdomain?userId=eq.${userId}&baseFqdn=eq.${baseFqdn}&select=id,baseFqdn,status`, {
      headers: { "apikey": supabaseKey, "Authorization": `Bearer ${supabaseKey}` }
    });
    const subdomains = await subRes.json();
    if (!subdomains || subdomains.length === 0) {
       return new Response(`You do not own the base domain '${baseFqdn}'`, { status: 403 });
    }
    const subdomain = subdomains[0];
    if (subdomain.status !== "active") return new Response("Subdomain is suspended", { status: 403 });

    // 5. Cloudflare Interaction
    const cfToken = env.CLOUDFLARE_API_TOKEN;
    const cfZoneId = env.CLOUDFLARE_ZONE_ID;

    // Search for existing record
    const recordSearch = await fetch(`https://api.cloudflare.com/client/v4/zones/${cfZoneId}/dns_records?name=${domainInput}&type=${recordType}`, {
      headers: { "Authorization": `Bearer ${cfToken}` }
    });
    const recordsJson = await recordSearch.json();
    
    let cfRecordId = null;
    let cfMethod = "POST";
    let cfUrl = `https://api.cloudflare.com/client/v4/zones/${cfZoneId}/dns_records`;

    if (recordsJson.success && recordsJson.result.length > 0) {
      cfRecordId = recordsJson.result[0].id;
      cfMethod = "PATCH";
      cfUrl += `/${cfRecordId}`;
    }

    const cfRes = await fetch(cfUrl, {
      method: cfMethod,
      headers: { 
        "Authorization": `Bearer ${cfToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: recordType,
        name: domainInput,
        content: ip,
        ttl: 120,
        proxied: false
      })
    });

    const cfData = await cfRes.json();
    if (!cfData.success) {
      return new Response(`Cloudflare Error: ${cfData.errors[0].message}`, { status: 500 });
    }
    cfRecordId = cfData.result.id;

    // 6. DB Sync (Upsert DnsRecord)
    // First, find if we already have it in our DB
    const dbCheck = await fetch(`${supabaseUrl}/rest/v1/DnsRecord?cloudflareRecordId=eq.${cfRecordId}&select=id`, {
      headers: { "apikey": supabaseKey, "Authorization": `Bearer ${supabaseKey}` }
    });
    const existingDb = await dbCheck.json();
    
    const recordPayload = {
      subdomainId: subdomain.id,
      cloudflareRecordId: cfRecordId,
      type: recordType,
      host: hostLabel,
      fqdn: domainInput,
      content: ip,
      ttl: 120,
      updatedAt: new Date().toISOString()
    };

    if (existingDb && existingDb.length > 0) {
      // Update
      await fetch(`${supabaseUrl}/rest/v1/DnsRecord?id=eq.${existingDb[0].id}`, {
        method: "PATCH",
        headers: { 
          "apikey": supabaseKey, 
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(recordPayload)
      });
    } else {
      // Insert
      await fetch(`${supabaseUrl}/rest/v1/DnsRecord`, {
        method: "POST",
        headers: { 
          "apikey": supabaseKey, 
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          ...recordPayload,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString()
        })
      });
    }

    // 7. Update ApiKey lastUsedAt
    await fetch(`${supabaseUrl}/rest/v1/ApiKey?key=eq.${key}`, {
      method: "PATCH",
      headers: { 
        "apikey": supabaseKey, 
        "Authorization": `Bearer ${supabaseKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lastUsedAt: new Date().toISOString() })
    });

    return new Response(`Success: ${domainInput} updated to ${ip} (${recordType})`, { status: 200 });
  }
};

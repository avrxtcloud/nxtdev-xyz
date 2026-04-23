/**
 * nxtdev.xyz DDNS API Worker
 * 
 * Endpoint: GET https://api.nxtdev.xyz/update?key=...&domain=...&ip=...
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Only handle /update
    if (url.pathname !== "/update") {
      return new Response("nxtdev DDNS API - Usage: /update?key=...&domain=...&ip=...", { status: 404 });
    }

    const key = url.searchParams.get("key");
    const domain = url.searchParams.get("domain");
    const ip = url.searchParams.get("ip");

    if (!key || !domain || !ip) {
      return new Response("Missing parameters (key, domain, ip)", { status: 400 });
    }

    // 1. Verify API Key
    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

    const keyRes = await fetch(`${supabaseUrl}/rest/v1/ApiKey?key=eq.${key}&select=userId`, {
      headers: { "apikey": supabaseKey, "Authorization": `Bearer ${supabaseKey}` }
    });
    
    const keys = await keyRes.json();
    if (!keys || keys.length === 0) {
      return new Response("Invalid API Key", { status: 401 });
    }
    const userId = keys[0].userId;

    // 2. Find Subdomain and verify ownership
    // We check if the provided domain matches a baseFqdn owned by the user
    const subRes = await fetch(`${supabaseUrl}/rest/v1/Subdomain?userId=eq.${userId}&baseFqdn=eq.${domain}&select=id,baseFqdn`, {
      headers: { "apikey": supabaseKey, "Authorization": `Bearer ${supabaseKey}` }
    });
    const subdomains = await subRes.json();
    if (!subdomains || subdomains.length === 0) {
      return new Response("Domain not found or not owned by you. Ensure the domain is exactly as shown in your dashboard.", { status: 404 });
    }
    const subdomain = subdomains[0];

    // 3. Update Cloudflare DNS
    const cfToken = env.CLOUDFLARE_API_TOKEN;
    const cfZoneId = env.CLOUDFLARE_ZONE_ID;

    // Find the A record for this domain
    const recordSearch = await fetch(`https://api.cloudflare.com/client/v4/zones/${cfZoneId}/dns_records?name=${subdomain.baseFqdn}&type=A`, {
      headers: { "Authorization": `Bearer ${cfToken}` }
    });
    const records = await recordSearch.json();
    
    if (!records.success || records.result.length === 0) {
       return new Response("DNS A record for this domain not found in Cloudflare. Please create an A record in the dashboard first.", { status: 404 });
    }

    const recordId = records.result[0].id;

    // Update the A record
    const updateRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${cfZoneId}/dns_records/${recordId}`, {
      method: "PATCH",
      headers: { 
        "Authorization": `Bearer ${cfToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: ip,
        ttl: 120, // Short TTL for DDNS
      })
    });

    const updateResult = await updateRes.json();
    if (updateResult.success) {
      // Update lastUsedAt in DB
      await fetch(`${supabaseUrl}/rest/v1/ApiKey?key=eq.${key}`, {
        method: "PATCH",
        headers: { 
          "apikey": supabaseKey, 
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ lastUsedAt: new Date().toISOString() })
      });

      return new Response(`Successfully updated ${subdomain.baseFqdn} to ${ip}`, { status: 200 });
    } else {
      return new Response(`Cloudflare Error: ${updateResult.errors[0].message}`, { status: 500 });
    }
  }
};

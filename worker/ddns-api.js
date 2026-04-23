/**
 * nxtdev.xyz DDNS API Worker
 * 
 * Endpoint: GET /api/ddns?key=...&label=...&ip=...
 * 
 * Flow:
 * 1. Verify API Key against Supabase
 * 2. Find Subdomain by label + userId
 * 3. Update A/AAAA record in Cloudflare
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");
    const label = url.searchParams.get("label");
    const ip = url.searchParams.get("ip");

    if (!key || !label || !ip) {
      return new Response("Missing parameters (key, label, ip)", { status: 400 });
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

    // 2. Find Subdomain
    const subRes = await fetch(`${supabaseUrl}/rest/v1/Subdomain?userId=eq.${userId}&label=eq.${label}&select=id,baseFqdn`, {
      headers: { "apikey": supabaseKey, "Authorization": `Bearer ${supabaseKey}` }
    });
    const subdomains = await subRes.json();
    if (!subdomains || subdomains.length === 0) {
      return new Response("Subdomain not found or not owned by you", { status: 404 });
    }
    const subdomain = subdomains[0];

    // 3. Update Cloudflare DNS
    const cfToken = env.CLOUDFLARE_API_TOKEN;
    const cfZoneId = env.CLOUDFLARE_ZONE_ID;

    // Find the record ID first (assuming it exists)
    const recordSearch = await fetch(`https://api.cloudflare.com/client/v4/zones/${cfZoneId}/dns_records?name=${subdomain.baseFqdn}&type=A`, {
      headers: { "Authorization": `Bearer ${cfToken}` }
    });
    const records = await recordSearch.json();
    
    if (!records.success || records.result.length === 0) {
       return new Response("DNS Record for subdomain not found in Cloudflare. Please create it manually first.", { status: 404 });
    }

    const recordId = records.result[0].id;

    // Update the record
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

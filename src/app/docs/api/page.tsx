import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Guide - nxtdev.xyz",
  description: "Learn how to integrate with nxtdev.xyz using our developer-friendly APIs.",
};

export default function ApiGuidePage() {
  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white uppercase">API Reference</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl">
          Automate your workflow with our public endpoints. All requests should be made to <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-bold text-blue-600 dark:text-blue-400">https://nxtdev.xyz/api</code>.
        </p>
      </div>

      <div className="grid gap-8">
        <EndpointCard
          method="GET"
          path="/subdomain-availability"
          description="Check if a specific subdomain label is available to be claimed."
          params={[
            { name: "label", type: "string", description: "The label to check (e.g. 'project-x')" }
          ]}
          example="/api/subdomain-availability?label=my-app"
        />

        <EndpointCard
          method="GET"
          path="/propagation"
          description="Check the current DNS propagation status of a FQDN."
          params={[
            { name: "fqdn", type: "string", description: "The full domain name (e.g. 'app.nxtdev.xyz')" }
          ]}
          example="/api/propagation?fqdn=test.nxtdev.xyz"
        />

        <EndpointCard
          method="POST"
          path="/domain-verify"
          description="Verify ownership of a domain using DNS challenges."
          params={[
            { name: "domain", type: "string", description: "Domain name to verify" },
            { name: "token", type: "string", description: "Verification token from dashboard" }
          ]}
        />
        
        <EndpointCard
          method="GET"
          path="/health"
          description="Check the system status and connectivity."
        />

        <EndpointCard
          method="GET"
          path="/update"
          baseUrl="https://api.nxtdev.xyz"
          description="Update your subdomain's A record dynamically (Dynamic DNS)."
          params={[
            { name: "key", type: "string", description: "Your API Key (nxt_...)" },
            { name: "domain", type: "string", description: "The full subdomain (e.g. 'home.nxtdev.xyz')" },
            { name: "ip", type: "string", description: "The new IP address to point to" }
          ]}
          example="https://api.nxtdev.xyz/update?key=nxt_key&domain=home.nxtdev.xyz&ip=1.1.1.1"
        />
      </div>
    </div>
  );
}

function EndpointCard({ method, path, description, params, example, baseUrl }: {
  method: "GET" | "POST";
  path: string;
  description: string;
  params?: { name: string; type: string; description: string }[];
  example?: string;
  baseUrl?: string;
}) {
  return (
    <Card className="p-8 rounded-[2.5rem] border-zinc-100 dark:border-zinc-800 overflow-hidden relative">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
        <div className="space-y-6 flex-1">
          <div className="flex items-center gap-3">
            <Badge tone={method === "GET" ? "ok" : "warn"} className="rounded-lg px-3 py-1 font-black text-[10px] uppercase tracking-widest">
              {method}
            </Badge>
            <div className="flex flex-col">
              {baseUrl && <span className="text-[10px] font-mono text-zinc-500">{baseUrl}</span>}
              <code className="text-xl font-black text-zinc-900 dark:text-white font-mono">{path}</code>
            </div>
          </div>
          
          <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-xl">
            {description}
          </p>

          {params && (
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Parameters</h4>
              <div className="grid gap-2">
                {params.map(p => (
                  <div key={p.name} className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                    <code className="text-xs font-bold text-blue-600 dark:text-blue-400">{p.name}</code>
                    <span className="text-xs text-zinc-400 font-mono">[{p.type}]</span>
                    <span className="text-xs font-medium text-zinc-500">{p.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {example && (
          <div className="w-full md:w-80 shrink-0 space-y-3">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Example</h4>
             <div className="bg-zinc-900 text-zinc-100 p-4 rounded-2xl font-mono text-xs break-all border border-zinc-800/50 shadow-2xl">
               <span className="text-zinc-500">$</span> curl {example}
             </div>
          </div>
        )}
      </div>
    </Card>
  );
}

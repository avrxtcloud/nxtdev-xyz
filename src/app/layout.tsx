import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const rootDomain =
  (process.env.ROOT_DOMAIN ?? "nxtdev.xyz")
    .trim()
    .split(/\s+/)[0]
    ?.replace(/\.+$/, "") || "nxtdev.xyz";

const appUrl =
  (process.env.NEXT_PUBLIC_APP_URL ?? "").startsWith("http")
    ? (process.env.NEXT_PUBLIC_APP_URL as string)
    : `https://${rootDomain}`;

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Claim up to 2 free subdomains and manage DNS records in seconds. Built on Cloudflare with safety checks.";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: rootDomain,
    template: `%s | ${rootDomain}`,
  },
  description,
  applicationName: rootDomain,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "developer subdomains",
    "free subdomain",
    "dns",
    "cloudflare dns",
    "subdomain",
    "cname",
    "a record",
    "mx",
    "txt",
    "srv",
    "ns delegation",
  ],
  appleWebApp: {
    capable: true,
    title: rootDomain,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: rootDomain,
    siteName: rootDomain,
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: rootDomain,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: rootDomain,
    description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0f19",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <Nav />
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(14,165,233,0.12),transparent_50%),radial-gradient(900px_circle_at_50%_100%,rgba(168,85,247,0.12),transparent_55%)] dark:bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(99,102,241,0.16),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(14,165,233,0.10),transparent_50%),radial-gradient(900px_circle_at_50%_100%,rgba(168,85,247,0.10),transparent_55%)]" />
          <div className="min-h-[calc(100vh-3.5rem)] text-zinc-900 dark:text-zinc-50 animate-[fade-in_420ms_ease-out]">
            {children}
            <Footer />
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}


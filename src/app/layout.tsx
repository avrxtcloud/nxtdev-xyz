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

const clerkAppearance = {
  variables: {
    colorPrimary: "#18181b",
    colorBackground: "#ffffff",
    colorText: "#18181b",
    colorTextSecondary: "#52525b",
    colorInputBackground: "#ffffff",
    colorInputText: "#18181b",
    borderRadius: "0px",
    fontFamily: "var(--font-space-grotesk), ui-sans-serif, system-ui",
    fontFamilyButtons: "var(--font-space-grotesk), ui-sans-serif, system-ui",
  },
  elements: {
    modalBackdrop: "bg-black/70 backdrop-blur-none",
    modalContent: "rounded-none border-2 border-zinc-950 bg-amber-200 p-2 shadow-[10px_10px_0_#18181b]",
    card: "rounded-none border-2 border-zinc-950 bg-white shadow-none",
    cardBox: "rounded-none border-2 border-zinc-950 bg-white shadow-[8px_8px_0_#18181b]",
    headerTitle: "text-2xl font-black tracking-tight text-zinc-950",
    headerSubtitle: "font-bold text-zinc-500",
    formFieldLabel: "text-xs font-black uppercase tracking-widest text-zinc-700",
    formFieldInput: "rounded-none border-2 border-zinc-950 bg-white font-bold text-zinc-950 shadow-none focus:border-zinc-950 focus:ring-2 focus:ring-amber-300",
    formFieldInputShowPasswordButton: "text-zinc-950",
    formButtonPrimary: "rounded-none border-2 border-zinc-950 bg-zinc-950 font-black text-white shadow-[4px_4px_0_#facc15] hover:bg-zinc-800",
    socialButtonsBlockButton: "rounded-none border-2 border-zinc-950 bg-white font-black text-zinc-950 shadow-[4px_4px_0_#22d3ee] hover:bg-amber-50",
    socialButtonsBlockButtonText: "font-black text-zinc-950",
    dividerLine: "bg-zinc-950/20",
    dividerText: "font-black uppercase tracking-widest text-zinc-500",
    footer: "rounded-none border-t-2 border-zinc-950 bg-zinc-50",
    footerActionText: "font-bold text-zinc-600",
    footerActionLink: "font-black text-zinc-950 underline decoration-cyan-400 decoration-2 underline-offset-4",
    identityPreviewEditButton: "font-black text-zinc-950 underline decoration-cyan-400 decoration-2 underline-offset-4",
    formResendCodeLink: "font-black text-zinc-950 underline decoration-cyan-400 decoration-2 underline-offset-4",
    otpCodeFieldInput: "rounded-none border-2 border-zinc-950 font-black",
    navbar: "font-black",
    userButtonPopoverCard: "rounded-none border-2 border-zinc-950 bg-white shadow-[8px_8px_0_#18181b]",
    userButtonPopoverActionButton: "rounded-none font-black hover:bg-amber-100",
    profileSectionPrimaryButton: "rounded-none border-2 border-zinc-950 bg-zinc-950 font-black text-white shadow-[4px_4px_0_#facc15]",
    formFieldAction: "font-black text-zinc-950 underline decoration-cyan-400 decoration-2 underline-offset-4",
  },
};

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
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
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
        <ClerkProvider appearance={clerkAppearance}>
          <Nav />
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(135deg,rgba(250,204,21,0.16),transparent_32%),linear-gradient(315deg,rgba(34,211,238,0.14),transparent_38%)] dark:bg-[linear-gradient(135deg,rgba(250,204,21,0.08),transparent_32%),linear-gradient(315deg,rgba(34,211,238,0.08),transparent_38%)]" />
          <div className="min-h-[calc(100vh-4rem)] text-zinc-900 dark:text-zinc-50 animate-[fade-in_420ms_ease-out]">
            {children}
            <Footer />
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}

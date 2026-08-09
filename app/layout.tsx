import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const title = "Trine — Product, AI, Operations, UX & Creative Work | Steven Adkins";
  const description = "Trine is Steven Adkins’ professional portfolio for product building, AI-assisted workflows, operations, customer experience, UX, content, and creative execution.";
  return {
    metadataBase: base,
    title,
    description,
    applicationName: "Trine",
    keywords: ["product builder", "AI product development", "product operations", "UX/UI design", "customer experience", "B2B partnerships", "creative direction", "bilingual professional"],
    icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon.png", type: "image/png", sizes: "512x512" }], shortcut: "/favicon.svg", apple: "/icon.png" },
    openGraph: { title, description, type: "website", locale: "en_US", siteName: "Trine", images: [{ url: new URL("/og-trinefield-v7.png", base).toString(), width: 1536, height: 1024, alt: "Trine — Ideas into useful experiences." }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og-trinefield-v7.png", base).toString()] },
    alternates: { canonical: base },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

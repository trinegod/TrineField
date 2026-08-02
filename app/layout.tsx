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
  const title = "Trine — Cross-Border Product, Market & Creative Operations | Steven Adkins";
  const description = "Trine is Steven Adkins’ independent cross-border platform connecting China, the United States, and Latin America through product, market, operations, and creative work.";
  return {
    metadataBase: base,
    title,
    description,
    applicationName: "Trine",
    keywords: ["cross-border business", "China", "United States", "Latin America", "B2B", "product operations", "creative direction"],
    icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
    openGraph: { title, description, type: "website", locale: "en_US", siteName: "Trine", images: [{ url: new URL("/og.png", base).toString(), width: 1536, height: 1024, alt: "Trine — Cross-Border Product, Market & Creative Operations by Steven Adkins" }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og.png", base).toString()] },
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

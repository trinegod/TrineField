import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
  const title = "Steven — Cross-Border Product, Market & Creative Operations";
  const description = "Independent cross-border collaboration across China, the United States, and Latin America—spanning products, markets, operations, and creative direction.";
  return {
    metadataBase: base,
    title,
    description,
    applicationName: "Steven",
    keywords: ["cross-border business", "China", "United States", "Latin America", "B2B", "product operations", "creative direction"],
    icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
    openGraph: { title, description, type: "website", locale: "en_US", siteName: "Steven", images: [{ url: new URL("/og.png", base).toString(), width: 1536, height: 1024, alt: "Steven — Cross-Border Product, Market & Creative Operations" }] },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

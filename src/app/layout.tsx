import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/components/cart/cart-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Masalay Wala — Organic Spices",
    template: "%s · Masalay Wala",
  },
  description:
    "An organic spices storefront built with Next.js. Shop spices, special masalay, seasonings, tea & herbs, dry fruits, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-background text-foreground antialiased`}
      >
        <CartProvider>
          <SiteHeader />
          <main className="min-h-[calc(100dvh-1px)]">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}

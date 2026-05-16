import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/components/cart/cart-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

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

function SetupRequiredInner() {
  return (
    <div className="flex min-h-dvh items-center justify-center p-6">
      <div className="absolute right-4 top-4 md:right-6 md:top-6">
        <ThemeToggle />
      </div>
      <div className="max-w-md rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-800 dark:bg-amber-950/30">
        <h1 className="text-xl font-semibold text-amber-900 dark:text-amber-100">
          Configuration required
        </h1>
        <p className="mt-3 text-sm text-amber-800 dark:text-amber-200">
          <strong>DATABASE_URL</strong> is not set. Add it in Vercel to fix this:
        </p>
        <ol className="mt-4 list-inside list-decimal space-y-2 text-left text-sm text-amber-800 dark:text-amber-200">
          <li>
            Open your project on{" "}
            <a
              href="https://vercel.com/dashboard"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              vercel.com
            </a>
          </li>
          <li>
            Go to <strong>Settings → Environment Variables</strong>
          </li>
          <li>
            Add <strong>DATABASE_URL</strong> with your PostgreSQL connection string
          </li>
          <li>Redeploy the project</li>
        </ol>
        <p className="mt-4 text-xs text-amber-700 dark:text-amber-300">
          Use a hosted Postgres (e.g. Neon, Supabase, Vercel Postgres). The database must be
          reachable from the internet.
        </p>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClassName = `${geistSans.variable} ${geistMono.variable} min-h-dvh bg-background text-foreground antialiased`;
  const missingDatabaseUrl =
    typeof process.env.DATABASE_URL !== "string" || !process.env.DATABASE_URL.trim();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bodyClassName}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {missingDatabaseUrl ? (
            <SetupRequiredInner />
          ) : (
            <CartProvider>
              <SiteHeader />
              <main className="min-h-[calc(100dvh-1px)]">{children}</main>
              <SiteFooter />
            </CartProvider>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}

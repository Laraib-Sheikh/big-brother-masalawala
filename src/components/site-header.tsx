import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { MobileMenu } from "@/components/mobile-menu";
import { Input } from "@/components/ui/input";
import { getCustomerSessionFromCookies } from "@/lib/customer-auth";

export async function SiteHeader() {
  const customer = await getCustomerSessionFromCookies();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="hidden border-b border-border bg-gradient-to-r from-brand-muted/80 to-amber-50/50 py-2 text-sm md:block dark:from-brand-muted/50 dark:to-amber-950/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <div className="text-muted-foreground">
            Order Online · Call Us{" "}
            <span className="font-semibold text-brand">+92-335-0563210</span>
          </div>
          <div className="flex items-center gap-5 text-muted-foreground">
            <span>Categories</span>
            <span className="text-brand hover:underline">info@masalaywala.com</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
        <div className="md:hidden">
          <MobileMenu />
        </div>

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo_masalawala.png"
            alt="Masalay Wala"
            width={90}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 pl-4 text-sm font-medium md:flex">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-brand transition-colors">
            Shop
          </Link>
          <Link href="/#best-sellers" className="hover:text-brand transition-colors">
            Best Selling
          </Link>
          <Link href="/#blog" className="hover:text-brand transition-colors">
            Contact us
          </Link>
          <Link href="/#contact" className="hover:text-brand transition-colors">
            Newsletter
          </Link>
        </nav>

        <div className="ml-auto hidden max-w-sm flex-1 md:block">
          <form action="/products" className="relative">
            <Input
              name="q"
              placeholder="I'm looking for…"
              className="h-10"
            />
          </form>
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0 md:gap-2">
          {customer ? (
            <Link
              href="/account"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Sign in"
            >
              <User className="h-5 w-5" />
            </Link>
          )}
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}


import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { MobileMenu } from "@/components/mobile-menu";
import { Input } from "@/components/ui/input";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="hidden border-b border-border py-2 text-sm md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <div className="text-muted-foreground">
            Order Online · Call Us{" "}
            <span className="text-foreground">+92-335-0563210</span>
          </div>
          <div className="flex items-center gap-5 text-muted-foreground">
            <span>Categories</span>
            <span>info@masalaywala.com</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <div className="md:hidden">
          <MobileMenu />
        </div>

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Masalay Wala"
            width={140}
            height={32}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 pl-4 text-sm font-medium md:flex">
          <Link href="/" className="hover:text-muted-foreground">
            Home
          </Link>
          <Link href="/products" className="hover:text-muted-foreground">
            Shop
          </Link>
          <Link href="/#best-sellers" className="hover:text-muted-foreground">
            Best Selling
          </Link>
          <Link href="/#blog" className="hover:text-muted-foreground">
            Contact us
          </Link>
          <Link href="/#contact" className="hover:text-muted-foreground">
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
          <Link
            href="/account"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}


import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-gradient-to-b from-muted/60 to-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/images/logo_masalawala.png" alt="Masalay Wala" width={140} height={32} />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Taste the freshness — spice up your culinary journey with Masalay
              Wala.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              <div>info@masalaywala.com</div>
              <div>+92-335-0563210</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-brand">Useful Links</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link className="hover:text-foreground" href="/account">
                  My Account
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/products">
                  Shop
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/#best-sellers">
                  Best Selling
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/#contact">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-brand">Information</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link className="hover:text-foreground" href="/shipping">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-brand">Newsletter</div>
            <p className="mt-3 text-sm text-muted-foreground">
              Subscribe to receive updates on new arrivals and promotions.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                placeholder="Enter your email"
                type="email"
                required
              />
              <button className="h-11 rounded-full bg-brand px-5 text-sm font-medium text-brand-foreground hover:opacity-90">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Masalay Wala. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-border px-3 py-1">
              PKR Rs.
            </span>
            <span className="rounded-full border border-border px-3 py-1">
              English
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}


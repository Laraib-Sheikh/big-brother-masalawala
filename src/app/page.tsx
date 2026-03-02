import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { BestSellers } from "@/components/home/best-sellers";
import { ProductCard } from "@/components/product-card";
import { ButtonLink } from "@/components/ui/button";
import { testimonials } from "@/lib/content";
import { categories } from "@/lib/catalog";
import { listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await listProducts();
  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-muted/70 to-background">
        <Container className="py-10 md:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-muted-foreground">
                Trending Search{" "}
                <span className="text-foreground">
                  Chinese Salt · Garam Masala · White Zeera
                </span>
              </div>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Taste the freshness — spice up your kitchen.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                Shop organic spices, special masalay, seasonings, tea & herbs, dry
                fruits, pickles, and more. Freshly packed and delivered fast.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/products" variant="primary" size="lg">
                  Shop now <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href="/products?tag=special-masalay"
                  variant="outline"
                  size="lg"
                >
                  Special masalay
                </ButtonLink>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <Link
                href="/products?tag=spices-powder"
                className="group rounded-3xl border border-border bg-background p-5 hover:bg-muted"
              >
                <div className="text-xs font-semibold text-muted-foreground">
                  Spices
                </div>
                <div className="mt-2 text-lg font-semibold">Spices Powder</div>
                <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-muted">
                  <Image
                    src="/hero/hero-1.svg"
                    alt="Spices powder"
                    width={640}
                    height={480}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>
              <Link
                href="/products?tag=special-masalay"
                className="group rounded-3xl border border-border bg-background p-5 hover:bg-muted"
              >
                <div className="text-xs font-semibold text-muted-foreground">
                  Special
                </div>
                <div className="mt-2 text-lg font-semibold">Special Masalay</div>
                <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-muted">
                  <Image
                    src="/hero/hero-2.svg"
                    alt="Special masalay"
                    width={640}
                    height={480}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>
              <Link
                href="/products?tag=seasoning"
                className="group rounded-3xl border border-border bg-background p-5 hover:bg-muted"
              >
                <div className="text-xs font-semibold text-muted-foreground">
                  Hot selling
                </div>
                <div className="mt-2 text-lg font-semibold">
                  Seasonings
                </div>
                <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-muted">
                  <Image
                    src="/hero/hero-3.svg"
                    alt="Seasonings"
                    width={640}
                    height={480}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-5 hover:bg-muted"
              >
                <div className="overflow-hidden rounded-2xl border border-border bg-muted">
                  <Image
                    src={c.imageSrc}
                    alt={c.title}
                    width={84}
                    height={84}
                    className="h-[84px] w-[84px] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{c.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    ({c.count} Items)
                  </div>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-foreground" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="best-sellers" className="border-t border-border py-12 md:py-16">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-sm font-semibold text-muted-foreground">
                Best Selling
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Popular products customers keep reordering
              </h2>
            </div>
            <ButtonLink href="/products" variant="ghost" className="hidden md:inline-flex">
              View all <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <BestSellers products={products} />
        </Container>
      </section>

      <section className="border-t border-border py-12 md:py-16">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-sm font-semibold text-muted-foreground">
                Trending Now
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Add in your cart to avail max discount today!
              </h2>
            </div>
            <ButtonLink href="/products" variant="outline" className="hidden md:inline-flex">
              View all <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-12 md:py-16">
        <Container>
          <div className="grid gap-6 rounded-3xl border border-border bg-muted p-6 md:grid-cols-2 md:p-10">
            <div>
              <div className="text-sm font-semibold text-muted-foreground">
                Deal of the month
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Buy at Rs 899 — limited time only
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Stock up on best-selling mixes and daily spices. Great for gifting and
                everyday cooking.
              </p>
              <div className="mt-6 flex gap-3">
                <ButtonLink href="/products/special-biryani-masala" variant="primary">
                  Shop deal
                </ButtonLink>
                <ButtonLink href="/products" variant="outline">
                  Browse collection
                </ButtonLink>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border bg-background">
              <Image
                src="/featured/featured.svg"
                alt="Featured product"
                width={900}
                height={650}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="text-sm font-semibold">Free Shipping</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Enjoy free nationwide shipping on the purchase of Rs. 899/-.
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="text-sm font-semibold">Free Returns</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Free returns within 30 days (items must be in undamaged condition).
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="text-sm font-semibold">Support Online</div>
              <div className="mt-2 text-sm text-muted-foreground">
                We support customers 24/7. Send WhatsApp and we’ll assist you
                immediately.
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-12 md:py-16">
        <Container>
          <div className="text-center">
            <div className="text-sm font-semibold text-muted-foreground">
              Trusted by thousands of satisfied customers
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              What people say
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-3xl border border-border bg-card p-6"
              >
                <p className="text-sm leading-6 text-muted-foreground">{t.quote}</p>
                <div className="mt-5 text-sm font-semibold">{t.name}</div>
                {t.meta ? (
                  <div className="mt-1 text-xs text-muted-foreground">{t.meta}</div>
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="blog" className="border-t border-border py-12 md:py-16">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-sm font-semibold text-muted-foreground">
                Customer Say!
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Customers love our products
              </h2>
            </div>
            <ButtonLink href="/blog" variant="outline" className="hidden md:inline-flex">
              View all <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <div
                key={t.name}
                className="rounded-3xl border border-border bg-card p-6"
              >
                <p className="text-sm leading-6 text-muted-foreground">{t.quote}</p>
                <div className="mt-5 text-sm font-semibold">{t.name}</div>
                {t.meta ? (
                  <div className="mt-1 text-xs text-muted-foreground">{t.meta}</div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-border bg-muted p-6 md:p-8">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="text-sm font-semibold">Sign Up to Newsletter</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Sign up for 10% off your first purchase and updates on sales and offers.
                </div>
              </div>
              <form className="flex w-full gap-2 md:w-auto md:min-w-[420px]">
                <input
                  className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  placeholder="Email*"
                  type="email"
                  required
                />
                <button className="h-11 rounded-full bg-brand px-5 text-sm font-medium text-brand-foreground hover:opacity-90">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

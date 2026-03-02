import Link from "next/link";
import { Container } from "@/components/container";
import { ProductCard } from "@/components/product-card";
import { type ProductTag } from "@/lib/catalog";
import { listProducts } from "@/lib/products";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const sp = searchParams ?? {};
  const tag = (typeof sp.tag === "string" ? sp.tag : undefined) as
    | ProductTag
    | undefined;
  const q = typeof sp.q === "string" ? sp.q : undefined;

  const filtered = await listProducts({ tag, q });

  return (
    <Container className="py-10 md:py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-sm font-semibold text-muted-foreground">
            Shop
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            All products
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Browse the full collection. Filter by category and add items to your cart.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link
            className={`rounded-full border px-4 py-2 ${
              !tag ? "bg-brand text-brand-foreground" : "hover:bg-muted"
            }`}
            href="/products"
          >
            All
          </Link>
          <Link
            className={`rounded-full border px-4 py-2 ${
              tag === "spices-powder"
                ? "bg-brand text-brand-foreground"
                : "hover:bg-muted"
            }`}
            href="/products?tag=spices-powder"
          >
            Spices
          </Link>
          <Link
            className={`rounded-full border px-4 py-2 ${
              tag === "special-masalay"
                ? "bg-brand text-brand-foreground"
                : "hover:bg-muted"
            }`}
            href="/products?tag=special-masalay"
          >
            Special Masalay
          </Link>
          <Link
            className={`rounded-full border px-4 py-2 ${
              tag === "seasoning" ? "bg-brand text-brand-foreground" : "hover:bg-muted"
            }`}
            href="/products?tag=seasoning"
          >
            Seasoning
          </Link>
        </div>
      </div>

      {q ? (
        <div className="mt-6 text-sm text-muted-foreground">
          Showing results for <span className="font-semibold text-foreground">{q}</span>
          .
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((p: (typeof filtered)[number]) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-border bg-muted p-8 text-center">
          <div className="text-sm font-semibold">No products found</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Try clearing your search or selecting a different category.
          </div>
          <div className="mt-5">
            <Link className="underline" href="/products">
              View all products
            </Link>
          </div>
        </div>
      ) : null}
    </Container>
  );
}


import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { Container } from "@/components/container";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { getProductBySlug } from "@/lib/products";
import { formatMoney } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <Container className="py-10 md:py-12">
      <div className="text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/products" className="hover:underline">
          Shop
        </Link>{" "}
        / <span className="text-foreground">{product.title}</span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-border bg-muted">
          <Image
            src={product.imageSrc}
            alt={product.title}
            width={1200}
            height={1200}
            className="aspect-square w-full object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {product.title}
          </h1>
          {product.altTitle ? (
            <div className="mt-2 text-sm text-muted-foreground">
              {product.altTitle}
            </div>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-foreground" />
              <span className="font-semibold text-foreground">
                {product.rating.toFixed(1)}
              </span>
            </span>
            <span>({product.reviewCount} reviews)</span>
            {product.isNew ? (
              <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                New
              </span>
            ) : null}
            {product.isBestSeller ? (
              <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                Best Seller
              </span>
            ) : null}
          </div>

          <div className="mt-6 flex items-end gap-3">
            <div className="text-2xl font-semibold">
              {formatMoney(product.priceCents)}
            </div>
            {product.compareAtPriceCents ? (
              <div className="text-sm text-muted-foreground line-through">
                {formatMoney(product.compareAtPriceCents)}
              </div>
            ) : null}
          </div>

          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            {product.shortDescription}
          </p>

          <div className="mt-8 max-w-sm">
            <AddToCartButton
              product={{
                productId: product.id,
                slug: product.slug,
                title: product.title,
                imageSrc: product.imageSrc,
                priceCents: product.priceCents,
              }}
              disabled={product.isSoldOut}
            />
            <div className="mt-3 text-xs text-muted-foreground">
              {product.isSoldOut
                ? "This item is currently sold out."
                : "Free returns within 30 days. Ships in 1–2 business days."}
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-border bg-card p-6">
            <div className="text-sm font-semibold">Details</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Freshly packed for bold aroma and taste</li>
              <li>Ideal for daily cooking, snacks, and marinades</li>
              <li>Store in a cool, dry place after opening</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}


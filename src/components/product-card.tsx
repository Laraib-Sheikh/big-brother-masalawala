import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group rounded-3xl border border-border bg-card p-3 shadow-sm hover:shadow-md hover:border-brand/20 transition-all">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-muted">
          <Image
            src={product.imageSrc}
            alt={product.title}
            width={520}
            height={520}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          {product.compareAtPriceCents ? (
            <div className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
              Save{" "}
              {Math.round(
                (1 - product.priceCents / product.compareAtPriceCents) * 100,
              )}
              %
            </div>
          ) : null}
          {product.isSoldOut ? (
            <div className="absolute right-3 top-3 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold">
              Sold out
            </div>
          ) : null}
        </div>
      </Link>

      <div className="px-1 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${product.slug}`}
              className="line-clamp-1 text-sm font-semibold hover:underline"
            >
              {product.title}
            </Link>
            {product.altTitle ? (
              <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                {product.altTitle}
              </div>
            ) : null}
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-current" />
                {product.rating.toFixed(1)}
              </span>
              <span>({product.reviewCount})</span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-sm font-semibold">
              {formatMoney(product.priceCents)}
            </div>
            {product.compareAtPriceCents ? (
              <div className="text-xs text-muted-foreground line-through">
                {formatMoney(product.compareAtPriceCents)}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-4">
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
        </div>
      </div>
    </div>
  );
}


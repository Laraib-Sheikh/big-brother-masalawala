"use client";

import * as React from "react";
import { ProductCard } from "@/components/product-card";
import { type Product, type ProductTag } from "@/lib/catalog";
import { cn } from "@/lib/cn";

const tabs: Array<{ tag: ProductTag; label: string }> = [
  { tag: "spices-powder", label: "Spices Powder" },
  { tag: "special-masalay", label: "Special Masalay" },
  { tag: "seasoning", label: "Seasoning" },
];

export function BestSellers({ products }: { products: Product[] }) {
  const [tag, setTag] = React.useState<ProductTag>("special-masalay");

  const items = React.useMemo(() => {
    const base = products.filter((p) => p.tags.includes(tag));
    const best = base.filter((p) => p.isBestSeller);
    return (best.length ? best : base).slice(0, 8);
  }, [products, tag]);

  return (
    <div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {tabs.map((t) => (
          <button
            key={t.tag}
            onClick={() => setTag(t.tag)}
            className={cn(
              "rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors",
              tag === t.tag ? "bg-brand text-brand-foreground" : "hover:bg-muted",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p: Product) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}


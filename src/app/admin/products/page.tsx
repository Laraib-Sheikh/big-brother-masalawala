import Link from "next/link";
import type { Product } from "@prisma/client";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/money";
import { parseTags } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Add and manage products shown in the store.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90"
        >
          Add product
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="grid grid-cols-12 gap-2 border-b border-border bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground">
          <div className="col-span-4">Title</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-4">Tags</div>
          <div className="col-span-2 text-right">Status</div>
        </div>

        <div className="divide-y divide-border">
          {products.map((p: Product) => {
            const tags = parseTags(p.tags).join(", ");
            return (
              <div
                key={p.id}
                className="grid grid-cols-12 gap-2 px-4 py-4 text-sm"
              >
                <div className="col-span-4">
                  <div className="font-semibold">{p.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    /products/{p.slug}
                  </div>
                </div>
                <div className="col-span-2 font-semibold">
                  {formatMoney(p.priceCents)}
                </div>
                <div className="col-span-4 text-xs text-muted-foreground">
                  {tags || "—"}
                </div>
                <div className="col-span-2 text-right text-xs text-muted-foreground">
                  {p.isSoldOut ? "Sold out" : p.isBestSeller ? "Best seller" : "Active"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


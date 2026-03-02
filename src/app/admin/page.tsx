import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const productCount = await prisma.product.count();

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage products shown on the storefront.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="text-sm font-semibold">Products</div>
          <div className="mt-2 text-3xl font-semibold">{productCount}</div>
          <div className="mt-4 flex gap-3">
            <Link
              href="/admin/products"
              className="rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-muted"
            >
              View products
            </Link>
            <Link
              href="/admin/products/new"
              className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90"
            >
              Add product
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-muted p-6">
          <div className="text-sm font-semibold">Tip</div>
          <p className="mt-2 text-sm text-muted-foreground">
            After adding a product, it appears immediately on the Home + Shop pages.
          </p>
        </div>
      </div>
    </div>
  );
}


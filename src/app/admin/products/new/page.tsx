import { type ProductTag } from "@/lib/catalog";

const TAGS: Array<{ tag: ProductTag; label: string }> = [
  { tag: "spices-whole", label: "Spices Whole" },
  { tag: "spices-powder", label: "Spices Powder" },
  { tag: "special-masalay", label: "Special Masalay" },
  { tag: "seasoning", label: "Seasoning" },
  { tag: "tea-herbs", label: "Tea & Herbs" },
  { tag: "dry-fruits", label: "Dry Fruits" },
  { tag: "pickle", label: "Pickle" },
  { tag: "kids-treat", label: "Kids Treat" },
];

export default function AdminNewProductPage({
  searchParams,
}: {
  searchParams?: { error?: string; field?: string };
}) {
  const error = searchParams?.error;
  const field = searchParams?.field;
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Add product</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Create a new product and publish it to the store.
      </p>

      {error ? (
        <div className="mt-6 rounded-3xl border border-border bg-muted p-5 text-sm">
          <div className="font-semibold">
            {error === "invalid_price" ? "Invalid price" : "Invalid input"}
          </div>
          <div className="mt-1 text-muted-foreground">
            {error === "invalid_price"
              ? "Please enter a numeric price like 95 or 95.50."
              : field === "shortDescription"
                ? "Short description is too short (minimum 10 characters)."
                : "Please check the form fields and try again."}
          </div>
        </div>
      ) : null}

      <form
        className="mt-8 space-y-5 rounded-3xl border border-border bg-card p-6"
        action="/api/admin/products"
        method="post"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <input
              className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              name="title"
              placeholder="Special Karahi Gosht Masala"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Urdu name (optional)</label>
            <input
              className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              name="altTitle"
              placeholder="کراہی گوشت مصالحہ"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Short description</label>
            <textarea
              className="mt-2 min-h-[110px] w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              name="shortDescription"
              placeholder="Bold restaurant-style flavor for karahi and curries."
              minLength={10}
              maxLength={400}
              required
            />
            <div className="mt-2 text-xs text-muted-foreground">
              Minimum 10 characters.
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Price (Rs.)</label>
            <input
              className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              name="priceRs"
              placeholder="95"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Compare at (Rs.)</label>
            <input
              className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              name="compareAtRs"
              placeholder="105"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">
              Image path (from `public/`)
            </label>
            <input
              className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              name="imageSrc"
              placeholder="/products/your-product.svg"
              required
            />
            <div className="mt-2 text-xs text-muted-foreground">
              Must start with a leading slash. Example: `/products/your-product.svg`.
              (If you type `categories/gift.svg`, use `/categories/gift.svg` instead.)
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Tags</label>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {TAGS.map((t: (typeof TAGS)[number]) => (
                <label
                  key={t.tag}
                  className="flex items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm hover:bg-muted"
                >
                  <input type="checkbox" name="tags" value={t.tag} />
                  <span>{t.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 grid gap-2 sm:grid-cols-3">
            <label className="flex items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm hover:bg-muted">
              <input type="checkbox" name="isBestSeller" value="1" />
              <span>Best seller</span>
            </label>
            <label className="flex items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm hover:bg-muted">
              <input type="checkbox" name="isNew" value="1" defaultChecked />
              <span>New</span>
            </label>
            <label className="flex items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm hover:bg-muted">
              <input type="checkbox" name="isSoldOut" value="1" />
              <span>Sold out</span>
            </label>
          </div>
        </div>

        <button className="h-11 w-full rounded-2xl bg-brand text-sm font-semibold text-brand-foreground hover:opacity-90">
          Create product
        </button>
      </form>
    </div>
  );
}


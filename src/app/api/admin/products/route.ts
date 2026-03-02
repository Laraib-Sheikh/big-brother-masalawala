import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/admin-auth";
import { createProduct } from "@/lib/products";
import { slugify } from "@/lib/slug";
import type { ProductTag } from "@/lib/catalog";

const ALLOWED_TAGS: readonly ProductTag[] = [
  "spices-whole",
  "spices-powder",
  "special-masalay",
  "seasoning",
  "kids-treat",
  "tea-herbs",
  "dry-fruits",
  "pickle",
];

const CreateProductSchema = z.object({
  title: z.string().min(2).max(120),
  altTitle: z.string().max(120).optional().or(z.literal("")),
  shortDescription: z.string().min(10).max(400),
  priceRs: z.string().min(1),
  compareAtRs: z.string().optional().or(z.literal("")),
  imageSrc: z.string().min(2),
  tags: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((v) => (v ? (Array.isArray(v) ? v : [v]) : [])),
  isSoldOut: z.string().optional(),
  isBestSeller: z.string().optional(),
  isNew: z.string().optional(),
});

function parseRsToCents(value: string) {
  const n = Number(String(value).replace(/[,\s]/g, ""));
  if (!Number.isFinite(n)) return null;
  return Math.round(n * 100);
}

async function createWithUniqueSlug(input: Parameters<typeof createProduct>[0]) {
  const base = input.slug;
  for (let i = 0; i < 5; i++) {
    const suffix = i === 0 ? "" : `-${i + 1}`;
    try {
      return await createProduct({ ...input, slug: `${base}${suffix}` });
    } catch (e) {
      // Prisma unique constraint error is typically P2002
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        continue;
      }
      throw e;
    }
  }
  return await createProduct({ ...input, slug: `${base}-${Date.now()}` });
}

export async function POST(req: Request) {
  try {
    await requireAdmin();

    const form = await req.formData();
    const raw = Object.fromEntries(form.entries());
    const parsed = CreateProductSchema.safeParse(raw);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      const field = Object.keys(flat.fieldErrors)[0] ?? "unknown";
      const url = new URL("/admin/products/new", req.url);
      url.searchParams.set("error", "invalid");
      url.searchParams.set("field", field);
      return NextResponse.redirect(url);
    }

    const priceCents = parseRsToCents(parsed.data.priceRs);
    if (priceCents === null) {
      const url = new URL("/admin/products/new", req.url);
      url.searchParams.set("error", "invalid_price");
      return NextResponse.redirect(url);
    }

    const compareAtCents = parsed.data.compareAtRs
      ? parseRsToCents(parsed.data.compareAtRs)
      : undefined;

    const tags = (parsed.data.tags as string[])
      .map((t) => t.trim())
      .filter((t) => (ALLOWED_TAGS as readonly string[]).includes(t)) as ProductTag[];

    const created = await createWithUniqueSlug({
      slug: slugify(parsed.data.title),
      title: parsed.data.title,
      altTitle: parsed.data.altTitle ? parsed.data.altTitle : undefined,
      shortDescription: parsed.data.shortDescription,
      priceCents,
      compareAtPriceCents: compareAtCents ?? undefined,
      tags: tags.length ? tags : ["seasoning"],
      imageSrc: parsed.data.imageSrc,
      isSoldOut: Boolean(parsed.data.isSoldOut),
      isBestSeller: Boolean(parsed.data.isBestSeller),
      isNew: parsed.data.isNew ? true : false,
    });

    return NextResponse.redirect(new URL(`/products/${created.slug}`, req.url));
  } catch (e) {
    if ((e as Error)?.message === "ADMIN_REQUIRED") {
      return NextResponse.redirect(new URL("/admin/login?error=unauthorized", req.url));
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


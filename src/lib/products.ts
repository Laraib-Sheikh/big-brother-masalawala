import { prisma } from "@/lib/db";
import type { Product, ProductTag } from "@/lib/catalog";
import type { Product as DbProduct } from "@prisma/client";

export function serializeTags(tags: ProductTag[]) {
  const unique = Array.from(new Set(tags.map((t) => t.trim()).filter(Boolean)));
  return `|${unique.join("|")}|`;
}

export function parseTags(serialized: string): ProductTag[] {
  return serialized
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean) as ProductTag[];
}

function toCatalogProduct(row: DbProduct): Product {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    altTitle: row.altTitle ?? undefined,
    shortDescription: row.shortDescription,
    priceCents: row.priceCents,
    compareAtPriceCents: row.compareAtPriceCents ?? undefined,
    rating: row.rating,
    reviewCount: row.reviewCount,
    tags: parseTags(row.tags),
    imageSrc: row.imageSrc,
    isSoldOut: row.isSoldOut,
    isNew: row.isNew,
    isBestSeller: row.isBestSeller,
  };
}

export async function listProducts(params?: { tag?: ProductTag; q?: string }) {
  const tag = params?.tag;
  const q = params?.q?.trim();

  const rows = await prisma.product.findMany({
    orderBy: [{ isBestSeller: "desc" }, { createdAt: "desc" }],
    where: {
      ...(tag ? { tags: { contains: `|${tag}|` } } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q } },
              { altTitle: { contains: q } },
              { shortDescription: { contains: q } },
            ],
          }
        : {}),
    },
  });

  return rows.map(toCatalogProduct);
}

export async function getProductBySlug(slug: string) {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? toCatalogProduct(row) : null;
}

export async function getProductById(id: string) {
  const row = await prisma.product.findUnique({ where: { id } });
  return row ? toCatalogProduct(row) : null;
}

export async function createProduct(input: {
  slug: string;
  title: string;
  altTitle?: string;
  shortDescription: string;
  priceCents: number;
  compareAtPriceCents?: number;
  tags: ProductTag[];
  imageSrc: string;
  isSoldOut?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}) {
  const row = await prisma.product.create({
    data: {
      slug: input.slug,
      title: input.title,
      altTitle: input.altTitle ?? null,
      shortDescription: input.shortDescription,
      priceCents: input.priceCents,
      compareAtPriceCents: input.compareAtPriceCents ?? null,
      rating: 0,
      reviewCount: 0,
      tags: serializeTags(input.tags),
      imageSrc: input.imageSrc,
      isSoldOut: input.isSoldOut ?? false,
      isNew: input.isNew ?? true,
      isBestSeller: input.isBestSeller ?? false,
    },
  });

  return toCatalogProduct(row);
}


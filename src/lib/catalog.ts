export type ProductTag =
  | "spices-whole"
  | "spices-powder"
  | "special-masalay"
  | "seasoning"
  | "kids-treat"
  | "tea-herbs"
  | "dry-fruits"
  | "pickle";

export type Product = {
  id: string;
  slug: string;
  title: string;
  altTitle?: string;
  shortDescription: string;
  priceCents: number; // minor units (paise)
  compareAtPriceCents?: number; // minor units (paise)
  rating: number;
  reviewCount: number;
  tags: ProductTag[];
  imageSrc: string;
  isSoldOut?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
};

export type Category = {
  title: string;
  href: string;
  imageSrc: string;
  count: number;
};

export const categories: Category[] = [
  {
    title: "Spices",
    href: "/products?tag=spices-whole",
    imageSrc: "/categories/spices.svg",
    count: 24,
  },
  {
    title: "Special Masalay",
    href: "/products?tag=special-masalay",
    imageSrc: "/categories/special.svg",
    count: 18,
  },
  {
    title: "Seasoning",
    href: "/products?tag=seasoning",
    imageSrc: "/categories/seasoning.svg",
    count: 12,
  },
];


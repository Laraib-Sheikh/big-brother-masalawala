const { PrismaClient } = require("@prisma/client");
require("dotenv/config");
const { PrismaPg } = require("@prisma/adapter-pg");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const seedProducts = [
  {
    slug: "chinese-salt",
    title: "Chinese Salt",
    altTitle: "چائینز نمک",
    shortDescription: "Balanced seasoning for noodles, soups, and snacks.",
    priceCents: 12000,
    compareAtPriceCents: 13200,
    rating: 4.8,
    reviewCount: 28,
    tags: "|seasoning|",
    imageSrc: "/products/image-1.png",
    isBestSeller: true,
    isNew: false,
    isSoldOut: false,
  },
  {
    slug: "garam-masala",
    title: "Garam Masala",
    altTitle: "گرم مصالحہ",
    shortDescription: "Aromatic blend for curries, lentils, and marinades.",
    priceCents: 21200,
    compareAtPriceCents: 22000,
    rating: 4.9,
    reviewCount: 64,
    tags: "|special-masalay|",
    imageSrc: "/products/image-2.png",
    isBestSeller: true,
    isNew: false,
    isSoldOut: false,
  },
  {
    slug: "chicken-powder",
    title: "Chicken Powder",
    altTitle: "چکن پاوڈر",
    shortDescription: "Umami-rich seasoning for rice, soups, and fries.",
    priceCents: 13800,
    compareAtPriceCents: 16400,
    rating: 4.7,
    reviewCount: 33,
    tags: "|seasoning|",
    imageSrc: "/products/image-3.png",
    isBestSeller: true,
    isNew: false,
    isSoldOut: false,
  },
  {
    slug: "paprika-powder",
    title: "Paprika Powder",
    altTitle: "پیپریکا پاوڈر",
    shortDescription: "Sweet-smoky color and flavor for roasts and sauces.",
    priceCents: 12400,
    compareAtPriceCents: 13500,
    rating: 4.6,
    reviewCount: 19,
    tags: "|spices-powder|",
    imageSrc: "/products/image-4.png",
    isBestSeller: false,
    isNew: false,
    isSoldOut: false,
  },
  {
    slug: "garlic-powder",
    title: "Garlic Powder",
    altTitle: "لہسن پاوڈر",
    shortDescription: "Everyday essential for pasta, stews, and rubs.",
    priceCents: 12800,
    compareAtPriceCents: 14400,
    rating: 4.7,
    reviewCount: 22,
    tags: "|spices-powder|",
    imageSrc: "/products/image-5.png",
    isBestSeller: false,
    isNew: false,
    isSoldOut: false,
  },
  {
    slug: "amchoor-powder",
    title: "Amchoor Powder",
    altTitle: "آمچور پاوڈر",
    shortDescription: "Tangy dried mango powder for chaat and curries.",
    priceCents: 13100,
    compareAtPriceCents: 14000,
    rating: 4.8,
    reviewCount: 41,
    tags: "|spices-powder|",
    imageSrc: "/products/image-6.png",
    isBestSeller: true,
    isNew: false,
    isSoldOut: false,
  },
  {
    slug: "white-cumin",
    title: "White Cumin",
    altTitle: "سفید ذیرہ",
    shortDescription: "Whole cumin seeds for tempering and spice blends.",
    priceCents: 18200,
    compareAtPriceCents: 21900,
    rating: 4.7,
    reviewCount: 37,
    tags: "|spices-whole|",
    imageSrc: "/products/image-7.png",
    isBestSeller: false,
    isNew: false,
    isSoldOut: false,
  },
  {
    slug: "special-biryani-masala",
    title: "Special Biryani Masala",
    altTitle: null,
    shortDescription: "Restaurant-style biryani aroma in every serving.",
    priceCents: 9500,
    compareAtPriceCents: 10500,
    rating: 4.9,
    reviewCount: 112,
    tags: "|special-masalay|",
    imageSrc: "/products/image-8.png",
    isBestSeller: true,
    isNew: false,
    isSoldOut: false,
  },
  {
    slug: "tikka-boti-masala",
    title: "Tikka Boti Masala",
    altTitle: null,
    shortDescription: "Smoky BBQ flavor for tikka, boti, and grills.",
    priceCents: 8900,
    compareAtPriceCents: 9800,
    rating: 4.8,
    reviewCount: 76,
    tags: "|special-masalay|",
    imageSrc: "/products/image-9.png",
    isBestSeller: true,
    isNew: false,
    isSoldOut: false,
  },
  {
    slug: "chaat-masala",
    title: "Chaat Masala",
    altTitle: "چاٹ مصالحہ",
    shortDescription: "Zesty sprinkle for fruit chaat, fries, and snacks.",
    priceCents: 10400,
    compareAtPriceCents: 11900,
    rating: 4.7,
    reviewCount: 58,
    tags: "|seasoning|",
    imageSrc: "/products/image-10.png",
    isBestSeller: true,
    isNew: false,
    isSoldOut: false,
  },
  {
    slug: "aloo-bukhara",
    title: "Aloo Bukhara (Plum)",
    altTitle: "آلو بخارہ",
    shortDescription: "Sweet & tangy plums for chutneys and desserts.",
    priceCents: 22800,
    compareAtPriceCents: 29900,
    rating: 4.8,
    reviewCount: 45,
    tags: "|dry-fruits|",
    imageSrc: "/products/image-10.png",
    isBestSeller: false,
    isNew: true,
    isSoldOut: false,
  },
];

async function main() {
  for (const p of seedProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log(`Seeded ${seedProducts.length} products`);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


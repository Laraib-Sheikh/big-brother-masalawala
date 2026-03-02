import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrisma(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required for PostgreSQL.");
  }
  return new PrismaClient({
    log: ["error"],
    adapter: new PrismaPg({ connectionString }),
  });
}

function getPrisma(): PrismaClient {
  let client = globalForPrisma.prisma;
  if (client != null) {
    if (typeof (client as unknown as Record<string, unknown>).customer === "undefined") {
      globalForPrisma.prisma = undefined;
      client = undefined;
    }
  }
  if (client == null) {
    client = createPrisma();
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = client;
    }
  }
  return client;
}

/** Lazy-initialized so build can succeed without DATABASE_URL; client is created on first use. */
export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    const client = getPrisma() as unknown as Record<string, unknown>;
    const value = client[prop as string];
    if (prop === "customer" && value === undefined) {
      throw new Error(
        "Prisma client missing 'customer' model. Run: npx prisma generate. Then fully stop and restart your dev server (Ctrl+C, then npm run dev).",
      );
    }
    return value;
  },
});


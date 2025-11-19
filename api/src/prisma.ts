let prisma: any | undefined;

export async function getPrisma(env: { PRISMA_ACCELERATE_URL?: string }) {
  if (!prisma) {
    if (!env.PRISMA_ACCELERATE_URL) {
      throw new Error("Missing PRISMA_ACCELERATE_URL for Prisma Accelerate Data Proxy");
    }
    const { PrismaClient } = await import("@prisma/client/edge");
    prisma = new PrismaClient({ datasourceUrl: env.PRISMA_ACCELERATE_URL });
  }
  return prisma;
}

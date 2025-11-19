let prisma: any | undefined;

export async function getPrisma(env: { SUPABASE_DB_SESSION_POOLER_URL?: string }) {
  if (!prisma) {
    if (!env.SUPABASE_DB_SESSION_POOLER_URL) {
      throw new Error("Missing SUPABASE_DB_SESSION_POOLER_URL for database connection");
    }
    const { PrismaClient } = await import("@prisma/client/edge");
    prisma = new PrismaClient({ datasourceUrl: env.SUPABASE_DB_SESSION_POOLER_URL });
  }
  return prisma;
}

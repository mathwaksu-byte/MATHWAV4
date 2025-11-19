let prisma: any | undefined;

export async function getPrisma(env: { SUPABASE_DB_SESSION_POOLER_URL?: string }) {
  if (!prisma) {
    if (!env.SUPABASE_DB_SESSION_POOLER_URL) {
      throw new Error("Missing SUPABASE_DB_SESSION_POOLER_URL for database connection");
    }
    
    // Use the existing edge client without driver adapter for now
    const { PrismaClient } = await import("@prisma/client/edge");
    
    // Create PrismaClient with explicit configuration for edge runtime
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: env.SUPABASE_DB_SESSION_POOLER_URL
        }
      }
    });
  }
  return prisma;
}

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (client) return client;
  const env = (typeof window !== "undefined" ? (window as any).ENV : {}) || {};
  client = createClient(env.SUPABASE_URL || "", env.SUPABASE_ANON_KEY || "");
  return client;
}

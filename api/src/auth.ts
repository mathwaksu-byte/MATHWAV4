export async function getSupabaseUser(env: { SUPABASE_URL?: string; SUPABASE_ANON_KEY?: string }, token: string) {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) return null;
  const res = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: env.SUPABASE_ANON_KEY
    }
  });
  if (!res.ok) return null;
  return res.json();
}

export function bearerToken(request: Request) {
  const auth = request.headers.get("Authorization") || "";
  const m = auth.match(/^Bearer\s+(.*)$/i);
  return m ? m[1] : null;
}


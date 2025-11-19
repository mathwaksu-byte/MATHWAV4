import { useEffect, useState } from "react";
import { getSupabaseClient } from "../lib/supabase.client";
import { useNavigate } from "@remix-run/react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSupabaseClient().auth.getSession().then(({ data }) => {
      if (data.session) navigate("/dashboard");
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const { data, error } = await getSupabaseClient().auth.signInWithPassword({ email, password });
    if (error) return setError(error.message);
    if (data.session) navigate("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 border rounded p-6">
        <h1 className="text-xl font-bold">Admin Login</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white rounded p-2">Sign In</button>
      </form>
    </main>
  );
}

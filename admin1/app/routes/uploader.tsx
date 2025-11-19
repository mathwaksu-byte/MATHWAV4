import { useEffect, useState } from "react";
import { getSupabaseClient } from "../lib/supabase.client";
import { useNavigate } from "@remix-run/react";

const BUCKETS = ["gallery", "university_images", "documents/brochures"];

export default function Uploader() {
  const navigate = useNavigate();
  const [bucket, setBucket] = useState<string>(BUCKETS[0]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    getSupabaseClient().auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/login");
    });
  }, [navigate]);

  async function upload() {
    if (!file) return;
    setStatus("Uploading...");
    const path = `${Date.now()}_${file.name}`;
    const { error } = await getSupabaseClient().storage.from(bucket).upload(path, file, { upsert: false });
    if (error) return setStatus(error.message);
    const { data } = getSupabaseClient().storage.from(bucket).getPublicUrl(path);
    const url = data.publicUrl;
    const { data: sessionData } = await getSupabaseClient().auth.getSession();
    const token = sessionData.session?.access_token || "";
    const envApi = (window as any)?.ENV?.API_URL || "";
    const bases = [
      ...(envApi ? [envApi] : []),
      "http://127.0.0.1:3001",
      "http://localhost:3001",
      "http://127.0.0.1:8787"
    ];
    const api = bases.find(Boolean) as string;
    const res = await fetch(`${api}/admin/gallery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, bucket, path, url })
    });
    if (!res.ok) return setStatus("Failed to save metadata");
    setStatus("Done");
  }

  return (
    <main className="mx-auto max-w-xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Upload to Storage</h1>
      <select className="w-full border rounded p-2" value={bucket} onChange={e => setBucket(e.target.value)}>
        {BUCKETS.map(b => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
      <input className="w-full border rounded p-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button className="bg-blue-600 text-white rounded px-4 py-2" onClick={upload}>Upload</button>
      {status && <p className="text-sm text-gray-700">{status}</p>}
    </main>
  );
}

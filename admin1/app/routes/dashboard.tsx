import { useEffect, useState } from "react";
import { getSupabaseClient } from "../lib/supabase.client";
import { useNavigate } from "@remix-run/react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getSupabaseClient().auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/login");
    });
  }, [navigate]);

  useEffect(() => {
    const envApi = (window as any)?.ENV?.API_URL || "";
    const bases = [
      ...(envApi ? [envApi] : []),
      "http://127.0.0.1:3001",
      "http://localhost:3001",
      "http://127.0.0.1:8787"
    ];
    const api = bases.find(Boolean) as string;
    fetch(`${api}/gallery`).then(r => r.json()).then(setItems);
  }, []);

  const buckets = Array.from(new Set(items.map(x => x.bucket)));
  const chartData = buckets.map(b => ({ name: b, value: items.filter(x => x.bucket === b).length }));
  const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#6366f1"]; 

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <a href="/uploader" className="bg-blue-600 text-white rounded px-3 py-2">Upload</a>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <h2 className="font-semibold">Bucket Distribution</h2>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-semibold">Recent Gallery Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Title</th>
                  <th className="p-2">Bucket</th>
                  <th className="p-2">Path</th>
                </tr>
              </thead>
              <tbody>
                {items.slice(0, 10).map(x => (
                  <tr key={x.id} className="border-t">
                    <td className="p-2">{x.title}</td>
                    <td className="p-2">{x.bucket}</td>
                    <td className="p-2">{x.path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

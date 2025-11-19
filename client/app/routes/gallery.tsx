import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => [{ title: "Gallery — KSU MATHWA" }];

export async function loader({ context }: LoaderFunctionArgs) {
  const env = (context as any).env || {};
  const api = (env.API_URL as string) || "";
  try {
    if (!api) return json({ items: [] });
    const res = await fetch(`${api}/gallery`).catch(() => null as any);
    if (!res || !res.ok) return json({ items: [] });
    const items = await res.json();
    return json({ items });
  } catch {
    return json({ items: [] });
  }
}

export default function Gallery() {
  const { items } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold">Gallery</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((x: any) => (
          <figure key={x.id} className="rounded border p-2">
            <img src={x.url} alt={x.title} className="w-full h-48 object-cover" />
            <figcaption className="mt-2 text-sm">{x.title}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}

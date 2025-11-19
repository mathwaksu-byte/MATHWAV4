import type { LinksFunction, MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import styles from "./styles/tailwind.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => [{ title: "KSU — MATHWA" }];

export async function loader({ context }: LoaderFunctionArgs) {
  const env = ((context as any)?.env) || {};
  return json({
    SUPABASE_URL: env.SUPABASE_URL || "",
    SUPABASE_ANON_KEY: env.SUPABASE_ANON_KEY || "",
    API_URL: env.API_URL || ""
  });
}

export default function App() {
  const env = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV=${JSON.stringify(env)}`
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

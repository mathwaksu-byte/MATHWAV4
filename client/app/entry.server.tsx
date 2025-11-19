import type { EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

export default function handleRequest(
  arg: any,
  responseStatusCode?: number,
  responseHeaders?: Headers,
  remixContext?: EntryContext
) {
  const req: Request = arg?.url ? arg : arg?.request;
  const status: number = typeof responseStatusCode === "number" ? responseStatusCode : arg?.responseStatusCode ?? 200;
  const headers: Headers = responseHeaders instanceof Headers ? responseHeaders : arg?.responseHeaders ?? new Headers();
  const ctx: EntryContext = remixContext ?? arg?.remixContext;
  const markup = renderToString(<RemixServer context={ctx} url={req.url} />);
  headers.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, { status, headers });
}

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getWhatsAppLink } from "../utils/whatsapp";

export const meta: MetaFunction = () => ([
  { title: "Contact — MATHWA Official Admissions" },
  { name: "description", content: "Contact MATHWA admissions via WhatsApp or call for MBBS in Kyrgyzstan guidance." },
  { property: "og:title", content: "Contact — MATHWA Official Admissions" },
  { property: "og:description", content: "Get admissions support for MBBS in Kyrgyzstan." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary" }
]);

export async function loader({ context }: LoaderFunctionArgs) {
  const env = ((context as any)?.env) || {};
  return json({
    WHATSAPP_NUMBER: env.WHATSAPP_NUMBER || "",
    WHATSAPP_MESSAGE: env.WHATSAPP_MESSAGE || "",
    CALL_NUMBER: env.CALL_NUMBER || ""
  });
}

export default function Contact() {
  const env = useLoaderData<typeof loader>();
  const whatsappHref = getWhatsAppLink();
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-royalBlue">Contact Admissions</h1>
      <p className="mt-2 text-slate-700">Reach out for guidance on MBBS in Kyrgyzstan.</p>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-md bg-green-600 text-white text-center">WhatsApp Us</a>
        <a href={`tel:${env.CALL_NUMBER || ''}`} className="px-4 py-3 rounded-md bg-royalBlue text-white text-center">Call Now</a>
      </div>
    </div>
  );
}


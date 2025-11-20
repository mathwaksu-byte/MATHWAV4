import { getWhatsAppLink } from "../utils/whatsapp";

export default function FloatingActions() {
  const env = (typeof window !== 'undefined' ? (window as any).ENV : {}) || {};
  const callNumber = env.CALL_NUMBER || '+919999999999';
  return (
    <div className="fixed bottom-6 left-6 flex flex-col gap-3">
      <a title="WhatsApp" href={getWhatsAppLink()} className="w-12 h-12 rounded-full bg-green-600 text-white grid place-items-center shadow-glow" aria-label="Open WhatsApp">WA</a>
      <a title="Call" href={`tel:${String(callNumber).replace(/[^+0-9]/g, '')}`} className="w-12 h-12 rounded-full bg-golden text-black grid place-items-center shadow-glow" aria-label="Call Admissions">📞</a>
    </div>
  );
}


export const getWhatsAppLink = (message?: string) => {
  const env = (typeof window !== 'undefined' ? (window as any).ENV : process.env) || {} as Record<string, string>;
  const phoneNumber = env.WHATSAPP_NUMBER || '1234567890';
  const defaultMessage = env.WHATSAPP_MESSAGE || 'Hello, I want to inquire about MBBS admissions';
  const finalMessage = message || defaultMessage;
  
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
};

export const openWhatsApp = (message?: string) => {
  if (typeof window !== 'undefined') {
    window.open(getWhatsAppLink(message), '_blank');
  }
};

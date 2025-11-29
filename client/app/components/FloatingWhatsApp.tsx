import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { openWhatsApp } from '../utils/whatsapp';

export default function FloatingWhatsApp({ siteSettings }: { siteSettings?: any }) {
  const handleWhatsApp = () => {
    if (siteSettings?.whatsapp_number) {
      window.open(`https://wa.me/${siteSettings.whatsapp_number.replace(/[^+0-9]/g, '')}?text=Hello%2C%20I%20want%20to%20inquire%20about%20MBBS%20admissions`, '_blank');
    } else {
      openWhatsApp();
    }
  };

  // Use siteSettings number or fallback to a generic placeholder if not set yet, 
  // ensuring the button is visible so the user can see it exists.
  const callNumber = siteSettings?.call_number;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col gap-3 items-center">
      {/* Call Button */}
      <motion.a
        href={callNumber ? `tel:${callNumber.replace(/[^+0-9]/g, '')}` : 'tel:+919999999999'}
        className="bg-white text-royalBlue border border-royalBlue/10 p-3 sm:p-4 rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-200 grid place-items-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Call Admissions"
      >
        <FaPhone className="text-xl sm:text-2xl" />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.button
        onClick={handleWhatsApp}
        className="bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors duration-200 relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-2xl sm:text-3xl" />
        <motion.div
          className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          1
        </motion.div>
      </motion.button>
    </div>
  );
}

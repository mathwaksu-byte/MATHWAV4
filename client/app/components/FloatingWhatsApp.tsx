import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { openWhatsApp } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  return (
    <motion.button
      onClick={() => openWhatsApp()}
      className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors duration-200"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
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
  );
}

import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';

export default function Home() {
  const t = useTranslation();
  
  return (
    <motion.div
      className="flex flex-col gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-2xl font-bold"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {t.welcome}
      </motion.h1>
      
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-sm border border-[#F5F5F5]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <p className="text-gray-500 text-center">{t.loading}</p>
      </motion.div>
    </motion.div>
  )
}
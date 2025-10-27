import { gols } from "../../data/data";
import InfoGols from "./InfoGols";
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';

export default function Goals() {
  const t = useTranslation();
  
  return (
    <motion.div 
      className="flex flex-col gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {gols.map((i, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <InfoGols title={t[i.title as keyof typeof t]} text={t[i.text as keyof typeof t]} />
          {index !== gols.length - 1 && (
            <div className="w-full mt-8 h-[1px] bg-[#EAEAEA]"></div>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}
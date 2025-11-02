import React from 'react';
import { useLocalization } from '../../contexts/LocalizationContext';
import { motion } from 'framer-motion';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLocalization();

  return (
    <div className={`absolute top-6 ${language === 'ar' ? 'left-6' : 'right-6'}`}>
      <motion.div
        className="w-12 h-12 bg-gradient-to-br from-[#002624] to-[#002624] rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
        onClick={toggleLanguage}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotateY: language === 'en' ? 0 : 180,
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.span 
          className="text-white font-bold text-sm"
          animate={{
            rotateY: language === 'en' ? 0 : 180,
          }}
          transition={{ duration: 0.5 }}
        >
          {language === 'en' ? 'العربية' : 'English'}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default LanguageToggle;
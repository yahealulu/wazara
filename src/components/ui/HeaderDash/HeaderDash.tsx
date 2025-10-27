import iconeHead from '../../../assets/adminIcon/Button Icon.png'
import { useLocalization } from '../../../contexts/LocalizationContext';
import { useTranslation } from '../../../hooks/useTranslation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import UserDropdown from '../../UserDropdown/UserDropdown';

export default function HeaderDash() {
  const { language, toggleLanguage } = useLocalization();
  const t = useTranslation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    // Dispatch a custom event to notify the sidebar of the change
    window.dispatchEvent(new CustomEvent('sidebarToggle', { detail: !isSidebarCollapsed }));
  };

  return (
    <div className="flex items-center py-2 px-5 w-full border-[#F5F5F5] bg-[#FDFDFD] border-b">
      <div className="flex items-center">
        <motion.button
          onClick={toggleSidebar}
          className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={iconeHead} alt="Toggle sidebar" className='h-6 w-6' />
        </motion.button>
        <motion.h2 
          className='text-base font-medium text-[#020617] ml-2'
          key={language}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {t.ministryName}
        </motion.h2>
      </div>
      
      {/* Centered language toggle and profile */}
      <div className="flex-grow flex justify-center items-center gap-4">
        <motion.button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-Primary text-white hover:bg-[#004d48] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            key={language}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-medium"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </motion.span>
        </motion.button>
        <UserDropdown/>
      </div>
      
      {/* Empty div to balance the layout */}
      <div className="w-20"></div>
    </div>
  )
}
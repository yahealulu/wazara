import { useState } from "react";
import IncomingRequests from "../../components/IncomingRequests/IncomingRequests";
import PerformanceAnalytics from "../../components/PerformanceAnalytics/PerformanceAnalytics";
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';

export default function Overview() {
  const t = useTranslation();
  const [period, setPeriod] = useState("Today");

  return (
    <motion.section 
      className="flex flex-col gap-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-6">{t.performanceAnalytics}</h2>
        <PerformanceAnalytics period={period} onPeriodChange={setPeriod}/>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <IncomingRequests period={period}/>
      </motion.div>
    </motion.section>
  )
}
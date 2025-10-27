import { useState } from "react";
import PeriodSelector from "../../components/PerformanceAnalytics/PeriodSelector";
import TableOver from "../../components/IncomingRequests/TabelOver";
import Pagination from "../../components/Pagination/Pagination";
import { dataState } from "../../data/data";
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';

export default function Visitors() {
  const [period, setPeriod] = useState("All");
  const t = useTranslation();
  
  const periodOptions = [t.all, t.checkedIn, t.late, t.absent];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;


  const totalPages = Math.ceil(dataState.length / itemsPerPage);

  return (
    <motion.section 
      className="flex flex-col gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex justify-between items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h2 className="text-lg font-semibold">{t.visitorsCheckIns}</h2>
          <p className="text-sm text-gray-500">24 {t.peopleHaveCheckedIn}</p>
        </div>
        <PeriodSelector selected={period} onChange={setPeriod} options={periodOptions} />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <TableOver
          columns={[
            { key: "name", label: t.visitorName },
            { key: "title", label: t.meetingTitle },
            { key: "importance", label: t.importance },
            { key: "date", label: `${t.date} & ${t.time}` },
          ]}
          data={dataState}
          hideActions={true} //  لإخفاء عمود الأكشن أو الحالة
        />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => {
            if (page >= 1 && page <= totalPages) {
              setCurrentPage(page);
            }
          }}
        />
      </motion.div>
    </motion.section>
  );
}
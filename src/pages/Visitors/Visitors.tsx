import { useState, useEffect, useMemo } from "react";
import PeriodSelector from "../../components/PerformanceAnalytics/PeriodSelector";
import TableOver from "../../components/IncomingRequests/TabelOver";
import Pagination from "../../components/Pagination/Pagination";
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';
import api from "../../services/axiosConfig";

// Define the API response type
interface Visitor {
  id: string;
  visitor_name: string;
  meeting_title: string;
  importance: string;
  date_time: string;
  status: string;
}

interface VisitorsResponse {
  status: string;
  items: Visitor[];
}

export default function Visitors() {
  const [period, setPeriod] = useState("All");
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const t = useTranslation();
  
  // Map UI period options to API status values
  const periodToStatusMap: Record<string, string> = {
    [t.all]: "all",
    [t.checkedIn]: "checked_in",
    [t.late]: "late",
    [t.absent]: "absent"
  };
  
  const periodOptions = [t.all, t.checkedIn, t.late, t.absent];

  // Fetch visitors from API
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get the status value for the API call
        const statusValue = periodToStatusMap[period] || "all";
        
        const response = await api.get<VisitorsResponse>(
          `/appointments/api/admin/visitors/?status=${statusValue}`
        );
        
        setVisitors(response.data.items);
      } catch (err) {
        console.error("Error fetching visitors:", err);
        setError("Failed to load visitors data");
        setVisitors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, [period]);

  // Transform API data for display
  const displayData = useMemo(() => {
    return visitors.map(visitor => ({
      id: visitor.id,
      name: visitor.visitor_name,
      title: visitor.meeting_title,
      importance: visitor.importance,
      date: visitor.date_time ? new Date(visitor.date_time).toLocaleDateString() : 'N/A',
      time: visitor.date_time ? new Date(visitor.date_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'N/A'
    }));
  }, [visitors]);

  const totalPages = Math.ceil(displayData.length / itemsPerPage);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return displayData.slice(startIndex, endIndex);
  }, [displayData, currentPage]);

  // Reset to first page when period changes
  useEffect(() => {
    setCurrentPage(1);
  }, [period]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">{t.loading}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

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
          <p className="text-sm text-gray-500">{displayData.length} {t.peopleHaveCheckedIn}</p>
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
          data={paginatedData}
          hideActions={true}
        />
      </motion.div>
      
      {totalPages > 1 && (
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
      )}
    </motion.section>
  );
}
import { useState, useMemo, useEffect } from "react";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import PeriodSelector from "../../components/PerformanceAnalytics/PeriodSelector";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { meetings } from "../../data/tabel";
import TableOver from "../../components/IncomingRequests/TabelOver";
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';
import StateBtn from "../../components/ui/Buttons/StateBtn";
import { Download } from "lucide-react";

// Define the API response type
interface Appointment {
  id: string;
  subject: string;
  priority: string;
  status: string;
  start_at: string;
  // ... other fields
}

export default function PreviousMeetings() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("All"); // Default to "All" as requested
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);
  const navigate = useNavigate();
  const t = useTranslation();

  const periodOptions = [t.all, t.today, t.thisWeek, t.thisMonth]; // Add "All" option
  const itemsPerPage = 7;

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        // Simple fetch implementation
        const tokens = localStorage.getItem('auth_tokens');
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (tokens) {
          const parsedTokens = JSON.parse(tokens);
          if (parsedTokens.access) {
            headers['Authorization'] = `Bearer ${parsedTokens.access}`;
          }
        }
        
        const response = await fetch('/appointments/api/admin/requests/', {
          headers
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        // Just use the data as-is, don't overthink the format
        setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        // Fallback to mock data if API fails
        setUseMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Determine which data to use (API or mock)
  const dataSource: any = useMockData ? meetings : appointments;

  // Transform data for display
  const displayData = useMemo(() => {
    if (useMockData) {
      // Use mock data as-is
      return dataSource;
    } else {
      // Transform API data to match expected format
      return (dataSource as Appointment[]).map(appointment => ({
        id: appointment.id,
        title: appointment.subject || 'Untitled Meeting',
        importance: appointment.priority || 'medium',
        state: appointment.status || 'pending',
        date: appointment.start_at ? new Date(appointment.start_at).toLocaleDateString() : 'N/A',
        time: appointment.start_at ? new Date(appointment.start_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'N/A'
      }));
    }
  }, [dataSource, useMockData]);

  const filteredData = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    // Apply search filter
    const searchedData = displayData.filter((item: any) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowerSearch)
      )
    );

    // If "All" is selected, return all data
    if (period === t.all || period === "All") {
      return searchedData;
    }

    // Apply date filtering for other periods
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return searchedData.filter((item: any) => {
      if (!item.date) return false;
      
      // For mock data, date is already a string
      // For API data, we've converted it to a readable format
      const itemDate = new Date(item.date);
      
      if (isNaN(itemDate.getTime())) return false;
      
      switch (period) {
        case t.today:
          return itemDate >= startOfDay && 
                 itemDate < new Date(startOfDay.getFullYear(), startOfDay.getMonth(), startOfDay.getDate() + 1);
        case t.thisWeek:
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(endOfWeek.getDate() + 7);
          return itemDate >= startOfWeek && itemDate < endOfWeek;
        case t.thisMonth:
          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
          return itemDate >= startOfMonth && itemDate < endOfMonth;
        default:
          return true;
      }
    });
  }, [displayData, period, search, t]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, period]);

  if (loading && !useMockData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">{t.loading}</div>
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
        <SearchComponent value={search} onChange={setSearch} />
        <StateBtn className=" bg-Primary text-white w-[155px]" icon={<Download size={20}/>} text="Export As File" /> 
      </motion.div>
        <PeriodSelector selected={period} onChange={setPeriod} options={periodOptions} />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <TableOver
          columns={[
            { key: "title", label: t.meetingTitle },
            { key: "importance", label: t.importance },
            { key: "date", label: `${t.date} & ${t.time}` },
          ]}
          data={paginatedData as any}
          onRowClick={(id) => navigate(`/admin/previousDetails/${id}`)}
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
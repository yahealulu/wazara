import { useState, useMemo, useEffect } from "react";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import PeriodSelector from "../../components/PerformanceAnalytics/PeriodSelector";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import TableOver from "../../components/IncomingRequests/TabelOver";
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';
import StateBtn from "../../components/ui/Buttons/StateBtn";
import { Download } from "lucide-react";
import api from "../../services/axiosConfig";

// Define the API response type
interface PreviousMeeting {
  id: string;
  subject: string;
  visitor_name: string;
  importance: string;
  date_time: string;
  status: string;
}

interface PreviousMeetingsResponse {
  range: string;
  items: PreviousMeeting[];
}

export default function PreviousMeetings() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("All"); // Default to "All" as requested
  const [currentPage, setCurrentPage] = useState(1);
  const [meetings, setMeetings] = useState<PreviousMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const t = useTranslation();

  // Map UI period options to API range values
  const periodToRangeMap: Record<string, string> = {
    [t.all]: "all",
    [t.today]: "today",
    [t.thisWeek]: "week",
    [t.thisMonth]: "month"
  };
  
  const periodOptions = [t.all, t.today, t.thisWeek, t.thisMonth]; // Add "All" option
  const itemsPerPage = 7;

  // Fetch meetings from API
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setLoading(true);
        
        // Get the range value for the API call
        const rangeValue = periodToRangeMap[period] || "all";
        
        const response = await api.get<PreviousMeetingsResponse>(
          `/appointments/api/admin/meetings/previous/?range=${rangeValue}`
        );
        
        setMeetings(response.data.items);
      } catch (err) {
        console.error("Error fetching previous meetings:", err);
        setMeetings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [period]);

  // Transform data for display
  const displayData = useMemo(() => {
    return meetings.map(meeting => ({
      id: meeting.id,
      title: meeting.subject || 'Untitled Meeting',
      importance: meeting.importance || 'medium',
      state: meeting.status || 'pending',
      date: meeting.date_time ? new Date(meeting.date_time).toLocaleDateString() : 'N/A',
      time: meeting.date_time ? new Date(meeting.date_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'N/A'
    }));
  }, [meetings]);

  const filteredData = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    // Apply search filter
    return displayData.filter((item: any) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowerSearch)
      )
    );
  }, [displayData, search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, period]);

  if (loading) {
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
          onRowClick={(id) => navigate(`/admin/admin/previousDetails/${id}`)}
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
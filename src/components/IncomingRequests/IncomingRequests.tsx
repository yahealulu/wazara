import { useNavigate } from "react-router-dom";
import TableOver from "./TabelOver";
import { meetingsLastMonth, meetingsLastWeek, meetingsToday } from "../../data/data";
import { useState, useEffect } from "react";
import ActionModalAdmin from "../Modal/ActionModalAdmin";
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';
import ActionButtonsOverview from "../ui/Buttons/ActionButtonsOverview";
import api from "../../services/axiosConfig";

// Define the API response type
interface UpcomingMeeting {
  id: string;
  subject: string;
  visitor_name: string;
  importance: string;
  date_time: string;
  status: string;
}

interface UpcomingMeetingsResponse {
  range: string;
  items: UpcomingMeeting[];
}

export default function IncomingRequests({period} : { period : string}) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [meetings, setMeetings] = useState<UpcomingMeeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const t = useTranslation();

  // Map UI period options to API range values
  const periodToRangeMap: Record<string, string> = {
    "Today": "today",
    "Last Week": "week",
    "Last Month": "month"
  };

  // Fetch meetings from API
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setLoading(true);
        
        // Get the range value for the API call
        const rangeValue = periodToRangeMap[period] || "all";
        
        const response = await api.get<UpcomingMeetingsResponse>(
          `/appointments/api/admin/meetings/upcoming/?range=${rangeValue}`
        );
        
        // Filter out meetings with "approved" and "rejected" status
        const filteredMeetings = response.data.items.filter(
          meeting => meeting.status !== "approved" && meeting.status !== "rejected"
        );
        
        setMeetings(filteredMeetings);
      } catch (err) {
        console.error("Error fetching upcoming meetings:", err);
        // Fallback to mock data on error
        setMeetings(getMeetingsByPeriod(period));
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [period]);

  const getMeetingsByPeriod = (period: string) => {
    switch(period) {
      case "Today": return meetingsToday;
      case "Last Week": return meetingsLastWeek;
      case "Last Month": return meetingsLastMonth;
      default: return meetingsToday;
    }
  };

  // Transform API data for display to match the expected structure in TabelOver
  const displayData = meetings.map(meeting => ({
    id: meeting.id,
    title: meeting.subject || 'Untitled Meeting',
    importance: meeting.importance || '',
    state: meeting.status || 'pending',
    date: meeting.date_time ? new Date(meeting.date_time).toLocaleDateString() : 'N/A',
    time: meeting.date_time ? new Date(meeting.date_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'N/A'
  }));

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold mb-8">{t.incomingRequests}</h2>
        <div className="bg-white rounded-2xl overflow-hidden w-full shadow-sm border border-[#F5F5F5] p-8 text-center">
          <p className="text-gray-500">{t.loading}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-8">{t.incomingRequests}</h2>
      
      <TableOver
        data={displayData}
        columns={[
          { key: "title", label: t.meetingTitle },
          { key: "importance", label: t.importance },
          { key: "date", label: `${t.date} & ${t.time}` },
        ]}
        hideActions={false}
        onRowClick={(id) => navigate(`/admin/meetingDetails/${id}`)}
        renderActions={(item) => (
          <ActionButtonsOverview
            onAccept={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle accept action
              console.log("Accept meeting", item.id);
            }}
            onPrimary={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle primary action
              console.log("Primary action for meeting", item.id);
            }}
            onReject={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpenModal(true);
            }}
          />
        )}
      />

      <ActionModalAdmin
        Letters="0 / 300 Letters"
        title={`${t.reject} ${t.this} ${t.request} ?`}
        p={t.yourAboutToReject}
        label={`${t.rejectionCause} (${t.optional})`}
        placeholder={t.letTheVisitorKnow}
        onCancel={() => setOpenModal(false)}
        isOpen={openModal}
        btnState={t.reject}
        btnStateColor="bg-[#DE4C3C] text-white"
      />
    </motion.div>
  );
}
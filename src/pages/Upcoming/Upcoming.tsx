import { useTranslation } from '../../hooks/useTranslation';
import { useMemo, useState, useEffect } from "react";
import PeriodSelector from "../../components/PerformanceAnalytics/PeriodSelector";
import StateBtn from "../../components/ui/Buttons/StateBtn";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import TabelSelect from "../../components/TabelSelect/TabelSelect";
import TableOver from "../../components/IncomingRequests/TabelOver";
import Calendar from "../../components/Calendar/Calendar";
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import { getWeeksFromDate } from '../../utils/getWeeksOfMonth';
import Pagination from '../../components/Pagination/Pagination';
import { motion } from "framer-motion";
import api from "../../services/axiosConfig";
import type { MeetingCalender } from "../../types";

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

export default function Upcoming() {
  const t = useTranslation();
  const periodOptions = [t.today, t.tomorrow, t.week, t.month];
  const [period, setPeriod] = useState(t.today);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list');
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [meetings, setMeetings] = useState<UpcomingMeeting[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Map UI period options to API range values
  const periodToRangeMap: Record<string, string> = {
    [t.today]: "today",
    [t.tomorrow]: "tomorrow",
    [t.week]: "week",
    [t.month]: "month"
  };

  // توليد الأسابيع بدءاً من اليوم
  const weeks = useMemo(() => {
    const today = new Date();
    return getWeeksFromDate(today, 52);
  }, []);

  // البحث عن الأسبوع الحالي عند التحميل
  useEffect(() => {
    if (weeks.length > 0) {
      const today = new Date();
      const todayString = today.toDateString();
      
      const currentWeekIndex = weeks.findIndex(week => 
        week.days.some(day => day.toDateString() === todayString)
      );
      
      if (currentWeekIndex !== -1) {
        setCurrentWeekIndex(currentWeekIndex);
      }
    }
  }, [weeks]);

  // Fetch meetings from API
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setLoading(true);
        
        // Get the range value for the API call
        const rangeValue = periodToRangeMap[period] || "today";
        
        const response = await api.get<UpcomingMeetingsResponse>(
          `/appointments/api/admin/meetings/upcoming/?range=${rangeValue}`
        );
        
        setMeetings(response.data.items);
      } catch (err) {
        console.error("Error fetching upcoming meetings:", err);
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

  // Transform data for calendar
  const calendarData = useMemo(() => {
    return meetings.map(meeting => {
      const date = meeting.date_time ? new Date(meeting.date_time) : new Date();
      return {
        id: parseInt(meeting.id.replace(/[^0-9]/g, '')) || 1, // Simple ID conversion
        title: meeting.subject || 'Untitled Meeting',
        visitor: meeting.visitor_name || 'Unknown Visitor',
        time: meeting.date_time ? new Date(meeting.date_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'N/A',
        date: date.toDateString(),
        status: meeting.status as "Accepted" | "Canceled" | "Pending" || "Pending",
        week: 1, // This would need to be calculated properly
        day: date.toLocaleDateString("en-US", { weekday: "long" })
      } as MeetingCalender;
    });
  }, [meetings]);

  const handleAddMeeting = () => {
    navigate("/admin/addNewMeeting");
  };

  const paginatedMeetings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return displayData.slice(startIndex, endIndex);
  }, [currentPage, displayData]);

  const totalPages = Math.ceil(displayData.length / itemsPerPage);

  // دالة محسنة لتصفية الاجتماعات حسب الأسبوع
  const getMeetingsByWeek = (weekIndex: number) => {
    if (!weeks[weekIndex]) {
      return [];
    }

    const currentWeek = weeks[weekIndex];
    
    return calendarData.filter(m => {
      const meetingDate = new Date(m.date);
      const normalizedMeetingDate = new Date(
        meetingDate.getFullYear(),
        meetingDate.getMonth(),
        meetingDate.getDate()
      );

      // التحقق إذا كان التاريخ ضمن أيام الأسبوع
      const isInWeek = currentWeek.days.some(weekDay => {
        const normalizedWeekDay = new Date(
          weekDay.getFullYear(),
          weekDay.getMonth(),
          weekDay.getDate()
        );
        return normalizedMeetingDate.getTime() === normalizedWeekDay.getTime();
      });

      return isInWeek;
    });
  };

  // البيانات المراد عرضها في الكاليندر
  const filteredMeetingsForCalendar = useMemo(
    () => getMeetingsByWeek(currentWeekIndex),
    [currentWeekIndex, weeks, calendarData]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">{t.loading}</div>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        {activeTab === "list" ? (
          <PeriodSelector
            selected={period}
            onChange={setPeriod}
            options={periodOptions}
          />
        ) : (
          <CalendarHeader
            currentWeekIndex={currentWeekIndex}
            setCurrentWeekIndex={setCurrentWeekIndex}
            weeks={weeks}
          />
        )}

        <div className="flex items-center gap-4">
          <StateBtn
            onClick={handleAddMeeting}
            icon={<BiPlus size={20} />}
            text={t.NewMeeting}
            className="bg-[#F0F6F6] w-[150px]"
          />
          <TabelSelect setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
      </div>

      {activeTab === "list" ? (
        <div className="flex flex-col gap-4">
          <TableOver
            columns={[
              { key: "title", label: t.meetingTitle },
              { key: "importance", label: t.importance },
              { key: "date", label: `${t.date} & ${t.time}` },
            ]}
            onRowClick={(id) => navigate(`/admin/upcomingDetails/${id}`)}
            data={paginatedMeetings}
          />

          {totalPages > 1 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-center mt-4"
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
        </div>
      ) : (
        <Calendar 
          meetingsData={filteredMeetingsForCalendar} 
          currentWeek={weeks[currentWeekIndex]} 
        />
      )}
    </section>
  );
}
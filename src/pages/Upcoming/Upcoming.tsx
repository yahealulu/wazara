import { useTranslation } from '../../hooks/useTranslation';
import { useMemo, useState, useEffect } from "react";
import PeriodSelector from "../../components/PerformanceAnalytics/PeriodSelector";
import StateBtn from "../../components/ui/Buttons/StateBtn";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import TabelSelect from "../../components/TabelSelect/TabelSelect";
import TableOver from "../../components/IncomingRequests/TabelOver";
import Calendar from "../../components/Calendar/Calendar";
import { meetings, meetingsData } from "../../data/tabel";
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import { getWeeksFromDate } from '../../utils/getWeeksOfMonth';
import Pagination from '../../components/Pagination/Pagination';
import { motion } from "framer-motion";

export default function Upcoming() {
  const t = useTranslation();
  const periodOptions = [t.today, t.tomorrow, t.week, t.month];
  const [period, setPeriod] = useState(t.today);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list');
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // توليد الأسابيع بدءاً من اليوم
  const weeks = useMemo(() => {
    const today = new Date();
    console.log('Generating weeks from today:', today);
    const generatedWeeks = getWeeksFromDate(today, 52);
    console.log('Generated weeks:', generatedWeeks.map(w => ({
      week: w.week,
      start: w.startDate.toDateString(),
      end: w.endDate.toDateString(),
      days: w.days.map(d => d.toDateString())
    })));
    return generatedWeeks;
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
        console.log('Found current week at index:', currentWeekIndex);
      }
    }
  }, [weeks]);

  const handleAddMeeting = () => {
    navigate("/admin/addNewMeeting");
  };

  // دالة محسنة لتصفية الاجتماعات حسب الأسبوع
  const getMeetingsByWeek = (weekIndex: number) => {
    if (!weeks[weekIndex]) {
      console.log('Week not found at index:', weekIndex);
      return [];
    }

    const currentWeek = weeks[weekIndex];
    console.log(`Filtering meetings for week ${weekIndex}:`, {
      weekRange: `${currentWeek.startDate.toDateString()} to ${currentWeek.endDate.toDateString()}`,
      days: currentWeek.days.map(d => d.toDateString())
    });

    const filteredMeetings = meetingsData.filter(m => {
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

      if (isInWeek) {
        console.log('Found meeting:', m, 'for date:', meetingDate.toDateString());
      }

      return isInWeek;
    });

    console.log(`Found ${filteredMeetings.length} meetings for week ${weekIndex}`);
    return filteredMeetings;
  };

  // البيانات المراد عرضها في الكاليندر
  const filteredMeetingsForCalendar = useMemo(
    () => getMeetingsByWeek(currentWeekIndex),
    [currentWeekIndex, weeks]
  );

  const getMeetingsByPeriod = (period: string) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    switch (period) {
      case t.today:
        return meetings.filter(
          m => m.date && new Date(m.date).toDateString() === today.toDateString()
        );
      case t.tomorrow:
        return meetings.filter(
          m => m.date && new Date(m.date).toDateString() === tomorrow.toDateString()
        );
      case t.week:
        {
          const currentWeekNumber = 1;   
          return meetings.filter(m => m.week === currentWeekNumber);
        }

      case t.month:{
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        return meetings.filter(m => m.date && new Date(m.date).getMonth() === currentMonth && new Date(m.date).getFullYear() === currentYear);
      }

      default:
        return meetings;
    }
  };

  const filteredMeetings = useMemo(() => getMeetingsByPeriod(period), [period]);

  const paginatedMeetings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredMeetings.slice(startIndex, endIndex);
  }, [currentPage, filteredMeetings]);

  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);

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
import { useState, useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { useLocalization } from "../../contexts/LocalizationContext";
import StateBtn from "../ui/Buttons/StateBtn";

interface ModalProps {
  title: string;
  p?: string;
  btnState: string;
  btnStateColor: string;
  isOpen: boolean;
  onCancel: () => void;
  // Added prop for the meeting date
  meetingDate?: string;
}

const times = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
];

function getLocalizedTime(language: string, time: string) {
  const timesMap: Record<string, { en: string; ar: string }> = {
    "9:00 AM": { en: "9:00 AM", ar: "٩:٠٠ ص" },
    "9:30 AM": { en: "9:30 AM", ar: "٩:٣٠ ص" },
    "10:00 AM": { en: "10:00 AM", ar: "٠٠:٠٠ ص" },
    "10:30 AM": { en: "10:30 AM", ar: "٠٠:٣٠ ص" },
    "11:00 AM": { en: "11:00 AM", ar: "٠٠:٠٠ ص" },
    "11:30 AM": { en: "11:30 AM", ar: "٠٠:٣٠ ص" },
    "12:00 PM": { en: "12:00 PM", ar: "٠٠:٠٠ م" },
    "12:30 PM": { en: "12:30 PM", ar: "٠٠:٣٠ م" },
  };
  return language === "ar" ? timesMap[time]?.ar || time : timesMap[time]?.en || time;
}

export default function ScheduleModal({
  title,
  p,
  btnState,
  btnStateColor,
  isOpen,
  onCancel,
  meetingDate,
}: ModalProps) {
  const t = useTranslation();
  const { language } = useLocalization();
  
  // Set initial date to meetingDate if provided, otherwise use today
  const initialDate = meetingDate ? new Date(meetingDate) : new Date();
  const today = new Date();

  const [dateTime, setDateTime] = useState<{ date?: string; time?: string }>({
    date: meetingDate || initialDate.toISOString().split("T")[0]
  });
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [calendarDays, setCalendarDays] = useState<(number | null)[]>([]);

  const monthNames = [
    t.january,
    t.february,
    t.march,
    t.april,
    t.may,
    t.june,
    t.july,
    t.august,
    t.september,
    t.october,
    t.november,
    t.december,
  ];

  const dayNames = [t.su, t.mo, t.tu, t.we, t.th, t.fr, t.sa];

  // ✅ توليد تقويم الشهر الحالي
  const generateCalendar = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    setCalendarDays(days);
  };

  useEffect(() => {
    generateCalendar(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth((m) => m + 1);
  };

  const selectDate = (day: number) => {
    const selected = new Date(currentYear, currentMonth, day);
    // Prevent selecting previous dates
    const todayWithoutTime = new Date();
    todayWithoutTime.setHours(0, 0, 0, 0);
    if (selected < todayWithoutTime) {
      return;
    }
    setDateTime({
      ...dateTime,
      date: selected.toISOString().split("T")[0],
    });
  };

  // Check if a date is in the past
  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayWithoutTime = new Date();
    todayWithoutTime.setHours(0, 0, 0, 0);
    return date < todayWithoutTime;
  };

  // Check if a date is the meeting date
  const isMeetingDate = (day: number) => {
    if (!meetingDate) return false;
    const date = new Date(currentYear, currentMonth, day);
    const meetingDateObj = new Date(meetingDate);
    return date.toDateString() === meetingDateObj.toDateString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] p-6 rounded-[20px] flex flex-col gap-8 border border-borderColor shadow-lg shadow-black/10">
        {/* العنوان والنص */}
        <div>
          <h2 className="text-lg font-semibold mb-2">{t[title as keyof typeof t] || title}</h2>
          {p && <p className="text-gray-600 text-sm">{t[p as keyof typeof t] || p}</p>}
        </div>

        {/* التقويم + أوقات المواعيد */}
        <div className="grid grid-cols-2 gap-6">
          {/* التقويم */}
          <div className="scale-90">
            <div className="flex justify-between items-center mb-2">
              <button
                type="button"
                onClick={prevMonth}
                className="text-3xl font-bold text-[#002624] hover:text-[#01534f] focus:outline-none"
              >
                &lt;
              </button>
              <span className="font-medium text-gray-800">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="text-3xl font-bold text-[#002624] hover:text-[#01534f] focus:outline-none"
              >
                &gt;
              </button>
            </div>

            <div className="grid grid-cols-7 text-center font-medium mb-1 text-gray-600 text-sm">
              {dayNames.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {calendarDays.map((day, idx) =>
                day ? (
                  <div
                    key={idx}
                    onClick={() => !isPastDate(day) && selectDate(day)}
                    className={`
                      cursor-pointer flex items-center justify-center 
                      w-8 h-8 mx-auto rounded-full text-sm transition-all
                      ${
                        dateTime.date ===
                        new Date(currentYear, currentMonth, day)
                          .toISOString()
                          .split("T")[0]
                          ? "bg-[#002624] text-white"
                          : isMeetingDate(day)
                          ? "border-2 border-[#002624] text-[#002624]"
                          : isPastDate(day)
                          ? "text-gray-300 cursor-not-allowed"
                          : day === today.getDate() &&
                            currentMonth === today.getMonth() &&
                            currentYear === today.getFullYear()
                          ? "border-2 border-[#002624] text-[#002624]"
                          : "hover:bg-[#002624] hover:text-white"
                      }
                    `}
                  >
                    {day}
                  </div>
                ) : (
                  <div key={idx}></div>
                )
              )}
            </div>
          </div>

          {/* أوقات المواعيد */}
          <div className="scale-90">
            <div className="flex flex-col gap-2">
              {times.map((time) => (
                <div
                  key={time}
                  className={`cursor-pointer border rounded-lg p-2 text-center text-sm transition-all ${
                    dateTime.time === time
                      ? "bg-[#002624] text-white"
                      : "hover:bg-[#002624] hover:text-white"
                  }`}
                  onClick={() => setDateTime({ ...dateTime, time })}
                >
                  {getLocalizedTime(language, time)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* أزرار الأكشن */}
        <div className="flex justify-end gap-4">
          <StateBtn
            text={t.cancel}
            onClick={onCancel}
            className="bg-transparent border border-gray-300 text-gray-600 w-[94px]"
          />
          <StateBtn
            text={btnState}
            className={`${btnStateColor} w-[300px]`}
          />
        </div>
      </div>
    </div>
  );
}
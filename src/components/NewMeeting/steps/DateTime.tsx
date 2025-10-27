import React, { useState, useEffect } from "react";
import { useTranslation } from "../../../hooks/useTranslation";

interface DateTimeProps {
  onNext: () => void;
  onPrev: () => void;
  onUpdate: (data: any) => void;
  initialData: any;
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

const DateTime: React.FC<DateTimeProps> = ({
  onNext,
  onPrev,
  onUpdate,
  initialData,
}) => {
  const [dateTime, setDateTime] = useState(initialData);
  const today = new Date();
  const t = useTranslation();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
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

  useEffect(() => {
    onUpdate(dateTime);
  }, [dateTime]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const selectDate = (day: number) => {
    const selected = new Date(currentYear, currentMonth, day);
    setDateTime({
      ...dateTime,
      date: selected.toISOString().split("T")[0],
    });
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else setCurrentMonth(currentMonth + 1);
  };

  return (
    <form onSubmit={handleNext}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {t.preferedDateTimeTitle}
      </h2>
      <p className="text-sm text-gray-500 mb-6">{t.preferedDateTimeSubTitle}</p>

      <div className="grid grid-cols-2 gap-6">
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
                  onClick={() => selectDate(day)}
                  className={`
                    cursor-pointer flex items-center justify-center 
                    w-8 h-8 mx-auto rounded-full text-sm transition-all
                    ${
                      dateTime.date ===
                      new Date(currentYear, currentMonth, day)
                        .toISOString()
                        .split("T")[0]
                        ? "bg-[#002624] text-white"
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

        <div className="scale-90">
          <div className="flex flex-col gap-2">
            {times.map((t) => (
              <div
                key={t}
                className={`cursor-pointer border rounded-lg p-2 text-center text-sm transition-all ${
                  dateTime.time === t
                    ? "bg-[#002624] text-white"
                    : "hover:bg-[#002624] hover:text-white"
                }`}
                onClick={() => setDateTime({ ...dateTime, time: t })}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onPrev}
          className="border px-6 py-2 rounded-lg mr-3 text-gray-700 hover:bg-gray-100"
        >
          {t.back}
        </button>
        <button
          type="submit"
          className="bg-[#002624] text-white px-24 py-2 rounded-lg hover:bg-[#01534f]"
        >
          {t.next}
        </button>
      </div>
    </form>
  );
};

export default DateTime;

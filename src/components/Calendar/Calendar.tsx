import React, { useMemo } from "react";
import MeetingCard from "../ui/Cards/MeetingCard";
import type { WeekRange } from "../../utils/getWeeksOfMonth";
import type { MeetingCalender } from "../../types";

interface CalendarProps {
  meetingsData: MeetingCalender[];
  currentWeek: WeekRange;
}

export default function Calendar({ meetingsData, currentWeek }: CalendarProps) {
  // أوقات الجدول
  const times = ["09:00", "09:30", "10:00", "10:30", "11:00"];

  // أيام الأسبوع مع تحويلها لتاريخ كامل
  const days = useMemo(() => {
    console.log('Calendar - Current Week Days:', currentWeek.days.map(d => d.toDateString()));
    console.log('Calendar - Meetings Data:', meetingsData);
    
    return currentWeek.days.map((date) => ({
      dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
      fullDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()), // منتصف الليل
      displayDate: `${date.getDate()}/${date.getMonth() + 1}`,
    }));
  }, [currentWeek]);

  // دالة مساعدة للبحث عن الاجتماعات
  const findMeetingForSlot = (date: Date, time: string) => {
    const normalizedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const meeting = meetingsData.find((m) => {
      if (!m.date) return false;

      const meetingDate = new Date(m.date);
      const normalizedMeetingDate = new Date(
        meetingDate.getFullYear(),
        meetingDate.getMonth(),
        meetingDate.getDate()
      );

      const dateMatch = normalizedMeetingDate.getTime() === normalizedDate.getTime();
      const timeMatch = m.time === time;

      if (dateMatch && timeMatch) {
        console.log('Found meeting match:', {
          meeting: m,
          slotDate: normalizedDate.toDateString(),
          slotTime: time,
          meetingDate: normalizedMeetingDate.toDateString(),
          meetingTime: m.time
        });
      }

      return dateMatch && timeMatch;
    });

    return meeting;
  };

  return (
    <div className="w-full overflow-hidden border border-gray-200 rounded-2xl shadow-sm bg-[#FAFAFA]">
      {/* Header Row */}
      <div
        style={{
          gridTemplateColumns: `8.3% repeat(${days.length}, ${(100 - 8.3) / days.length}%)`,
        }}
        className="grid bg-[#F0F6F6] rounded-t-2xl"
      >
        <div className="h-[52px] w-[8.3%]"></div>
        {days.map((d, i) => (
          <div
            key={i}
            className="flex justify-center items-center font-semibold text-[13px] text-[#737373] py-3 border-l border-gray-100"
          >
            {d.dayName} {d.displayDate}
          </div>
        ))}
      </div>

      {/* Time + Cells */}
      <div
        style={{
          gridTemplateColumns: `8.3% repeat(${days.length}, ${(100 - 8.3) / days.length}%)`,
        }}
        className="grid"
      >
        {times.map((time, rowIdx) => (
          <React.Fragment key={rowIdx}>
            {/* عمود الوقت */}
            <div className="flex justify-center min-h-[128px] items-center bg-[#F0F6F6] text-sm text-[#737373] border-t border-borderColor font-medium">
              {time}
            </div>

            {/* الأعمدة اليومية */}
            {days.map((d, colIdx) => {
              const meeting = findMeetingForSlot(d.fullDate, time);

              return (
                <div
                  key={colIdx}
                  className="border-t border-l border-gray-100 flex justify-center items-start"
                >
                  {meeting && <MeetingCard meeting={meeting} />}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { WeekRange } from "../../utils/getWeeksOfMonth";

interface CalendarHeaderProps {
  currentWeekIndex: number;
  setCurrentWeekIndex: (i: number) => void;
  weeks: WeekRange[];
}

export default function CalendarHeader({
  currentWeekIndex,
  setCurrentWeekIndex,
  weeks,
}: CalendarHeaderProps) {
  const current = weeks[currentWeekIndex];

  const handlePrev = () => {
    if (currentWeekIndex > 0) setCurrentWeekIndex(currentWeekIndex - 1);
  };

  const handleNext = () => {
    if (currentWeekIndex < weeks.length - 1)
      setCurrentWeekIndex(currentWeekIndex + 1);
  };
const formatWeekRange = (startDate: Date, endDate: Date) => {
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const startMonth = startDate.getMonth() + 1;
  const endMonth = endDate.getMonth() + 1;

  return startMonth === endMonth
    ? `${startDay}-${endDay}\\${startMonth}`
    : `${startDay}\\${startMonth}-${endDay}\\${endMonth}`;
};
  return (
    <div className="border rounded-xl  border-borderColor flex items-center">
      <button
        onClick={handlePrev}
        className="w-12 h-12 flex justify-center items-center"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="flex-1 py-[15px] px-[57px] font-semibold text-center text-sm">
        <p>
            Week {currentWeekIndex + 1} ({formatWeekRange(current.startDate, current.endDate)})        </p>
      </div>

      <button
        onClick={handleNext}
        className="w-12 h-12 flex justify-center items-center"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

import icone from "../../assets/adminIcon/Vector.png";
import PeriodSelector from "./PeriodSelector";
import { useTranslation } from '../../hooks/useTranslation';

interface PerformanceAnalyticsTimeProps {
  time: string;
  selected: string;
  onChange: (period : string) => void;
}

export default function PerformanceAnalyticsTime({
  time,
  selected,
  onChange,
}: PerformanceAnalyticsTimeProps) {
  const t = useTranslation();
  
  // Map English period names to translated versions
  const getTimeLabel = (period: string) => {
    switch(period) {
      case "Today": return t.today;
      case "Last Week": return t.thisWeek;
      case "Last Month": return t.thisMonth;
      default: return period;
    }
  };
  
  // Updated period options to match the requirement
  const periodOptions = [t.today, t.thisWeek, t.thisMonth];
  
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex items-center gap-3">
        <div className="w-13 h-13 bg-[#F0F6F6] rounded-xl flex items-center justify-center">
          <img src={icone} alt="vector" className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold">{t.performanceAnalytics}</h2>
          <p className="text-[#737373] mt-1">{getTimeLabel(time)}</p>
        </div>
      </div>
      <PeriodSelector
        selected={getTimeLabel(selected)}
        onChange={(newPeriod) => {
          // Map translated period back to English for internal logic
          let englishPeriod = newPeriod;
          
          if (newPeriod === t.today) {
            englishPeriod = "Today";
          } else if (newPeriod === t.thisWeek) {
            englishPeriod = "Last Week";
          } else if (newPeriod === t.thisMonth) {
            englishPeriod = "Last Month";
          }
          
          onChange(englishPeriod);
        }}
        options={periodOptions}
      />
    </div>
  );
}
import PerformanceAnalyticsTime from "./PerformanceAnalyticsTime";
import PerformanceAnalyticsData from "./PerformanceAnalyticsData";

type PerformanceAnalyticsProps = {
  period: string;
  onPeriodChange: (period : string) => void;
};
export default function PerformanceAnalytics({period , onPeriodChange} : PerformanceAnalyticsProps) {

  return (
    <div className=" p-10 w-full rounded-2xl flex flex-col gap-8 border border-[#F5F5F5]  shadow shadow-black/5">
      <PerformanceAnalyticsTime time={period} selected={period} onChange={onPeriodChange} />
      <PerformanceAnalyticsData period={period}/>
    </div>
  )
}

import { data } from "../../data/data";
import { useTranslation } from "../../hooks/useTranslation";

interface PerformanceAnalyticsDataProps {
  period: string;
}

export default function PerformanceAnalyticsData({ period }: PerformanceAnalyticsDataProps) {
  const t = useTranslation();
  const selectedData = data[period] || []; 

  return (
    <div className="flex justify-between mt-6">
      {selectedData.map((item, index) => (
        <div
          key={item.title}
          className={`flex w-1/3 flex-col gap-1 items-center px-6 ${
            index !== 0 ? "ltr:border-l rtl:border-r border-gray-200 dark:border-gray-700" : ""
          }`}
        >
          <p className="text-xl font-medium text-center">
            {item.value} {(t as any)[item.title] }
          </p>
          <p className="text-sm text-[#737373] text-center">
            {(t as any)[item.p] }
          </p>
        </div>
      ))}
    </div>
  );
}

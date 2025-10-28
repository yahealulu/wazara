import { useState, useEffect } from "react";
import api from "../../services/axiosConfig";
import { useTranslation } from "../../hooks/useTranslation";

// Define the API response type
interface AnalyticsData {
  period: string;
  completed_meetings: number;
  upcoming_meetings: number;
  visitors_checked_in: number;
}

interface AnalyticsDataProps {
  period: string;
}

export default function AnalyticsData({ period }: AnalyticsDataProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslation();

  // Map UI period to API period values
  const periodMap: Record<string, string> = {
    "Today": "today",
    "Last Week": "last_week",
    "Last Month": "last_month",
    [t.today]: "today",
    [t.thisWeek]: "last_week",
    [t.thisMonth]: "last_month"
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get the API period value
        const apiPeriod = periodMap[period] || "today";
        
        // Fetch data from API
        const response = await api.get<AnalyticsData>(
          `/appointments/api/admin/analytics/?period=${apiPeriod}`
        );
        
        setAnalyticsData(response.data);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [period, t.today, t.thisWeek, t.thisMonth]);

  if (loading) {
    return (
      <div className="flex justify-between mt-6">
        <div className="flex w-1/3 flex-col gap-1 items-center px-6">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mt-2"></div>
        </div>
        <div className="flex w-1/3 flex-col gap-1 items-center px-6 border-l border-gray-200 dark:border-gray-700">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mt-2"></div>
        </div>
        <div className="flex w-1/3 flex-col gap-1 items-center px-6 border-l border-gray-200 dark:border-gray-700">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mt-2"></div>
        </div>
      </div>
    );
  }

  if (error || !analyticsData) {
    return (
      <div className="flex justify-center mt-6">
        <p className="text-red-500">{error || "Failed to load analytics data"}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-between mt-6">
      <div className="flex w-1/3 flex-col gap-1 items-center px-6">
        <p className="text-xl font-medium text-center">
          {analyticsData.completed_meetings} {t.meetings}
        </p>
        <p className="text-sm text-[#737373] text-center">
          {t.Complete}
        </p>
      </div>
      <div className="flex w-1/3 flex-col gap-1 items-center px-6 border-l border-gray-200 dark:border-gray-700">
        <p className="text-xl font-medium text-center">
          {analyticsData.upcoming_meetings} {t.meetings}
        </p>
        <p className="text-sm text-[#737373] text-center">
          {t.Upcoming}
        </p>
      </div>
      <div className="flex w-1/3 flex-col gap-1 items-center px-6 border-l border-gray-200 dark:border-gray-700">
        <p className="text-xl font-medium text-center">
          {analyticsData.visitors_checked_in} {t.visitors}
        </p>
        <p className="text-sm text-[#737373] text-center">
          {t.checkedIn}
        </p>
      </div>
    </div>
  );
}
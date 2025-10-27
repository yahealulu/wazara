import { useTranslation } from "../../hooks/useTranslation";

interface MeetingStatusProps {
  status: "accepted" | "rejected" | "pending" | string;
}

export default function MeetingStatus({ status }: MeetingStatusProps) {
  const t = useTranslation();

  // 🔹 تعيين الألوان حسب الحالة
  const statusStyles: Record<string, { bg: string; text: string }> = {
    accepted: { bg: "#D9F7E7", text: "#0C994C" },
    rejected: { bg: "#FDECEC", text: "#DE4C3C" },
    pending: { bg: "#FFF4E5", text: "#F7A600" },
  };

  const currentStyle = statusStyles[status.toLowerCase()] || {
    bg: "#E5E5E5",
    text: "#333333",
  };

  return (
    <div className="flex justify-between items-center">
      <p>{t.status}</p>
      <p
        className="px-3 py-1 rounded-full text-sm font-medium"
        style={{
          backgroundColor: currentStyle.bg,
          color: currentStyle.text,
        }}
      >
        {status}
      </p>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';
import type { MeetingCardProps } from '../../../types';


export default function MeetingCard({ meeting }: MeetingCardProps) {
  const t = useTranslation();
  const statusColor =
    meeting.status === "Accepted"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/admin/upcomingDetails/${meeting.id}`)}  className="p-4  flex flex-col justify-between gap-6 h-[128px]  border border-borderColor w-full rounded-xl bg-white shadow-sm">
      <div>
        <p className="font-semibold mb-1 text-sm">{meeting.title}</p>
        <p className="text-[#737373] text-xs">{meeting.visitor}</p>
      </div>

      <div
        className={`text-center text-sm h-[28px] font-medium rounded-xl py-1 ${statusColor}`}
      >
        {meeting.status === "Accepted" ? t.accepted : t.canceled}
      </div>
    </div>
  );
}

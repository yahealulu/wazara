import { BsChevronLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useTranslation } from '../../../hooks/useTranslation';

export default function MeetingDetailsHead({path} : {path : string;}) {
  const t = useTranslation();

  return (
    <div className="flex items-center gap-4">
      <NavLink to={path} className={`p-2 flex justify-center items-center w-10 h-10 rounded-xl border border-borderColor`}>
        <BsChevronLeft className="w-6 h-6" />
      </NavLink>
      <p className="text-base">{t.meetingDetails}</p>
    </div>
  )
}
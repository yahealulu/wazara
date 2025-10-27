import { BiCalendar } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import StateBtn from "../../components/ui/Buttons/StateBtn";
import { useState } from "react";
import SchaduleModel from "../../components/Modal/SchaduleModel";
import { useTranslation } from "../../hooks/useTranslation";

export default function MeetingDateTime({ isUpcoming , day , time }: { isUpcoming: boolean , day : string ; time : string;}) {
  const [openModal, setOpenModal] = useState(false);
  const t = useTranslation();

  // Extract date from the day string (e.g., "Tuesday, 30 Sep" -> "2023-09-30")
  const extractDate = (dayString: string): string => {
    // Parse the day string like "Tuesday, 30 Sep"
    const parts = dayString.split(', ');
    if (parts.length < 2) return new Date().toISOString().split('T')[0];
    
    const datePart = parts[1]; // "30 Sep"
    const dateParts = datePart.split(' ');
    if (dateParts.length < 2) return new Date().toISOString().split('T')[0];
    
    const dayNum = parseInt(dateParts[0]);
    const monthName = dateParts[1];
    
    // Map month names to numbers (assuming English for now)
    const monthMap: Record<string, number> = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    
    const monthNum = monthMap[monthName];
    if (monthNum === undefined) return new Date().toISOString().split('T')[0];
    
    // Create date for current year (or you could pass the year as well)
    const currentDate = new Date();
    const date = new Date(currentDate.getFullYear(), monthNum, dayNum);
    
    return date.toISOString().split('T')[0];
  };

  const meetingDate = extractDate(day);

  return (
    <div className="flex justify-between items-center w-full">
      <p>{t.dateTime}</p>
      <div className="flex justify-center gap-4 items-center">
        <div className="flex items-center gap-2">
          <BiCalendar size={20} />
          <p>{day}</p>
        </div>

        <div className="w-[1px] bg-black h-5"></div>

        <div className="flex items-center gap-2">
          <BsClock size={20} />
          <p>{time}</p>
        </div>

        {isUpcoming && (
          <StateBtn
            text={t.reschedule}
            onClick={() => setOpenModal(true)}
            className="bg-[#F0F6F6] w-[109px]"
          />
        )}
      </div>
      <SchaduleModel 
        onCancel={()=> setOpenModal(false)}
        isOpen={openModal}
        title="rescheduleMeeting"
        p="chooseNewDateTime"
        btnState={t.saveChanges}
        btnStateColor="bg-Primary text-white"
        meetingDate={meetingDate}
      />
    </div>
  );
}
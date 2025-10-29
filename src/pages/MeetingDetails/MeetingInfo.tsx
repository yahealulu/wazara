import {  BiDownload, BiPencil } from "react-icons/bi";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import StateBtn from "../../components/ui/Buttons/StateBtn";
import ActionModalAdmin from "../../components/Modal/ActionModalAdmin";
import { useTranslation } from "../../hooks/useTranslation";
import MeetingDateTime from "./MeetingDateTime";
import ActionButtonsOverview from "../../components/ui/Buttons/ActionButtonsOverview";
import { format } from "date-fns";

// Define the API response type
interface AppointmentAttachment {
  id: string;
  appointment: string;
  name: string;
  file_url: string;
  file: string | null;
  uploaded_at: string;
}

interface Requester {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
}

interface Appointment {
  id: string;
  requester_user_id: string;
  assignee_user_id: string | null;
  subject: string;
  purpose: string;
  importance: string;
  attendees_count: number;
  preferred_slot: string;
  confirmed_slot: string | null;
  duration_min: number;
  start_at: string;
  end_at: string;
  status: string;
  priority: string;
  is_special: boolean;
  qr_token: string | null;
  qr_uuid: string;
  qr_token_hash: string;
  qr_expires_at: string | null;
  qr_link: string | null;
  qr_link_token: string | null;
  requester: Requester;
  notes_summary: string;
  last_edit_request_message: string;
  last_edit_requested_at: string | null;
  visitor_description: string;
  scheduled_by_user_id: string | null;
  scheduled_by_role: string;
  rescheduled_from: string | null;
  attachments: AppointmentAttachment[];
  intro_files: any[];
  presentation_files: any[];
  reason: string | null;
  created_at: string;
  updated_at: string;
}

interface MeetingInfoProps {
  appointment?: Appointment | null;
}

export default function MeetingInfo({ appointment }: MeetingInfoProps) {
  const [openModal, setOpenModal] = useState<"reject" | "edit" | null>(null);
  const location = useLocation();
  const t = useTranslation();

  const isPreviousDetails = location.pathname.startsWith("/admin/previousDetails/");
  const isUpcoming = location.pathname.startsWith("/admin/upcomingDetails/");

  // Format date and time for display if appointment data is available
  let formattedDate = "Tuesday, 30 Sep";
  let formattedTime = "2:00 PM";
  let status = "Accepted";
  
  if (appointment) {
    formattedDate = format(new Date(appointment.start_at), 'EEEE, d MMM');
    formattedTime = format(new Date(appointment.start_at), 'h:mm a');
    status = appointment.status;
  }

  // 🔹 تعريف كل حالة داخل كائن واحد
  const actionsConfig = {
    previous: (
      <>
        <StateBtn
          text={t.exportAsFile}
          icon={<BiDownload size={20} />}
          className="text-white bg-Primary w-[155px]"
        />
      </>
    ),
    upcoming: (
      <>
        <StateBtn
          text={'Cancel Meeting'}
          className="border w-[135px]"
        />
      </>
    ),
    request: (
      <div className="flex items-center gap-4">
        <StateBtn
          text={t.reject}
          onClick={() => setOpenModal("reject")}
          className="bg-[#DE4C3C] text-white w-[75px]"
        />
        <ActionButtonsOverview
          onAccept={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Handle accept action - don't navigate
            console.log("Accept action");
          }}
          onPrimary={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Handle primary action if needed
            console.log("Primary action");
          }}
          onReject={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Handle reject action if needed
            console.log("Reject action");
          }}
        />
        <StateBtn
          icon={<BiPencil size={20} />}
          onClick={() => setOpenModal("edit")}
          text={t.requestAnEdit}
          className="text-Primary bg-[#F0F6F6] w-[169px]"
        />
      </div>
    ),
  };

  // 🔹 تحديد الحالة الحالية ديناميكيًا
  const currentActions = isPreviousDetails
    ? actionsConfig.previous
    : isUpcoming
    ? actionsConfig.upcoming
    : actionsConfig.request;

  return (
    <div className="flex flex-col gap-8">
      {/* العنوان + الأزرار */}
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl font-semibold">{appointment?.subject || t.meetingsTitle}</h2>
        {currentActions}
      </div>

      {/* حالة الاجتماعات السابقة */}
      {isPreviousDetails || isUpcoming && (
        <div className="flex justify-between">
          <p>{t.status}</p>
          <p className=" px-3 py-1 rounded-full text-sm font-medium text-[#0C994C]">
            {status}
          </p>
        </div>
      )}
      <MeetingDateTime day={formattedDate} time={formattedTime} isUpcoming={isUpcoming}/>


      {/* المودال */}
      <ActionModalAdmin
        Letters=""
        isOpen={openModal !== null}
        title={
          openModal === "reject" ? t.rejectThisRequest : t.requestAnEdit
        }
        p={
          openModal === "reject"
            ? t.youAreAboutToReject
            : t.sendAMessage
        }
        placeholder={
          openModal === "reject"
            ? t.letVisitorKnowRejection
            : t.letVisitorKnowEdit
        }
        label={openModal === "reject" ? t.rejectionCauseOptional : t.message}
        btnState={openModal === "reject" ? t.reject : t.send}
        btnStateColor={
          openModal === "reject"
            ? "bg-[#DE4C3C] text-white"
            : "bg-Primary text-white"
        }
        onCancel={() => setOpenModal(null)}
      />
    </div>
  );
}
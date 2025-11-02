import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminTabs from "../../components/AdminTabs/AdminTabs";
import MeetingDetailsHead from "../../components/ui/HeaderDash/MeetingDetailsHead";
import MeetingInfo from "./MeetingInfo";
import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import Goals from "../../components/AdminTabs/Goals";
import Attendance from "../../components/AdminTabs/Attendance";
import Links from "../../components/AdminTabs/Links";
import api from "../../services/axiosConfig";

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

// New component to display appointment details
const AppointmentDetails = ({ appointment }: { appointment: Appointment }) => {
  const t = useTranslation();
  
  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };
  
  // Function to render a detail item
  const renderDetailItem = (label: string, value: string | number | null | undefined) => {
    if (!value) return null;
    return (
      <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="font-medium text-gray-600">{label}:</span>
        <span className="text-gray-800">{value}</span>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5F5F5]">
      <h3 className="text-lg font-semibold mb-4">{t.meetingDetails}</h3>
      
      <div className="space-y-3">
        {renderDetailItem(t.subject, appointment.subject)}
        {renderDetailItem(t.purpose, appointment.purpose)}
        {renderDetailItem(t.importance, appointment.importance)}
        {renderDetailItem(t.attendeesCount, appointment.attendees_count)}
        {renderDetailItem(t.preferredSlot, appointment.preferred_slot ? formatDate(appointment.preferred_slot) : null)}
        {renderDetailItem(t.confirmedSlot, appointment.confirmed_slot ? formatDate(appointment.confirmed_slot) : null)}
        {renderDetailItem(t.duration, `${appointment.duration_min} ${t.minutes}`)}
        {renderDetailItem(t.priority, appointment.priority)}
        {renderDetailItem(t.isSpecial, appointment.is_special ? t.yes : t.no)}
        {renderDetailItem(t.notesSummary, appointment.notes_summary)}
        {renderDetailItem(t.lastEditRequestMessage, appointment.last_edit_request_message)}
        {renderDetailItem(t.lastEditRequestedAt, appointment.last_edit_requested_at ? formatDate(appointment.last_edit_requested_at) : null)}
        {renderDetailItem(t.visitorDescriptionDetails, appointment.visitor_description)}
        {renderDetailItem(t.scheduledByRole, appointment.scheduled_by_role)}
        {renderDetailItem(t.meetingReasonsGoals, appointment.reason)}
        
        {/* Requester Information */}
        <div className="pt-4">
          <h4 className="font-semibold text-gray-700 mb-2">{t.requesterInformation}</h4>
          <div className="pl-4 space-y-2">
            {renderDetailItem(t.fullName, appointment.requester.full_name)}
            {renderDetailItem(t.email, appointment.requester.email)}
            {renderDetailItem(t.phoneNumber, appointment.requester.phone)}
            {renderDetailItem(t.role, appointment.requester.role)}
          </div>
        </div>
        
        {/* Attachments */}
        {appointment.attachments && appointment.attachments.length > 0 && (
          <div className="pt-4">
            <h4 className="font-semibold text-gray-700 mb-2">{t.attachments}</h4>
            <div className="pl-4">
              {appointment.attachments.map((attachment) => (
                <div key={attachment.id} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-800">{attachment.name}</span>
                  <a 
                    href={attachment.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {t.download}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Intro Files */}
        {appointment.intro_files && appointment.intro_files.length > 0 && (
          <div className="pt-4">
            <h4 className="font-semibold text-gray-700 mb-2">{t.introFilesDetails}</h4>
            <div className="pl-4">
              {appointment.intro_files.map((file: any) => (
                <div key={file.id} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-800">{file.title || file.file_url}</span>
                  <a 
                    href={file.file_url || file.file} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {t.view}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Presentation Files */}
        {appointment.presentation_files && appointment.presentation_files.length > 0 && (
          <div className="pt-4">
            <h4 className="font-semibold text-gray-700 mb-2">{t.presentationFilesDetails}</h4>
            <div className="pl-4">
              {appointment.presentation_files.map((file: any) => (
                <div key={file.id} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-800">{file.title || file.file_url}</span>
                  <a 
                    href={file.file_url || file.file} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {t.view}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function MeetingDetails() {
  const { id } = useParams<{ id: string }>();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslation();

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // Try to fetch the specific appointment by ID
        const response = await api.get<Appointment>(`/appointments/api/admin/requests/${id}/`);
        setAppointment(response.data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching appointment:", err);
        setError("Failed to load appointment details");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">{t.loading}</div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-500">{error || "Appointment not found"}</div>
      </div>
    );
  }

  const tabs = [
    { id: "details", label: t.meetingDetails, component: <AppointmentDetails appointment={appointment} /> },
    { id: "goals", label: t.goalsAndImportance, component: <Goals/> },
    { id: "attendance", label: t.attendance, component: <Attendance /> },
    { id: "Links & Attachments", label: t.linksAndAttachments, component: <Links /> },
  ];

  return (
    <motion.section 
      className="p-10 w-full rounded-2xl flex flex-col gap-10 border border-[#F5F5F5] shadow shadow-black/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <MeetingDetailsHead path="/admin/overview"/>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <MeetingInfo appointment={appointment} />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <AdminTabs tabs={tabs}/>
      </motion.div>
    </motion.section>
  )
}
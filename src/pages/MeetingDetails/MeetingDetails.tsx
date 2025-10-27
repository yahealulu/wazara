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
        const response = await api.get(`/appointments/api/admin/requests/${id}/`);
        setAppointment(response.data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching appointment:", err);
        // If the specific endpoint doesn't work, fall back to fetching all and filtering
        if (err.response?.status === 404) {
          try {
            const allResponse = await api.get(`/appointments/api/admin/requests/`);
            const appointments: Appointment[] = allResponse.data;
            const foundAppointment = appointments.find(app => app.id === id);
            
            if (foundAppointment) {
              setAppointment(foundAppointment);
              setError(null);
            } else {
              setError("Appointment not found");
            }
          } catch (fetchAllErr) {
            console.error("Error fetching all appointments:", fetchAllErr);
            setError("Failed to load appointment details");
          }
        } else {
          setError("Failed to load appointment details");
        }
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

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  const tabs = [
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
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import MeetingDetailsHead from '../../components/ui/HeaderDash/MeetingDetailsHead';
import AdminTabs from '../../components/AdminTabs/AdminTabs';
import MeetingTitle from '../MeetingDetails/MeetingTitle';
import MeetingStatus from '../MeetingDetails/MeetingStatus';
import MeetingDateTime from '../MeetingDetails/MeetingDateTime';
import Goals from '../../components/AdminTabs/Goals';
import Attendance from '../../components/AdminTabs/Attendance';
import { useTranslation } from '../../hooks/useTranslation';
import Intro from '../../components/AdminTabs/Intro';
import ActionModalAdmin from '../../components/Modal/ActionModalAdmin';
import ActionButtonsOverview from '../../components/ui/Buttons/ActionButtonsOverview';
import api from '../../services/axiosConfig';
import { format } from 'date-fns';

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

export default function UpcomingDetails() {
    const { id } = useParams<{ id: string }>();
    const [openModal, setOpenModal] = useState(false);
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const t = useTranslation();
    const tabs = [
        { id: "goals", label: t.goalsAndImportance, component: <Goals /> },
        { id: "attendance", label: t.attendance, component: <Attendance /> },
        { id: "Introduction", label: t.introduction, component: <Intro /> },
    ];

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

    if (error || !appointment) {
        return (
        <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-500">{error || "Appointment not found"}</div>
        </div>
        );
    }

    // Format date and time for display
    const formattedDate = format(new Date(appointment.start_at), 'EEEE, d MMM');
    const formattedTime = format(new Date(appointment.start_at), 'h:mm a');
    
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
                <MeetingDetailsHead path='/admin/upcoming'/>
            </motion.div>
            
            <motion.div
                className='flex flex-col gap-9'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-xl font-semibold">{t.meetingsTitle}</h2>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="border w-[135px] h-10 rounded-md"
                        >
                            {t.cancelMeeting}
                        </button>
                        <ActionButtonsOverview
                            onAccept={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log("Accept action in upcoming details");
                            }}
                            onPrimary={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log("Primary action in upcoming details");
                            }}
                            onReject={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log("Reject action in upcoming details");
                            }}
                        />
                    </div>
                </div>
                <MeetingTitle title={appointment.subject} />
                <MeetingStatus status={appointment.status}/>
                <MeetingDateTime day={formattedDate} time={formattedTime} isUpcoming={true}/>
            </motion.div>
            
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                <AdminTabs tabs={tabs}/>
            </motion.div>
            
            <ActionModalAdmin
                Letters={t.lettersCount}
                onCancel={()=>setOpenModal(false)}
                isOpen={openModal}
                title={t.cancelMeetingTitle}
                p={t.cancelMeetingDescription}
                placeholder={t.cancelMeetingPlaceholder}
                label={t.cancelMeetingLabel}
                btnState={t.cancelMeeting}
                btnStateColor='bg-[#DE4C3C] text-white'
            />
        </motion.section>
    )
}
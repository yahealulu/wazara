import { useState } from "react";
import StateBtn from "../ui/Buttons/StateBtn";
import { useTranslation } from '../../hooks/useTranslation';
import api from "../../services/axiosConfig";

interface ApprovalModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onApprove: (confirmedSlot: string) => void;
  appointmentId: string;
  initialDateTime: string;
}

export default function ApprovalModal({
  isOpen,
  onCancel,
  onApprove,
  appointmentId,
  initialDateTime,
}: ApprovalModalProps) {
  const t = useTranslation();
  const [date, setDate] = useState(initialDateTime ? initialDateTime.split('T')[0] : "");
  const [time, setTime] = useState(initialDateTime ? initialDateTime.split('T')[1].substring(0, 5) : "");
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate time options from 9:00 to 16:00 with 30-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 16; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Skip 16:30 as we only go up to 16:00
        if (hour === 16 && minute === 30) break;
        
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    return options;
  };

  if (!isOpen) return null;

  const handleApproveClick = async () => {
    if (!date || !time) return;
    
    try {
      setApproving(true);
      setError(null);
      
      // Combine date and time into ISO format
      const confirmedSlot = `${date}T${time}:00Z`;
      
      // Make the API call to approve the appointment
      await api.post(`/appointments/api/admin/requests/${appointmentId}/approve/`, {
        confirmed_slot: confirmedSlot
      });
      
      // Call the onApprove callback with the confirmed slot
      onApprove(confirmedSlot);
    } catch (err: any) {
      console.error("Error approving appointment:", err);
      setError(err.response?.data?.message || "Failed to approve appointment");
    } finally {
      setApproving(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={(e) => {
        // Close modal when clicking on the overlay (not the modal content)
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div 
        className="bg-white w-[900px] p-6 rounded-[20px] flex flex-col gap-8 border border-borderColor shadow-lg shadow-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold">{t.approve} {t.this} {t.request}?</h2>
          <p className="text-gray-600 mt-2">{t.chooseNewDateTime}</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Date and Time Picker */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.date}</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg w-full border border-borderColor p-3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.time}</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="rounded-lg w-full border border-borderColor p-3"
            >
              <option value="">Select Time</option>
              {generateTimeOptions().map((timeOption) => (
                <option key={timeOption} value={timeOption}>
                  {timeOption}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <StateBtn
            text={t.cancel}
            onClick={onCancel}
            className="bg-transparent border border-gray-300 text-gray-600 w-[94px]"
          />
          <StateBtn
            text={approving ? t.loading : t.approve}
            onClick={handleApproveClick}
            className={`${!date || !time || approving ? 'opacity-50 cursor-not-allowed' : ''} bg-[#0C994C] text-white w-[300px]`}
          />
        </div>
      </div>
    </div>
  );
}
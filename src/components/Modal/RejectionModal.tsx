import { useState } from "react";
import StateBtn from "../ui/Buttons/StateBtn";
import Input from "../ui/Input/Input";
import Label from "../ui/Label/Label";
import { useTranslation } from '../../hooks/useTranslation';
import api from "../../services/axiosConfig";

interface RejectionModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onReject: (reason: string) => void;
  appointmentId: string;
}

export default function RejectionModal({
  isOpen,
  onCancel,
  onReject,
  appointmentId,
}: RejectionModalProps) {
  const t = useTranslation();
  const [reason, setReason] = useState("");
  const [rejecting, setRejecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRejectClick = async () => {
    if (!reason.trim()) return;
    
    try {
      setRejecting(true);
      setError(null);
      
      // Make the API call to reject the appointment
      await api.post(`/appointments/api/admin/requests/${appointmentId}/reject/`, {
        reason: reason
      });
      
      // Call the onReject callback with the reason
      onReject(reason);
      setReason(""); // Clear the reason field
    } catch (err: any) {
      console.error("Error rejecting appointment:", err);
      setError(err.response?.data?.message || "Failed to reject appointment");
    } finally {
      setRejecting(false);
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
          <h2 className="text-lg font-semibold">{t.reject} {t.this} {t.request}?</h2>
          <p className="text-gray-600 mt-2">{t.yourAboutToReject}</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Reason input */}
        <div>
          <Label text={`${t.rejectionCause} (${t.optional})`} />
          <Input 
            type="text" 
            placeholder={t.letTheVisitorKnow} 
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <p className="text-gray-400 text-sm mt-1">0 / 300 Letters</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <StateBtn
            text={t.cancel}
            onClick={onCancel}
            className="bg-transparent border border-gray-300 text-gray-600 w-[94px]"
          />
          <StateBtn
            text={rejecting ? t.loading : t.reject}
            onClick={handleRejectClick}
            className={`${!reason.trim() || rejecting ? 'opacity-50 cursor-not-allowed' : ''} bg-[#DE4C3C] text-white w-[300px]`}
          />
        </div>
      </div>
    </div>
  );
}
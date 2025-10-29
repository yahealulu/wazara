import { useState } from "react";
import StateBtn from "../ui/Buttons/StateBtn";
import { useTranslation } from "../../hooks/useTranslation";

interface StaffAssignmentModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onAssign: (selectedStaffIds: string[]) => void;
}

// Mock staff data - in a real app this would come from an API or context
const mockStaffMembers = [
  { id: "1", name: "Ahmed Mohamed", role: "Staff Member" },
  { id: "2", name: "Fatima Ali", role: "Staff Member" },
  { id: "3", name: "Omar Hassan", role: "Staff Member" },
  { id: "4", name: "Aisha Khalid", role: "Staff Member" },
  { id: "5", name: "Youssef Mahmoud", role: "Staff Member" },
];

export default function StaffAssignmentModal({
  isOpen,
  onCancel,
  onAssign,
}: StaffAssignmentModalProps) {
  const t = useTranslation();
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleStaffToggle = (staffId: string) => {
    setSelectedStaff(prev => 
      prev.includes(staffId) 
        ? prev.filter(id => id !== staffId) 
        : [...prev, staffId]
    );
  };

  const handleAssignClick = () => {
    onAssign(selectedStaff);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] p-6 rounded-[20px] flex flex-col gap-6 border border-borderColor shadow-lg shadow-black/10">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Assign Staff</h2>
          <p className="text-gray-600 text-sm">Select staff members to assign to this meeting</p>
        </div>

        {/* Staff List */}
        <div className="max-h-80 overflow-y-auto">
          <div className="space-y-3">
            {mockStaffMembers.map((staff) => (
              <div 
                key={staff.id}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedStaff.includes(staff.id)
                    ? "border-[#002624] bg-[#002624]/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleStaffToggle(staff.id)}
              >
                <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                  selectedStaff.includes(staff.id)
                    ? "bg-[#002624] border-[#002624]"
                    : "border-gray-300"
                }`}>
                  {selectedStaff.includes(staff.id) && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-medium">{staff.name}</div>
                  <div className="text-sm text-gray-500">{staff.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <StateBtn
            text={t.cancel || "Cancel"}
            onClick={onCancel}
            className="bg-transparent border border-gray-300 text-gray-600 w-[120px]"
          />
          <StateBtn
            text="Assign"
            onClick={handleAssignClick}
            className={`${selectedStaff.length === 0 ? 'opacity-50 cursor-not-allowed' : ''} bg-[#002624] text-white w-[120px]`}
          />
        </div>
      </div>
    </div>
  );
}
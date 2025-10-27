import React, { useState } from "react";
import StaffAssignmentModal from "../../Modal/StaffAssignmentModal";

interface ActionButtonsOverviewProps {
  onAccept: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPrimary: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onReject: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ActionButtonsOverview({ onAccept, onPrimary, onReject }: ActionButtonsOverviewProps) {
  const [showStaffModal, setShowStaffModal] = useState(false);
  
  const handleAcceptClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowStaffModal(true);
  };
  
  const handleAssign = (selectedStaffIds: string[]) => {
    // Handle the staff assignment logic here
    setShowStaffModal(false);
    // We don't want to trigger navigation, so we don't call onAccept here
  };

  return (
    <>
      <div className="flex gap-2">
        {/* Accept button */}
        <button
          onClick={handleAcceptClick}
          className="flex items-center justify-center w-50 h-10 transition-all duration-200 focus:outline-none"
          aria-label="Accept"
        >
          <img 
            src="/src/assets/icons/Accept & Assign member.svg" 
            alt="Accept" 
            className="w-full h-full"
          />
        </button>
        
        {/* Primary button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onPrimary(e);
          }}
          className="flex items-center justify-center w-9 h-9 transition-all duration-200 focus:outline-none"
          aria-label="Primary"
        >
          <img 
            src="/src/assets/icons/Primary Button Lg.svg" 
            alt="Primary" 
            className="w-full h-full"
          />
        </button>
        
        {/* Reject button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onReject(e);
          }}
          className="flex items-center justify-center w-9 h-9 transition-all duration-200 focus:outline-none"
          aria-label="Reject"
        >
          <img 
            src="/src/assets/icons/Reject Icon Button.svg" 
            alt="Reject" 
            className="w-full h-full"
          />
        </button>
      </div>
      
      {/* Staff Assignment Modal */}
      <StaffAssignmentModal 
        isOpen={showStaffModal}
        onCancel={() => setShowStaffModal(false)}
        onAssign={handleAssign}
      />
    </>
  );
}
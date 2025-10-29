import React, { useState } from "react";
import StaffAssignmentModal from "../../Modal/StaffAssignmentModal";
import RejectionModal from "../../Modal/RejectionModal";
import ApprovalModal from "../../Modal/ApprovalModal";

interface ActionButtonsOverviewProps {
  onAccept: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPrimary: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onReject: (e: React.MouseEvent<HTMLButtonElement>) => void;
  appointmentId?: string;
  initialDateTime?: string;
}

export default function ActionButtonsOverview({ 
  appointmentId,
  initialDateTime
}: ActionButtonsOverviewProps) {
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  
  const handleAcceptClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowStaffModal(true);
  };
  
  const handleAssign = (selectedStaffIds: string[]) => {
    console.log("Assigned staff IDs:", selectedStaffIds);
    setShowStaffModal(false);
    // We don't want to trigger navigation, so we don't call onAccept here
  };

  const handleRejectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowRejectionModal(true);
  };

  const handleApproveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowApprovalModal(true);
  };

  const handleRejection = (reason: string) => {
    // Handle the rejection logic here
    console.log("Rejected with reason:", reason);
    setShowRejectionModal(false);
    // We don't want to trigger navigation, so we don't call onReject here
  };

  const handleApproval = (confirmedSlot: string) => {
    // Handle the approval logic here
    console.log("Approved with confirmed slot:", confirmedSlot);
    setShowApprovalModal(false);
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
        
        {/* Primary button (Approve) */}
        <button
          onClick={handleApproveClick}
          className="flex items-center justify-center w-9 h-9 transition-all duration-200 focus:outline-none"
          aria-label="Approve"
        >
          <img 
            src="/src/assets/icons/Primary Button Lg.svg" 
            alt="Approve" 
            className="w-full h-full"
          />
        </button>
        
        {/* Reject button */}
        <button
          onClick={handleRejectClick}
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
      {showStaffModal && (
        <StaffAssignmentModal 
          isOpen={showStaffModal}
          onCancel={() => setShowStaffModal(false)}
          onAssign={handleAssign}
        />
      )}
      
      {/* Rejection Modal */}
      {showRejectionModal && appointmentId && (
        <RejectionModal
          isOpen={showRejectionModal}
          onCancel={() => setShowRejectionModal(false)}
          onReject={handleRejection}
          appointmentId={appointmentId}
        />
      )}
      
      {/* Approval Modal */}
      {showApprovalModal && appointmentId && initialDateTime && (
        <ApprovalModal
          isOpen={showApprovalModal}
          onCancel={() => setShowApprovalModal(false)}
          onApprove={handleApproval}
          appointmentId={appointmentId}
          initialDateTime={initialDateTime}
        />
      )}
    </>
  );
}
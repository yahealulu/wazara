import React from "react";

interface ActionButtonsProps {
  onAccept: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAssign: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onReject: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ActionButtons({ onAccept, onAssign, onReject }: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      {/* Accept button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAccept(e);
        }}
        className="flex items-center justify-center w-9 h-9 rounded-md bg-green-500 hover:bg-green-600 active:bg-green-700 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-green-300"
        aria-label="Accept"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-50 w-50 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Assign button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAssign(e);
        }}
        className="flex items-center justify-center w-9 h-9 rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Assign"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
      </button>
      
      {/* Reject button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onReject(e);
        }}
        className="flex items-center justify-center w-9 h-9 rounded-md bg-red-500 hover:bg-red-600 active:bg-red-700 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-red-300"
        aria-label="Reject"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
import type { Meeting, TableOverProps } from "../../types";
import { useTranslation } from '../../hooks/useTranslation';

export default function TableOver({
  columns,
  data,
  onRowClick,
  renderActions,
  hideActions = false
}: TableOverProps) {
  const t = useTranslation();

  const translateImportance = (importance: string) => {
    if (!importance) return '';
    
    switch (importance.toLowerCase()) {
      case 'high': return t.high;
      case 'medium': return t.medium;
      case 'low': return t.low;
      default: return importance;
    }
  };

  const translateState = (state: string) => {
    if (!state) return '';
    
    switch (state.toLowerCase()) {
      case 'accepted': 
      case 'approved': 
        return t.accepted;
      case 'pending': return t.pending;
      case 'canceled': 
      case 'cancelled': 
      case 'rejected': 
        return t.canceled;
      default: return state;
    }
  };

  const getStateStyle = (state: string) => {
    if (!state) return "";
    
    const lowerState = state.toLowerCase();
    switch (lowerState) {
      case "accepted": 
      case "approved": 
        return "bg-[#D9F7E7] text-[#0C994C]";
      case "pending": 
        return "bg-[#F3E5D6] text-[#DA8020]";
      case "canceled": 
      case "cancelled": 
      case "rejected": 
        return "bg-[#FBEBEA] text-[#DE4C3C]";
      default: 
        // Default styling based on common status values
        if (lowerState.includes("accept") || lowerState.includes("approve")) {
          return "bg-[#D9F7E7] text-[#0C994C]";
        } else if (lowerState.includes("pending") || lowerState.includes("wait")) {
          return "bg-[#F3E5D6] text-[#DA8020]";
        } else if (lowerState.includes("cancel") || lowerState.includes("reject")) {
          return "bg-[#FBEBEA] text-[#DE4C3C]";
        }
        return "";
    }
  };

  // Process data to handle different field names and missing data
  const processedData = (data || []).map(meeting => {
    // Handle potentially missing or differently named fields
    const id = String(meeting.id || '');
    const title = String(meeting.title || '');
    const importance = String(meeting.importance || '');
    const state = String(meeting.state || '');
    const date = String(meeting.date || '');
    const time = String(meeting.time || '');
    
    return {
      ...meeting, // Include all original properties first
      id,
      title,
      importance: importance ? translateImportance(importance) : '',
      stateOriginal: state,
      state: state ? translateState(state) : '',
      date,
      time
    };
  });

  // If no data, show a message
  if (processedData.length === 0) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden w-full shadow-sm border border-[#F5F5F5] p-8 text-center">
        <p className="text-gray-500">{t.noData}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden w-full shadow-sm border border-[#F5F5F5]">
      <table className="w-full border-collapse text-left ltr:text-left rtl:text-right">
        <thead>
          <tr className="bg-[#F0F6F6] text-[#737373] font-medium text-sm">
            {columns.map((col) => (
              <th key={String(col.key)} className="p-4 font-medium ltr:text-left rtl:text-right">
                {col.key === "date" ? t.dateTime : col.label}
              </th>
            ))}
            {!hideActions && (
              <th className="p-4 font-medium ltr:text-left rtl:text-right">
                {processedData.every((m) => m.state) && !renderActions ? t.state : t.actions}
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {processedData.map((meeting) => (
            <tr
              key={meeting.id}
              className="border-t border-[#EAEAEA] hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onRowClick?.(meeting.id)}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="py-4.5 w-1/4 px-4 text-sm ltr:text-left rtl:text-right">
                  {col.key === "date" ? (
                    <>
                      <p>{meeting.date}</p>
                      <p className="text-sm mt-1 text-[#737373]">{meeting.time}</p>
                    </>
                  ) : (
                    <>{(meeting as any)[col.key]}</>
                  )}
                </td>
              ))}

              {!hideActions && (
                <td className="p-4 w-[15%] text-sm">
                  {renderActions ? (
                    renderActions(meeting as Meeting)
                  ) : meeting.state ? (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStateStyle(String(meeting.stateOriginal || ''))}`}>
                      {meeting.state}
                    </span>
                  ) : null}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
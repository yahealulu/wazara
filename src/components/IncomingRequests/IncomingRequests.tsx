import { useNavigate } from "react-router-dom";
import TableOver from "./TabelOver";
import { meetingsLastMonth, meetingsLastWeek, meetingsToday } from "../../data/data";
import { useState } from "react";
import ActionModalAdmin from "../Modal/ActionModalAdmin";
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';
import ActionButtonsOverview from "../ui/Buttons/ActionButtonsOverview";

export default function IncomingRequests({period} : { period : string}) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const t = useTranslation();
  const getMeetingsByPeriod = (period: string) => {
  switch(period) {
    case "Today": return meetingsToday;
    case "Last Week": return meetingsLastWeek;
    case "Last Month": return meetingsLastMonth;
    default: return meetingsToday;
  }
}
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-8">{t.incomingRequests}</h2>
      
      <TableOver
        data={getMeetingsByPeriod(period)}
        columns={[
          { key: "title", label: t.meetingTitle },
          { key: "importance", label: t.importance },
          { key: "date", label: `${t.date} & ${t.time}` },
        ]}
        hideActions={false}
        onRowClick={(id) => navigate(`/admin/meetingDetails/${id}`)}
        renderActions={(item) => (
          <ActionButtonsOverview
            onAccept={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle accept action
              console.log("Accept meeting", item.id);
            }}
            onPrimary={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle primary action
              console.log("Primary action for meeting", item.id);
            }}
            onReject={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpenModal(true);
            }}
          />
        )}
      />

      <ActionModalAdmin
        Letters="0 / 300 Letters"
        title={`${t.reject} ${t.this} ${t.request} ?`}
        p={t.yourAboutToReject}
        label={`${t.rejectionCause} (${t.optional})`}
        placeholder={t.letTheVisitorKnow}
        onCancel={() => setOpenModal(false)}
        isOpen={openModal}
        btnState={t.reject}
        btnStateColor="bg-[#DE4C3C] text-white"
      />
    </motion.div>
  );
}
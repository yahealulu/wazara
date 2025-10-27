import { useState } from "react";
import StateBtn from "../Buttons/StateBtn";
import { BiPencil, BiTrash } from "react-icons/bi";
import ActionModalAdmin from "../../Modal/ActionModalAdmin";
import { useTranslation } from "../../../hooks/useTranslation";

export default function NoteCard() {
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"delete" | "edit" | null>(null);
  const t = useTranslation();

  const handleOpen = (action: "delete" | "edit") => {
    setMode(action);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setMode(null);
  };

  return (
    <div className="border border-borderColor rounded-2xl p-4">
      <p>{t.sampleNoteContent}</p>

      <div className="mt-6 flex gap-4 justify-between">
        <StateBtn
          onClick={() => handleOpen("delete")}
          icon={<BiTrash size={20} />}
          className="w-[108px] text-[#DE4C3C] border !border-[#DE4C3C]"
          text={t.delete}
        />
        <StateBtn
          onClick={() => handleOpen("edit")}
          icon={<BiPencil size={20} />}
          className="bg-[#F0F6F6] w-[185px]"
          text={t.edit}
        />
      </div>

      <ActionModalAdmin
        Letters={mode === "delete" ? "" : "0 / 300 Letters"}
        isOpen={openModal}
        onCancel={handleClose}
        btnState={mode === "delete" ? t.deleteNote : t.saveChanges}
        btnStateColor={
          mode === "delete"
            ? "bg-[#DE4C3C] text-white"
            : "bg-Primary text-white"
        }
        title={mode === "delete" ? `${t.deleteNote} ?` : t.editNote}
        p={mode === "delete" ? t.youreAboutToDelete : ""}
        label={mode === "delete" ? "" : t.notes}
        placeholder={mode === "delete" ? "" : t.writeYourNote}
      />
    </div>
  );
}

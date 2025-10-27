import { BiPlus } from "react-icons/bi";
import StateBtn from "../ui/Buttons/StateBtn";
import NoteCard from "../ui/Cards/NoteCard";
import { useState } from "react";
import ActionModalAdmin from "../Modal/ActionModalAdmin";
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';

export default function Notes() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const t = useTranslation();
    
  return (
    <motion.div 
      className="flex flex-col gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t.notes}</h2>
        <StateBtn   
          onClick={() => setOpenModal(true)}  
          className="bg-[#F0F6F6] w-[126px]" 
          text={t.addNote} 
          icon={<BiPlus size={20}/>}
        />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>
      <ActionModalAdmin 
        Letters="" 
        p="" 
        isOpen={openModal} 
        onCancel={() => setOpenModal(false)} 
        btnState={t.save}
        btnStateColor="bg-Primary text-white"
        title={`${t.addNote}`}
        label={t.notes}
        placeholder={t.addNote}
      />
    </motion.div>
  )
}
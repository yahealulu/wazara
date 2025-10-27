import { sections } from "../../data/data";
import AttendanceSection from "./AttendanceSection";
import { motion } from 'framer-motion';

export default function Attendance() {
  
  return (
    <motion.div 
      className="flex flex-col gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {sections.map((section, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <AttendanceSection title={section.title} items={section.items} />
          {index !== sections.length - 1 && (
            <div className="w-full mt-8 h-[1px] bg-[#EAEAEA]"></div>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}
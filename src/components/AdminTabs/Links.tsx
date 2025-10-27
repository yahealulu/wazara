import SectionLinks from "./SectionLinks";
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';

const sections = [
  {
    titleKey: "links",
    links: [
      {  url: "https://www.google.com" },
      {  url: "https://react.dev" },
    ],
  },
  {
    titleKey: "attachmentsTitle",
    files: [
      { filename: "reportFileLabel", fileUrl: "/files/Report.pdf" },
      { filename: "summaryFileLabel", fileUrl: "/files/Summary.pdf" },
    ],
  },
];

export default function Links() {
  const t = useTranslation();
  
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
          <SectionLinks
            title={t[section.titleKey as keyof typeof t]}
            links={section.links}
            files={section.files}
          />
          {index !== sections.length - 1 && (
            <div className="w-full h-[1px] bg-[#EAEAEA] my-4"></div>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}
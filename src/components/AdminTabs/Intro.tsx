import { useTranslation } from "../../hooks/useTranslation";
import SectionLinks from "./SectionLinks";
import { motion } from 'framer-motion';

const sections = [
  {
    type: "description",
    titleKey: "descriptionTitle",
    textKey: "descriptionText"
  },
  {
    type: "links",
    titleKey: "linksTitle",
    links: [
      {  url: "https://www.google.com" },
      {  url: "https://react.dev" },
    ]
  },
  {
    type: "attachments",
    titleKey: "attachmentsTitle",
    files: [
      { filename: "reportFileLabel", fileUrl: "/files/Report.pdf" },
      { filename: "summaryFileLabel", fileUrl: "/files/Summary.pdf" },
    ]
  },
];

export default function Intro() {
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
          {section.type === "description" && (
            <div>
              <h2 className="mb-6 text-lg font-semibold">
                {t[section.titleKey as keyof typeof t]}
              </h2>
              <p>{t[section.textKey as keyof typeof t]}</p>
            </div>
          )}
          
          {(section.type === "links" || section.type === "attachments") && (
            <SectionLinks
              title={t[section.titleKey as keyof typeof t]}
              links={section.links}
              files={section.files}
            />
          )}
          
          {index !== sections.length - 1 && (
            <div className="w-full h-[1px] bg-[#EAEAEA] my-4"></div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
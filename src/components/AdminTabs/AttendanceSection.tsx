import type { SectionProps } from "../../types";
import InfoItemAttend from "./InfoItemAttend";
import { useTranslation } from '../../hooks/useTranslation';

export default function AttendanceSection({ title, items }: SectionProps) {
  const t = useTranslation();
  
  // Translate section title
  const translateTitle = (titleKey: string) => {
    switch(titleKey) {
      case 'visitorsInformation': return t.visitorsInformation;
      case 'attendantsInformation': return t.attendantsInformation;
      default: return titleKey;
    }
  };
  
  return (
    <div>
      <h2 className="mb-6 text-lg font-semibold">{translateTitle(title)}</h2>
      {items.map((item, index) => (
        <InfoItemAttend key={index} label={item.label} value={item.value} />
      ))}
    </div>
  )
}
import type { InfoItemProps } from "../../types";
import { useTranslation } from '../../hooks/useTranslation';

export default function InfoItemAttend({ label, value }: InfoItemProps) {
  const t = useTranslation();
  
  // Translate label
  const translateLabel = (labelKey: string) => {
    switch(labelKey) {
      case 'name': return t.name;
      case 'contactPhoneNumber': return t.contactPhoneNumber;
      case 'emailAddress': return t.emailAddress;
      case 'Attendance': return t.attendance;
      default: return labelKey;
    }
  };
  
  // Translate value
  const translateValue = (valueKey: string) => {
    switch(valueKey) {
      case 'visitorsName': return t.visitorsName;
      default: return valueKey;
    }
  };

  return (
    <div className="mb-4 flex justify-between items-center">
      <p className="text-[#737373]">{translateLabel(label)}</p>
      <p className="font-medium">{translateValue(value)}</p>
    </div>
  )
}
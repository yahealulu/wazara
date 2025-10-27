import StateBtn from "../ui/Buttons/StateBtn";
import Input from "../ui/Input/Input";
import Label from "../ui/Label/Label";
import { useTranslation } from '../../hooks/useTranslation';

interface ModalProps {
  title: string;
  p?: string;
  label?: string;
  placeholder?: string;
  btnState: string;
  btnStateColor: string;
  isOpen: boolean;
  onCancel: () => void;
  Letters : string;
}

export default function ActionModalAdmin({
  title,
  p,
  label,
  placeholder,
  btnState,
  btnStateColor,
  isOpen,
  onCancel,
  Letters 
}: ModalProps) {
  const t = useTranslation();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] p-6 rounded-[20px] flex flex-col gap-8 border border-borderColor shadow-lg shadow-black/10">
       
        <div>
          <h2 className="text-lg font-semibold">{t[title as keyof typeof t] || title}</h2>
          {p && <p className="text-gray-600 mt-2">{t[p as keyof typeof t] || p}</p>}
        </div>

        {(label || placeholder) && (
          <div>
            {label && <Label text={t[label as keyof typeof t] || label} />}
            <Input type="text" placeholder={t[placeholder as keyof typeof t] || placeholder || ""} />
            <p className="text-gray-400 text-sm mt-1">{t[Letters as keyof typeof t] || Letters}</p>
          </div>
        )}
        <div className="flex justify-end gap-4">
          <StateBtn
            text={t.cancel}
            onClick={onCancel}
            className="bg-transparent border border-gray-300 text-gray-600 w-[94px]"
          />
          <StateBtn
            text={btnState}
            className={`${btnStateColor} w-[300px]`}
          />
        </div>
      </div>
    </div>
  );
}
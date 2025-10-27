import React, { useState, useEffect } from "react";
import Input from "../../../components/ui/Input/Input";
import Label from "../../../components/ui/Label/Label";
import { useTranslation } from "../../../hooks/useTranslation";

interface Attendant {
  name: string;
  email: string;
  phone: string;
}

interface Visitor {
  name: string;
  phone: string;
  email: string;
  numberOfAttendance: number;
  attendants: Attendant[];
  links: string[];
  files: File[];
}

interface VisitorInfoProps {
  onNext: () => void;
  onUpdate: (data: Visitor) => void;
  initialData: Visitor;
}

const VisitorInfo: React.FC<VisitorInfoProps> = ({
  onNext,
  onUpdate,
  initialData,
}) => {
  const [visitor, setVisitor] = useState<Visitor>({
    ...initialData,
    attendants: initialData.attendants || [{ name: "", email: "", phone: "" }],
    links: initialData.links || [],
    files: initialData.files || [],
  });

  useEffect(() => {
    onUpdate(visitor);
  }, [visitor, onUpdate]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const t = useTranslation();

  return (
    <form onSubmit={handleNext}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {t.visitorInfoTitle}
      </h2>
      <p className="text-sm text-gray-500 mb-6">{t.visitorInfoSubTitle}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Label text={t.name} />
          <Input
            type="text"
            placeholder={t.namePlaceholder}
            value={visitor.name}
            onChange={(e) => setVisitor({ ...visitor, name: e.target.value })}
            className="mb-2"
          />
        </div>
        <div>
          <Label text={t.phoneNumber} />
          <Input
            type="text"
            placeholder={t.phonePlaceholder}
            value={visitor.phone}
            onChange={(e) => setVisitor({ ...visitor, phone: e.target.value })}
            className="mb-2"
          />
        </div>
        <div>
          <Label text={t.emailAddress} />
          <Input
            type="email"
            placeholder={t.emailPlaceholder}
            value={visitor.email}
            onChange={(e) => setVisitor({ ...visitor, email: e.target.value })}
            className="mb-2"
          />
        </div>
        <div>
          <Label text={t.numberOfAttendance} />
          <Input
            type="number"
            placeholder={t.numberOfAttendancePlaceholder}
            value={visitor.numberOfAttendance}
            onChange={(e) =>
              setVisitor({
                ...visitor,
                numberOfAttendance: parseInt(e.target.value) || 0,
              })
            }
            className="mb-2"
          />
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <button
          type="button"
          className="border px-6 py-2 rounded-lg mr-3 text-gray-700 hover:bg-gray-100"
        >
          {t.cancel}
        </button>
        <button
          type="submit"
          className="bg-[#002624] text-white px-24 py-2 rounded-lg hover:bg-[#01534f]"
        >
          {t.next}
        </button>
      </div>
    </form>
  );
};

export default VisitorInfo;

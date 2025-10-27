import React, { useState, useEffect, useRef } from "react";
import Input from "../../../components/ui/Input/Input";
import Label from "../../../components/ui/Label/Label";
import { meetingFormData } from "../../../data/newMeeting";
import { useTranslation } from '../../../hooks/useTranslation';

type MeetingDetailsData = {
  title: string;
  reasons: string;
  importance: string;
  files: File[];
  links: string[];
};

interface MeetingDetailsProps {
  onNext: () => void;
  onPrev: () => void;
  onUpdate: (data: MeetingDetailsData) => void;
  initialData: MeetingDetailsData;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({
  onNext,
  onPrev,
  onUpdate,
  initialData,
}) => {
  const [meeting, setMeeting] = useState<MeetingDetailsData>({
    ...initialData,
    files: initialData.files || [],
    links: initialData.links || [],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formData = meetingFormData[0];
  const t = useTranslation();
  const translate = (key: string) => t[key as keyof typeof t] ?? key;
  const maxImportanceLength = 30;

  useEffect(() => {
    onUpdate(meeting);
  }, [meeting]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleNext}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {translate(formData.title)}
      </h2>
      <p className="text-sm text-gray-500 mb-6">Details About Your Meeting Request</p>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {formData.form.map((field, index) =>
          field.input.map((inp, j) =>
            inp.key !== "files" && inp.key !== "links" ? (
              <div key={`${index}-${j}`}>
                <Label text={translate(field.label)} />
                {inp.key === "importance" ? (
                  <>
                    <Input
                      type={inp.type}
                      placeholder={translate(inp.placeholder)}
                      value={meeting.importance}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value;
                        if (val.length <= maxImportanceLength) {
                          setMeeting({ ...meeting, importance: val });
                        }
                      }}
                      className="mb-1"
                    />
                    <p className="text-sm text-gray-400">
                       {translate('lettersCount')}
                    </p>
                  </>
                ) : (
                  <Input
                    type={inp.type}
                    placeholder={translate(inp.placeholder)}
                    value={meeting[inp.key as keyof MeetingDetailsData] as string}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMeeting({ ...meeting, [inp.key]: e.target.value })
                    }
                    className="mb-2"
                  />
                )}
              </div>
            ) : null
          )
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {translate(formData.attachments.title)}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {translate(formData.attachments.subTitle)}
      </p>

      <div className="mb-4 relative">
  <Label text={translate(formData.attachments.form[0].label)} />
        <input
          type="text"
          placeholder={translate(formData.attachments.noFilesText)}
          value={meeting.files.map((f: File) => f.name).join(", ")}
          readOnly
          className="w-full border p-2 pr-28 rounded-lg bg-white cursor-not-allowed mb-2"
        />
        <button
          type="button"
          className="absolute right-1 top-13 transform -translate-y-1/2 bg-[#F0F6F6] text-[#002624] px-4 py-1 rounded-lg hover:bg-gray-200"
          onClick={() => fileInputRef.current?.click()}
        >
          + {translate(formData.attachments.uploadButtonText)}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              const newFiles = Array.from(e.target.files);
              setMeeting({
                ...meeting,
                files: [...meeting.files, ...newFiles],
              });
            }
          }}
        />
      </div>

      <div className="flex justify-end mt-10">
        <button
          type="button"
          className="border px-6 py-2 rounded-lg mr-3 text-gray-700 hover:bg-gray-100"
          onClick={onPrev}
        >
          {translate(formData.navLink)}
        </button>
        <button
          type="submit"
          className="bg-[#002624] text-white px-24 py-2 rounded-lg hover:bg-[#01534f]"
        >
          {translate(formData.button)}
        </button>
      </div>
    </form>
  );
};

export default MeetingDetails;

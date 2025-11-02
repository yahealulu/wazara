import React, { useState } from "react";
import { StepperSidebar } from "../../components/NewMeeting/StepperSidebar";
import VisitorInfo from "../../components/NewMeeting/steps/VisitorInfo";
import MeetingDetails from "../../components/NewMeeting/steps/MeetingDetails";
import DateTime from "../../components/NewMeeting/steps/DateTime";
import Confirmation from "../../components/NewMeeting/steps/Confirmation";
import SpecialConfirmation from "../../components/NewMeeting/steps/SpecialConfirmation";
import { useTranslation } from '../../hooks/useTranslation';

interface FormData {
  visitor: {
    name: string;
    email: string;
    phone: string;
    numberOfAttendance: number;
    description: string;
    attendants: { name: string; email: string; phone: string }[];
    links: string[];
    files: File[];
  };
  meeting: {
    title: string;
    reasons: string;
    importance: string;
    files: File[];
    presentationFiles: File[];
    introFiles: File[];
    links: string[];
  };
  dateTime: {
    date: string;
    time: string;
  };
}

type SectionKey = keyof FormData;

const AddNewMeeting: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [meetingType, setMeetingType] = useState<"normal" | "special">("normal");
  const t = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    visitor: {
      name: "",
      email: "",
      phone: "",
      numberOfAttendance: 0,
      description: "",
      attendants: [],
      links: [],
      files: [],
    },
    meeting: {
      title: "",
      reasons: "",
      importance: "",
      files: [],
      presentationFiles: [],
      introFiles: [],
      links: [],
    },
    dateTime: {
      date: "",
      time: "",
    },
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (section: SectionKey, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <VisitorInfo
            onNext={nextStep}
            onUpdate={(data) => updateFormData("visitor", data)}
            initialData={formData.visitor}
          />
        );
      case 2:
        return (
          <MeetingDetails
            onNext={nextStep}
            onPrev={prevStep}
            onUpdate={(data) => updateFormData("meeting", data)}
            initialData={formData.meeting}
          />
        );
      case 3:
        return (
          <DateTime
            onNext={nextStep}
            onPrev={prevStep}
            onUpdate={(data) => updateFormData("dateTime", data)}
            initialData={formData.dateTime}
          />
        );
      case 4:
        return meetingType === "normal" ? (
          <Confirmation onPrev={prevStep} formData={formData} />
        ) : (
          <SpecialConfirmation onPrev={prevStep} formData={formData} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto rounded-2xl shadow-md flex overflow-hidden">
        <StepperSidebar
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <div className="flex-1 bg-white p-8">
          {/* Meeting Type Selection */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t.selectMeetingType}
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => setMeetingType("normal")}
                className={`px-6 py-3 rounded-lg border-2 transition-all ${
                  meetingType === "normal"
                    ? "border-[#002624] bg-[#f0f6f6] text-[#002624]"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="font-medium">{t.normalMeeting}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {t.standardMeetingRequest}
                </div>
              </button>
              <button
                onClick={() => setMeetingType("special")}
                className={`px-6 py-3 rounded-lg border-2 transition-all ${
                  meetingType === "special"
                    ? "border-[#002624] bg-[#f0f6f6] text-[#002624]"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="font-medium">{t.specialMeeting}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {t.specialMeetingRequest}
                </div>
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewMeeting;
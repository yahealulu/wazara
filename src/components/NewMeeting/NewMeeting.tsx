import React, { useState } from "react";
import { StepperSidebar } from "./StepperSidebar";
import VisitorInfo from "./steps/VisitorInfo";
import MeetingDetails from "./steps/MeetingDetails";
import DateTime from "./steps/DateTime";
import Confirmation from "./steps/Confirmation";

interface FormData {
  visitor: {
    name: string;
    email: string;
    phone: string;
    numberOfAttendance: number;
    attendants: { name: string; email: string; phone: string }[];
    links: string[];
    files: File[];
  };
  meeting: {
    title: string;
    reasons: string;
    importance: string;
    files: File[];
    links: string[];
  };
  dateTime: {
    date: string;
    time: string;
  };
}

type SectionKey = keyof FormData;

const NewMeeting: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [formData, setFormData] = useState<FormData>({
    visitor: {
      name: "",
      email: "",
      phone: "",
      numberOfAttendance: 0,
      attendants: [],
      links: [],
      files: [],
    },
    meeting: {
      title: "",
      reasons: "",
      importance: "",
      files: [],
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
        return <Confirmation onPrev={prevStep} formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen  py-10">
      <div className="max-w-6xl mx-auto rounded-2xl shadow-md flex overflow-hidden">
        <StepperSidebar
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <div className="flex-1 bg-white p-8">{renderStep()}</div>
      </div>
    </div>
  );
};

export default NewMeeting;

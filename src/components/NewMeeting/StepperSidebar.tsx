import React from "react";
import { useTranslation } from "../../hooks/useTranslation";

interface StepperSidebarProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const StepperSidebar: React.FC<StepperSidebarProps> = ({
  currentStep,
}) => {
  const t = useTranslation();

  const steps = [
    t.visitorsInformationStep,
    t.meetingDetailsStep,
    t.dateTimeStep,
    t.confirmationStep,
  ];

  return (
    <div className="w-full md:w-72 bg-[#F7FAF9] rounded-l-2xl flex flex-col items-start py-10 px-6 md:px-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div
            key={step}
            className="flex flex-col items-start relative mb-6 last:mb-0"
          >
            <div
              className={`flex items-center ${
                isActive
                  ? "bg-[#002624] rounded-xl px-3 py-2 shadow-sm"
                  : "bg-transparent rounded-xl px-3 py-2"
              } transition-colors duration-300`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium mr-4 shrink-0 transition-colors duration-300
                  ${
                    isActive
                      ? "bg-white border-[#FFFFFF] text-[#002624]"
                      : isCompleted
                      ? "bg-[#002624] border-[#002624] text-white"
                      : "bg-transparent border-[#B0B0B0] text-gray-700"
                  }`}
                style={{
                  transitionProperty: "background-color, border-color, color",
                }}
              >
                {stepNumber}
              </div>

              <span
                className={`text-base font-small transition-colors duration-300 ${
                  isActive
                    ? "text-white"
                    : isCompleted
                    ? "text-gray-800"
                    : "text-gray-700"
                }`}
              >
                {step}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="flex flex-col items-center ml-[23px] mt-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full border-2 ${
                    isCompleted
                      ? "bg-[#002624] border-[#002624]"
                      : "bg-[#F7FAF9] border-gray-400"
                  } transition-colors duration-300`}
                />

                <div
                  className={`w-[2px] h-22 ${
                    isCompleted
                      ? "bg-[#002624]"
                      : "border-l border-dashed border-gray-400"
                  }`}
                />

                <div
                  className={`w-2.5 h-2.5 rounded-full border-2 ${
                    isCompleted
                      ? "bg-[#002624] border-[#002624]"
                      : "bg-[#F7FAF9] border-gray-400"
                  } transition-colors duration-300 mt-0.5`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

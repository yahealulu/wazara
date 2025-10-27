import React, { useState } from "react";
import { Check } from "lucide-react";
import { useTranslation } from '../../../hooks/useTranslation';
import Label from "../../ui/Label/Label";
import Input from "../../ui/Input/Input";

interface ConfirmationProps {
  onPrev: () => void;
  formData: any;
}

const Confirmation: React.FC<ConfirmationProps> = ({ onPrev, formData }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = () => {
    console.log("Final Submission:", formData);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  const t = useTranslation();
  return (
    <div className="relative">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        { "Confirm Your Request"}
      </h2>
      <div className="bg-white mt-8 space-y-10">
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            { "Personal Information"}
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            {"Your Personal Or Organization’s Information"}
          </p>
          <div className="grid grid-cols-2 gap-x-5 gap-y-5">
            <div>
              <Label text="Name"/>
              <Input 
                type="text"
                placeholder="Your Name\Organization Name"/>
            </div>
            <div>
              <Label text="Phone Number"/>
              <Input 
                type="text"
                placeholder="+xxx - xxxxxxxxx"/>
            </div>
            <div>
              <Label text="Email Address"/>
              <Input 
                type="text"
                placeholder="Your Email Address "/>
            </div>
            <div>
              <Label text="Number Of Attendance"/>
              <Input 
                type="text"
                placeholder="Enter Number"/>
            </div>
          </div>

        </section>
        <div className=" my-8 w-full h-[1px] bg-borderColor"></div>
        <section className=" p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {t.meetingDetails }
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            { "Details About Your Meeting Request"}
          </p>
          <div className=" flex flex-col gap-5">
            <div>
              <Label text="Meeting Title"/>
              <Input type="text" placeholder="Your Meeting Title"/>
            </div>
            <div>
              <Label text="Meeting Reasons & Goals "/>
              <Input type="text" placeholder="Your Goal & Causes Of The Meeting"/>
            </div>
            <div>
              <Label text="Meeting Importance"/>
              <Input type="text" placeholder="Is Your Meeting So Important?"/>
            </div>
          </div>
        </section>
        <div className=" my-8 w-full h-[1px] bg-borderColor"></div>

        <section className=" p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            { "Meeting Presentation (Optional)"}
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            { "Presentation\File You Want To View In The Meeting"}
          </p>
          <div className=" mt-8">
            <Label text="Files"/>
            
          </div>
        </section>
        <div className=" my-8 w-full h-[1px] bg-borderColor"></div>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {t.dateTime}
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            {t.dateTime ?? "This Date & Time May Change Due To The Minister’s Request"}
          </p>
          <div className="flex items-center space-x-6 text-gray-800">
            <div className="flex items-center space-x-2">
              <span className="text-sm">{formData.dateTime.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{formData.dateTime.time}</span>
            </div>
          </div>
        </section>
      </div>
      <div className="flex justify-end mt-10">
        <button
          type="button"
          onClick={onPrev}
          className="border border-gray-300 px-6 py-2 rounded-lg mr-3 text-gray-700 hover:bg-gray-100"
        >
          {t.cancel}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#002624] text-white px-10 py-2 rounded-lg hover:bg-[#014944]"
        >
          {"Confirm Request"}
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50">
          <div className="bg-white flex flex-col gap-8 rounded-2xl shadow-xl w-[612px] p-8 text-center animate-fadeIn">
            <div className="flex justify-center mb-4 relative">
              <div className="rounded-2xl bg-[#F0F6F6] p-4 flex items-start justify-center">
                <Check className="text-[#002624]" strokeWidth={2} size={48} />
                <Check className="text-[#002624] -ml-6 relative top-3" strokeWidth={3} size={32} />
              </div>
            </div>
            <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              { "Your Meeting Has Been Scheduled"}
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              { "You Can Check Your Meeting’s Details In The ‘Upcoming Meetings’ Tab."}
            </p>
            </div>
            <button
              onClick={closePopup}
              className="bg-[#002624] text-white px-10 py-2 rounded-lg hover:bg-[#014944]"
            >
              {"Done"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirmation;

import React, { useState } from "react";
import { Check } from "lucide-react";
import { useTranslation } from '../../../hooks/useTranslation';
import Label from "../../ui/Label/Label";
import Input from "../../ui/Input/Input";
import api from "../../../services/axiosConfig";
import { useNavigate } from "react-router-dom";

interface SpecialConfirmationProps {
  onPrev: () => void;
  formData: any;
}

const SpecialConfirmation: React.FC<SpecialConfirmationProps> = ({ onPrev, formData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Create FormData object for multipart/form-data
      const formDataToSend = new FormData();
      
      // Add visitor information
      formDataToSend.append("visitor_name", formData.visitor.name);
      formDataToSend.append("visitor_phone", formData.visitor.phone);
      formDataToSend.append("visitor_email", formData.visitor.email);
      formDataToSend.append("attendees_count", formData.visitor.numberOfAttendance.toString());
      formDataToSend.append("visitor_description", formData.visitor.description);
      
      // Add meeting details
      formDataToSend.append("subject", formData.meeting.title);
      formDataToSend.append("purpose", formData.meeting.reasons);
      formDataToSend.append("importance", formData.meeting.importance);
      formDataToSend.append("priority", "medium"); // Default priority
      
      // Add date and time (combine date and time into preferred_slot)
      const dateString = formData.dateTime.date;
      const timeString = formData.dateTime.time;
      
      // Convert time format (9:00 AM -> 09:00)
      const timeParts = timeString.split(" ");
      let [hours, minutes] = timeParts[0].split(":");
      if (timeParts[1] === "PM" && hours !== "12") {
        hours = (parseInt(hours) + 12).toString();
      } else if (timeParts[1] === "AM" && hours === "12") {
        hours = "00";
      }
      
      // Format to ISO string
      const preferredSlot = `${dateString}T${hours.padStart(2, '0')}:${minutes}:00Z`;
      formDataToSend.append("preferred_slot", preferredSlot);
      
      // Duration is always 30 minutes
      formDataToSend.append("duration_min", "30");
      
      // Add files with specific field names as required by the API
      // For general files
      formData.meeting.files.forEach((file: File) => {
        formDataToSend.append("file", file);
      });
      
      // For presentation files
      formData.meeting.presentationFiles.forEach((file: File) => {
        formDataToSend.append("presentation_files", file);
      });
      
      // For intro files
      formData.meeting.introFiles.forEach((file: File) => {
        formDataToSend.append("intro_files", file);
      });
      
      // Add links
      if (formData.meeting.links && formData.meeting.links.length > 0) {
        formData.meeting.links.forEach((link: string) => {
          formDataToSend.append("link", link);
        });
      }
      
      // Make API call to special endpoint
      const response = await api.post("/appointments/api/admin/appointments/special/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("Special meeting created successfully:", response.data);
      setShowPopup(true);
    } catch (error: any) {
      console.error("Error creating special meeting:", error);
      setErrorMessage(error.response?.data?.message || "Failed to create special meeting. Please try again.");
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    // Navigate to upcoming meetings page after successful submission
    navigate("/admin/upcoming");
  };

  const closeError = () => {
    setShowError(false);
  };

  const t = useTranslation();
  
  return (
    <div className="relative">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {"Confirm Your Special Meeting Request"}
      </h2>
      <div className="bg-white mt-8 space-y-10">
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {"Personal Information"}
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            {"Your Personal Or Organization's Information"}
          </p>
          <div className="grid grid-cols-2 gap-x-5 gap-y-5">
            <div>
              <Label text="Name"/>
              <Input 
                type="text"
                value={formData.visitor.name}
                onChange={() => {}} // No-op function
                placeholder=""
              />
            </div>
            <div>
              <Label text="Phone Number"/>
              <Input 
                type="text"
                value={formData.visitor.phone}
                onChange={() => {}} // No-op function
                placeholder=""
              />
            </div>
            <div>
              <Label text="Email Address"/>
              <Input 
                type="text"
                value={formData.visitor.email}
                onChange={() => {}} // No-op function
                placeholder=""
              />
            </div>
            <div>
              <Label text="Number Of Attendance"/>
              <Input 
                type="text"
                value={formData.visitor.numberOfAttendance}
                onChange={() => {}} // No-op function
                placeholder=""
              />
            </div>
            <div className="col-span-2">
              <Label text="Visitor Description"/>
              <textarea
                value={formData.visitor.description}
                onChange={() => {}} // No-op function
                className="w-full border border-borderColor p-3 rounded-lg placeholder:text-sm placeholder:text-[#737373] min-h-[120px]"
              />
            </div>
          </div>
        </section>
        <div className=" my-8 w-full h-[1px] bg-borderColor"></div>
        <section className=" p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {t.meetingDetails }
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            {"Details About Your Meeting Request"}
          </p>
          <div className=" flex flex-col gap-5">
            <div>
              <Label text="Meeting Title"/>
              <Input 
                type="text" 
                value={formData.meeting.title}
                onChange={() => {}} // No-op function
                placeholder=""
              />
            </div>
            <div>
              <Label text="Meeting Reasons & Goals "/>
              <Input 
                type="text" 
                value={formData.meeting.reasons}
                onChange={() => {}} // No-op function
                placeholder=""
              />
            </div>
            <div>
              <Label text="Meeting Importance"/>
              <Input 
                type="text" 
                value={formData.meeting.importance}
                onChange={() => {}} // No-op function
                placeholder=""
              />
            </div>
          </div>
        </section>
        <div className=" my-8 w-full h-[1px] bg-borderColor"></div>

        <section className=" p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {"Meeting Presentation (Optional)"}
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            {"Presentation\File You Want To View In The Meeting"}
          </p>
          <div className=" mt-8">
            <Label text="Files"/>
            {formData.meeting.files.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">General Files:</h4>
                <ul className="list-disc pl-5">
                  {formData.meeting.files.map((file: File, index: number) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {formData.meeting.presentationFiles.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Presentation Files:</h4>
                <ul className="list-disc pl-5">
                  {formData.meeting.presentationFiles.map((file: File, index: number) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {formData.meeting.introFiles.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Intro Files:</h4>
                <ul className="list-disc pl-5">
                  {formData.meeting.introFiles.map((file: File, index: number) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {formData.meeting.files.length === 0 && 
             formData.meeting.presentationFiles.length === 0 && 
             formData.meeting.introFiles.length === 0 && (
              <p className="text-gray-500">No files uploaded</p>
            )}
          </div>
        </section>
        <div className=" my-8 w-full h-[1px] bg-borderColor"></div>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {t.dateTime}
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            {t.dateTime ?? "This Date & Time May Change Due To The Minister's Request"}
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
          disabled={isSubmitting}
        >
          {t.cancel}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#002624] text-white px-10 py-2 rounded-lg hover:bg-[#014944]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Confirm Special Request"}
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
              {"Your Special Meeting Has Been Scheduled"}
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              {"You Can Check Your Meeting's Details In The 'Upcoming Meetings' Tab."}
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
      
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50">
          <div className="bg-white flex flex-col gap-8 rounded-2xl shadow-xl w-[612px] p-8 text-center animate-fadeIn">
            <div className="flex justify-center mb-4 relative">
              <div className="rounded-2xl bg-red-100 p-4 flex items-start justify-center">
                <span className="text-red-500 text-4xl font-bold">!</span>
              </div>
            </div>
            <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {"Error Creating Special Meeting"}
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              {errorMessage}
            </p>
            </div>
            <button
              onClick={closeError}
              className="bg-red-500 text-white px-10 py-2 rounded-lg hover:bg-red-600"
            >
              {"Close"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialConfirmation;
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
  presentationFiles: File[];
  introFiles: File[];
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
    presentationFiles: initialData.presentationFiles || [],
    introFiles: initialData.introFiles || [],
    links: initialData.links || [],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const presentationFileInputRef = useRef<HTMLInputElement>(null);
  const introFileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<'general' | 'presentation' | 'intro'>('general');
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

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent, type: 'general' | 'presentation' | 'intro') => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragType(type);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, type: 'general' | 'presentation' | 'intro') => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDragType('general');
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      if (type === 'general') {
        setMeeting({
          ...meeting,
          files: [...meeting.files, ...newFiles],
        });
      } else if (type === 'presentation') {
        setMeeting({
          ...meeting,
          presentationFiles: [...meeting.presentationFiles, ...newFiles],
        });
      } else if (type === 'intro') {
        setMeeting({
          ...meeting,
          introFiles: [...meeting.introFiles, ...newFiles],
        });
      }
      e.dataTransfer.clearData();
    }
  };

  // Remove file handlers
  const removeFile = (index: number, type: 'general' | 'presentation' | 'intro') => {
    if (type === 'general') {
      const newFiles = [...meeting.files];
      newFiles.splice(index, 1);
      setMeeting({ ...meeting, files: newFiles });
    } else if (type === 'presentation') {
      const newFiles = [...meeting.presentationFiles];
      newFiles.splice(index, 1);
      setMeeting({ ...meeting, presentationFiles: newFiles });
    } else if (type === 'intro') {
      const newFiles = [...meeting.introFiles];
      newFiles.splice(index, 1);
      setMeeting({ ...meeting, introFiles: newFiles });
    }
  };

  return (
    <form onSubmit={handleNext}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {translate(formData.title)}
      </h2>
      <p className="text-sm text-gray-500 mb-6">{translate(formData.subTitle)}</p>

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
                ) : inp.key === "reasons" ? (
                  <>
                    <Input
                      type={inp.type}
                      placeholder={t.meetingReasonsGoalsPlaceholder}
                      value={meeting.reasons}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMeeting({ ...meeting, reasons: e.target.value })
                      }
                      className="mb-2"
                    />
                  </>
                ) : inp.key === "title" ? (
                  <>
                    <Input
                      type={inp.type}
                      placeholder={t.meetingTitlePlaceholder}
                      value={meeting.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMeeting({ ...meeting, title: e.target.value })
                      }
                      className="mb-2"
                    />
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

      {/* General Files */}
      <div className="mb-6">
        <Label text={t.generalFiles} />
        <div 
          className={`mb-2 relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging && dragType === 'general' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={(e) => handleDragEnter(e, 'general')}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'general')}
          onClick={() => fileInputRef.current?.click()}
        >
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
          <div className="flex flex-col items-center justify-center">
            <svg 
              className="w-12 h-12 text-gray-400 mb-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="text-gray-600 mb-1">
              {isDragging && dragType === 'general' ? t.dropGeneralFiles : t.dragDropGeneral}
            </p>
            <p className="text-gray-400 text-sm">
              {t.supportedFormats}
            </p>
          </div>
        </div>

        {meeting.files.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">{t.uploadedGeneralFiles}</h4>
            <ul className="space-y-2">
              {meeting.files.map((file, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span className="text-sm truncate">{file.name}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFile(index, 'general')}
                  >
                    {t.remove}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Presentation Files */}
      <div className="mb-6">
        <Label text={t.presentationFiles} />
        <div 
          className={`mb-2 relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging && dragType === 'presentation' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={(e) => handleDragEnter(e, 'presentation')}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'presentation')}
          onClick={() => presentationFileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={presentationFileInputRef}
            className="hidden"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                const newFiles = Array.from(e.target.files);
                setMeeting({
                  ...meeting,
                  presentationFiles: [...meeting.presentationFiles, ...newFiles],
                });
              }
            }}
          />
          <div className="flex flex-col items-center justify-center">
            <svg 
              className="w-12 h-12 text-gray-400 mb-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="text-gray-600 mb-1">
              {isDragging && dragType === 'presentation' ? t.dropPresentationFiles : t.dragDropPresentation}
            </p>
            <p className="text-gray-400 text-sm">
              {t.supportedFormatsPresentation}
            </p>
          </div>
        </div>

        {meeting.presentationFiles.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">{t.uploadedPresentationFiles}</h4>
            <ul className="space-y-2">
              {meeting.presentationFiles.map((file, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span className="text-sm truncate">{file.name}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFile(index, 'presentation')}
                  >
                    {t.remove}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Intro Files */}
      <div className="mb-6">
        <Label text={t.introFiles} />
        <div 
          className={`mb-2 relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging && dragType === 'intro' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={(e) => handleDragEnter(e, 'intro')}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'intro')}
          onClick={() => introFileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={introFileInputRef}
            className="hidden"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                const newFiles = Array.from(e.target.files);
                setMeeting({
                  ...meeting,
                  introFiles: [...meeting.introFiles, ...newFiles],
                });
              }
            }}
          />
          <div className="flex flex-col items-center justify-center">
            <svg 
              className="w-12 h-12 text-gray-400 mb-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="text-gray-600 mb-1">
              {isDragging && dragType === 'intro' ? t.dropIntroFiles : t.dragDropIntro}
            </p>
            <p className="text-gray-400 text-sm">
              {t.supportedFormatsIntro}
            </p>
          </div>
        </div>

        {meeting.introFiles.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">{t.uploadedIntroFiles}</h4>
            <ul className="space-y-2">
              {meeting.introFiles.map((file, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span className="text-sm truncate">{file.name}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFile(index, 'intro')}
                  >
                    {t.remove}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
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
import { useTranslation } from '../../hooks/useTranslation';

type FileItemProps = {
  filename: string;
  fileUrl: string;
  index : number
};

export const FileItem = ({ filename, fileUrl ,index}: FileItemProps) => {
  const t = useTranslation();
  
  return (
    <div className="flex justify-between items-center mb-4">
      <p className="text-[#737373]">{t.file}{index + 1 }</p>
      <div className="flex items-center gap-3">
        <p className=" font-medium">{filename}</p>
        <a 
          href={fileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className=" bg-[#F0F6F6] px-4 py-2 rounded-xl"
        >
          {t.OpenFIle}
        </a>
      </div>
    </div>
  );
};
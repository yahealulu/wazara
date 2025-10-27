import { Link } from "react-router-dom";
import { useTranslation } from '../../hooks/useTranslation';

type LinkItemProps = {
  url: string;
  index : number;
};

export const LinkItem = ({ index, url }: LinkItemProps) => {
  const t = useTranslation();
  
  return (
    <div className="flex justify-between items-center mb-4">
    <p className="text-[#737373]">{t.linkLabel} {index + 1}</p>
      <Link 
        to={url} 
        target="_blank" 
        className="underline"
      >
        {t.viewDetails}
      </Link>
    </div>
  );
};
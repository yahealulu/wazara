import type { ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";
import { useTranslation } from '../../hooks/useTranslation';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchComponent({ value, onChange }: SearchProps) {
  const t = useTranslation();
  
  return (
    <div className="w-[360px] border border-borderColor rounded-xl py-2 px-3 gap-2 flex items-center">
      <BiSearch size={20}/>
      <input 
        className="border-none flex-1" 
        type="text"       
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={t.searchPlaceholder} 
      />
    </div>
  )
}
import { useLocalization } from '../../../contexts/LocalizationContext';

interface InputType {
  placeholder: string;
  type: string;
  id?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({
  placeholder,
  type,
  id,
  value,
  onChange,
  className,
}: InputType) {
  const { language } = useLocalization();
  
  // Add special handling for phone numbers in Arabic
  const isPhoneNumber = type === 'tel' || (id && (id.includes('Phone') || id.includes('phone')));
  const inputClassName = `rounded-lg w-full border border-borderColor p-3 placeholder:text-sm placeholder:text-[#737373] ${
    isPhoneNumber && language === 'ar' ? 'phone-number' : ''
  } ${className || ""}`;

  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={inputClassName}
    />
  );
}
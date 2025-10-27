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
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`rounded-lg w-full border border-borderColor p-3 placeholder:text-sm placeholder:text-[#737373] ${
        className || ""
      }`}
    />
  );
}

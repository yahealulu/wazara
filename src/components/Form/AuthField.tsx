import Input from "../ui/Input/Input";
import Label from "../ui/Label/Label";

interface AuthFieldProps {
  label: string;
  input: {
    id: string;
    type: string;
    placeholder: string;
  };
  value: string;
  onChange: (id: string, value: string) => void;
}

export default function AuthField({ label, input, value, onChange }: AuthFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(input.id, e.target.value);
  };

  // Use tel type for phone numbers
  const inputType = input.id.includes('Phone') ? 'tel' : input.type;

  return (
    <div className="mb-6 w-full">
      <Label text={label} htmlFor={input.id} />
      <Input 
        id={input.id}
        type={inputType}
        placeholder={input.placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
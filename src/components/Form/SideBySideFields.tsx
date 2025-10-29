import AuthField from "./AuthField";

interface SideBySideFieldsProps {
  fields: {
    label: string;
    input: {
      id: string;
      type: string;
      placeholder: string;
    };
    value: string;
  }[];
  onFieldChange: (id: string, value: string) => void;
}

export default function SideBySideFields({ fields, onFieldChange }: SideBySideFieldsProps) {
  return (
    <div className="flex gap-4">
      {fields.map((field, index) => (
        <div key={index} className="w-1/2">
          <AuthField
            label={field.label}
            input={field.input}
            value={field.value}
            onChange={onFieldChange}
          />
        </div>
      ))}
    </div>
  )
}

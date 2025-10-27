import StateBtn from "../../components/ui/Buttons/StateBtn";

interface ButtonConfig {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className: string;
}

interface MeetingHeaderProps {
  title: string;
  buttons?: ButtonConfig[];
}
export default function MeetingTitle({ title, buttons }: MeetingHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full">
       <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex items-center gap-4">
        {buttons?.map((btn, idx) => (
          <StateBtn
            key={idx}
            text={btn.text}
            icon={btn.icon}
            onClick={btn.onClick}
            className={btn.className}
          />
        ))}
      </div>
    </div>
  )
}

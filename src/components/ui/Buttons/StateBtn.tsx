import type { ReactNode } from "react";

interface StateBtnProps
{
    text : string;
    className : string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    icon?: ReactNode;
}
export default function StateBtn({text , className , onClick , icon} : StateBtnProps) {
  return (
    <button onClick={onClick} className={`py-2 px-4 text-sm font-medium justify-center text-center flex  items-center gap-3 rounded-[10px] ${className}`}>
      {icon && <span className="w-5 h-5">{icon}</span>}
      {text}
    </button>
  )
}

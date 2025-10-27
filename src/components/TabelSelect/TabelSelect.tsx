import { BsGrid3X3 } from "react-icons/bs";
import { FaList } from "react-icons/fa";
interface TabelSelectProps
{
    activeTab : string;
    setActiveTab : (tab : string ) => void;
}
export default function TabelSelect({activeTab , setActiveTab} : TabelSelectProps) {
    const views = [
        { id: "list", label: "List", icon: <FaList size={20}/> },
        { id: "Calendar", label: "Calendar", icon: <BsGrid3X3 size={20}/> },
    ];
  return (
    <div className=" p-1 bg-[#F0F6F6] flex items-center gap-2 rounded-xl">
      {views.map((tab)=>
    (
        <button key={tab.id} onClick={()=>setActiveTab(tab.id)} className={`${activeTab === tab.id? "bg-white" : ""} w-9 flex justify-center items-center h-9 rounded-lg`}>
            {tab.icon}
        </button>
    ))}
    </div>
  )
}

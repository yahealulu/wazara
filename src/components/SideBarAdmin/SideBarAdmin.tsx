import Logo from "../ui/Logo/Logo";
import NavLinkAdmin from "./NavLinkAdmin";
import { useState, useEffect } from "react";

export default function SideBarAdmin() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = (event: CustomEvent) => {
      setIsCollapsed(event.detail);
    };

    window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    return () => {
      window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    };
  }, []);

  return (
    <div className={`bg-[#002624] text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-[240px]'}`}>
      <div className="py-3 px-5 border-b border-[#004d48]">
          <Logo />
      </div>
      <div className="px-2 py-4">
        <NavLinkAdmin isCollapsed={isCollapsed} />
      </div>
    </div>
  )
}
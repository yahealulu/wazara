import type { JSX } from "react";
import { BiCalendar, BiLogIn } from "react-icons/bi";
import { LuCalendarClock } from "react-icons/lu";
import { TbBrandSpeedtest } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';

interface NavLinkAdminProps {
  isCollapsed?: boolean;
}

export default function NavLinkAdmin({ isCollapsed = false }: NavLinkAdminProps) {
  const t = useTranslation();

  type NavItem = {
    name: string;
    path: string;
    icon: JSX.Element;
  };  
  const navItems: NavItem[] = [
    { name: t.overview, path: "/admin/admin/overview", icon: <TbBrandSpeedtest size={20} /> },
    { name: t.upcomingMeetings, path: "/admin/admin/upcoming", icon: <BiCalendar size={20} /> },
    { name: t.previousMeetings, path: "/admin/admin/previous", icon: <LuCalendarClock size={20} /> },
    { name: t.visitorsCheckIns, path: "/admin/admin/visitors", icon: <BiLogIn size={18} /> },
    { name: t.staffManagement, path: "/admin/admin/staff", icon: <FaUsers size={20} /> },
  ];
  
  return (
    <nav className="w-full flex flex-col gap-2">
      {navItems.map((item) => (
        <motion.div
          key={item.name}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-[#004d48] text-white"
                  : "text-gray-300 hover:bg-[#004d48] hover:text-white"
              }`
            }
          >
            {item.icon}
            {!isCollapsed && (
              <motion.span 
                className="font-medium text-sm"
                key={item.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {item.name}
              </motion.span>
            )}
          </NavLink>
        </motion.div>
      ))}
    </nav>
  )
}
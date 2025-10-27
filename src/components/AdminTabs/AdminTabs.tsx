import { useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface TabDef {
  id: string;
  label: string;
  component: ReactNode;
  show?: (path: string) => boolean;
}

interface AdminTabsProps {
  tabs: TabDef[];
  path?: string; // يمكن تمريره إذا احتجت لتحديد التاب المعروض حسب الـ path
}

export default function AdminTabs({ tabs, path = "" }: AdminTabsProps) {
  const visibleTabs = tabs.filter((tab) => (tab.show ? tab.show(path) : true));
  const [activeTab, setActiveTab] = useState<string>(visibleTabs[0]?.id || "");

  return (
    <div className="flex flex-col gap-12">
      {/* أزرار التابات */}
      <div className="rounded-xl p-1 bg-[#F0F6F6] flex">
        {visibleTabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 flex-1 text-sm font-medium transition-all rounded-xl ${
              activeTab === tab.id ? "bg-white shadow" : ""
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* محتوى التاب النشط */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {visibleTabs.find((tab) => tab.id === activeTab)?.component}
      </motion.div>
    </div>
  );
}

"use client"

import { StatutCommande } from "@/components/constant/Status"

export interface FilterTabsProps {
  tabs: readonly StatutCommande[]
  activeTab: StatutCommande
  onChange: (tab: StatutCommande) => void
}

export default function FilterTabs({
  tabs,
  activeTab,
  onChange,
}: FilterTabsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 rounded-full text-sm transition ${
            activeTab === tab
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ADMIN_MENU_ITEMS } from "@/components/constant"
import Logo from "@/components/ui/Logo"

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <section className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col p-4 fixed left-0 top-0 text-[20px]">
      <div className="flex items-center gap-3 px-2 mb-10">
        <p className="text-white text-2xl font-title">RAFIACRAFT</p>
      </div>

      <nav className="flex-1 space-y-2">
        {ADMIN_MENU_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-[#6B8E23] text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon size={20} />
                <span className="font-medium">{item.title}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
      <div></div>
    </section>
  )
}

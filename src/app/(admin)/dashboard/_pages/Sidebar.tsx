"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ADMIN_MENU_ITEMS } from "@/components/constant"

export const Sidebar = () => {
  const pathname = usePathname()

  // On enferme la logique dans une fonction pour qu'elle ne s'exécute qu'au clic
  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    document.cookie =
      "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    localStorage.clear()
    window.location.href = "/" // Utilise window.location.href (pas localStorage.href)
  }

  return (
    <section className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col p-4 fixed left-0 top-0 text-[20px]">
      <div className="flex items-center gap-3 px-2 mb-10">
        <p className="text-white text-2xl font-bold italic">RAFIACRAFT</p>
      </div>

      <nav className="flex-1 space-y-2">
        {ADMIN_MENU_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const isLogout = item.title === "Logout"

          const content = (
            <div className="flex items-center gap-4">
              <Icon
                size={20}
                className={`transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : isLogout
                    ? "text-red-400 group-hover:text-gray-100"
                    : "text-slate-400 group-hover:text-[#1b4332]"
                }`}
              />
              <span className="font-medium">{item.title}</span>
            </div>
          )

          if (isLogout) {
            return (
              <button
                key="logout-btn"
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-1 py-3 rounded-xl transition-all duration-200 group text-red-400 hover:bg-[#FC7A57]  hover:text-white mt-10"
              >
                {content}
              </button>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-[#FC7A57] text-white hover:bg-[#e96b4a]"
                  : "text-slate-500 hover:bg-[#DFF8EB] hover:text-[#1b4332]"
              }`}
            >
              {content}

              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold group-hover:bg-red-600">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </section>
  )
}

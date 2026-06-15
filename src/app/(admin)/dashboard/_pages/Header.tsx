"use client"

//import { Sun, Moon } from "lucide-react"
import { UserProps } from "@/types/global"
import { ROUTE_TITLES } from "@/components/constant"
import { usePathname } from "next/navigation"

export const Header = ({ user }: { user?: UserProps | null }) => {
  const pathname = usePathname()
  const currentTitle = ROUTE_TITLES[pathname] || "Dashboard"

  const displayName = user?.name || "Administrateur"
  const dynamicAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=FC7A57&color=fff&bold=true`

  return (
    <header className="flex items-center justify-between mb-8 w-full">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800">
          {currentTitle}
        </h1>
        <div className="mt-2 bg-white px-4 py-1.5 rounded-lg border border-gray-100 text-gray-400 text-sm inline-block shadow-sm">
          <input
            type="date"
            className="outline-none bg-transparent cursor-pointer"
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Toggle Mode Sombre/Clair */}
        {/* <div className="flex items-center bg-gray-200 rounded-xl p-1 border border-gray-200">
          <button className="p-1.5 rounded-lg bg-white text-indigo-600 shadow-sm transition-all">
            <Sun size={18} />
          </button>
          <button className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 transition-colors">
            <Moon size={18} />
          </button>
        </div> */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-lg leading-tight">
              Hey,{" "}
              <span className="font-bold text-slate-800">{displayName}</span>
            </p>
            <p className="text-sm text-gray-400 font-medium">
              {user?.role || "Chargement..."}
            </p>
          </div>

          <div className="relative">
            <div className="w-11 h-11 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100">
              <img
                src={dynamicAvatar}
                alt={`Profil de ${displayName}`}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge de statut en ligne */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
        </div>
      </div>
    </header>
  )
}

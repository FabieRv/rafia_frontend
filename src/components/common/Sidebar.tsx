// src/components/common/Sidebar.tsx
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  LogOut,
} from "lucide-react"
import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#1e293b] text-white fixed left-0 top-0 flex flex-col p-6 shadow-xl">
      <div className="mb-10 flex items-center gap-2">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold">
          M
        </div>
        <span className="text-xl font-bold tracking-tight">Art Malagasy</span>
      </div>

      <nav className="flex-1 space-y-2">
        {[
          { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
          { icon: ShoppingBag, label: "Ventes", href: "/dashboard/sales" },
          { icon: Package, label: "Produits", href: "/dashboard/products" },
          { icon: Users, label: "Artisans", href: "/dashboard/artisans" },
        ].map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-slate-700 pt-4">
        <button className="flex items-center gap-3 p-3 w-full text-red-400 hover:bg-red-900/20 rounded-lg transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  )
}

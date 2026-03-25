// src/app/(admin)/layout.tsx

import Sidebar from "@/components/common/Sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. Ta Sidebar fixe à gauche */}
      <Sidebar />

      {/* 2. Le contenu de tes pages admin à droite */}
      <div className="flex-1 ml-64 p-10">{children}</div>
    </div>
  )
}

import { Sidebar } from "@/app/(admin)/dashboard/_pages/Sidebar"
import { Header } from "./dashboard/_pages/Header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex bg-[#f6f6f9] min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <Header />
        {children}
      </main>
    </div>
  )
}

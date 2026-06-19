import { Users, Package, ShoppingCart, BarChart3, Calendar } from "lucide-react"
import { TopSoldItem } from "./_pages/TopSoldItem"
import { StatCard } from "./_pages/StatCard"

import { cookies } from "next/headers"
import { getTotalClients } from "@/services/dashboard/clients.service"
import { getTotalProduct } from "@/services/dashboard/product.service"
import {
  getTotalCommandes,
  getTotalVentes,
} from "@/services/dashboard/commande.service"
import { getActivityLogs } from "@/services/dashboard/activity.service"
import { RecentActivity } from "./_pages/RecentActivity"

export const revalidate = 0

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const [clients, products, commandes, ventes, activities] = await Promise.all([
    getTotalClients(token!),
    getTotalProduct(token!),
    getTotalCommandes(token!),
    getTotalVentes(token!),
    getActivityLogs(token!),
  ])

  const totalClients = clients?.count ?? 0
  const totalProducts = products?.count ?? 0
  const totalCommandes = Number(commandes)
  const totalVentes = ventes ?? 0

  return (
    <div className="p-6 bg-[#F8F9FD] min-h-screen space-y-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Clients"
          value={totalClients}
          icon={<Users size={24} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-500"
        />
        <StatCard
          title="Total Produits"
          value={totalProducts}
          icon={<Package size={24} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
        />
        <StatCard
          title="Total des commandes"
          value={totalCommandes}
          icon={<ShoppingCart size={24} />}
          iconBg="bg-red-50"
          iconColor="text-red-500"
        />
        <StatCard
          title="Total Ventes"
          value={totalVentes}
          icon={<BarChart3 size={24} />}
          iconBg="bg-green-50"
          iconColor="text-green-500"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
        {/* LEFT */}
        <div className="w-full flex">
          <RecentActivity activities={activities} />
        </div>

        {/* RIGHT */}
        <div className="w-full bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100/80 h-90 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-800 text-[17px] mb-4 tracking-tight">
              Top catégories du mois
            </h3>

            <div className="space-y-3.5 mt-10">
              <TopSoldItem
                name="Chapeaux"
                percentage={75}
                color="bg-blue-400"
              />
              <TopSoldItem
                name="Panier"
                percentage={90}
                color="bg-orange-400"
              />
              <TopSoldItem name="Pochette" percentage={80} color="bg-red-400" />
              <TopSoldItem
                name="Boite"
                percentage={60}
                color="bg-emerald-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

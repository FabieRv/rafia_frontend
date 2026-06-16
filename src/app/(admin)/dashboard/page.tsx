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

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const [clients, products, commande] = await Promise.all([
    getTotalClients(token!),
    getTotalProduct(token!),
    getTotalCommandes(token!),
    getTotalVentes(token!),
  ])

  const totalClients = clients?.count ?? 0
  const totalProducts = products?.count ?? 0
  const totalCommandes = Number(commande)

  console.log("clients ok")
  console.log("products ok")
  console.log("commandes ok")

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
          value="2000+"
          icon={<BarChart3 size={24} />}
          iconBg="bg-green-50"
          iconColor="text-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-50">
          <h3 className="font-bold text-lg mb-4">All Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-400 border-b">
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Orders ID</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[1, 2, 3].map((item) => (
                  <tr
                    key={item}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 font-medium flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                      Panier Raffia
                    </td>
                    <td className="py-4 text-gray-500">#202394</td>
                    <td className="py-4 text-gray-500 italic flex items-center gap-1">
                      <Calendar size={14} /> 1 Jan 26
                    </td>
                    <td className="py-4 font-bold text-slate-700">1200 Ar</td>
                    <td className="py-4">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-[11px] font-bold">
                        COMPLETED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Sold Items */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
          <h3 className="font-bold text-lg mb-6">Top Sold Items</h3>
          <TopSoldItem name="Jeans" percentage={75} color="bg-blue-400" />
          <TopSoldItem name="Jacket" percentage={90} color="bg-orange-400" />
          <TopSoldItem name="Sweater" percentage={80} color="bg-red-400" />
          <TopSoldItem name="T-Shirt" percentage={60} color="bg-emerald-400" />
        </div>
      </div>
    </div>
  )
}

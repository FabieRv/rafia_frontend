import {
  ShoppingCart,
  Package,
  DollarSign,
  TrendingUp,
  Plus,
} from "lucide-react"
import { StatCard } from "./_pages/StatCard"

export default function DashboardPage() {
  return (
    <div className="space-y-8 font-text ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Produits en Stock"
          value="142"
          icon={<Package size={20} />}
          percentage={62}
          color="bg-[#1AFFD5]"
        />
        <StatCard
          title="Commandes"
          value="12"
          icon={<TrendingUp size={20} />}
          percentage={44}
          color="bg-emerald-500"
        />
        <StatCard
          title="Ventes"
          value="25,024 Ar"
          icon={<ShoppingCart size={20} />}
          percentage={81}
          color="bg-indigo-500"
        />

        <StatCard
          title="Total Net"
          value="10,864 Ar"
          icon={<DollarSign size={20} />}
          percentage={25}
          color="bg-[#499f68]"
        />
      </div>
      <div className="bg-white p-8 rounded-4xlshadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl lg:2xl font-bold text-slate-800">
            Commandes Récentes
          </h2>
          <button className="flex items-center gap-2 bg-[#fac748] text-white px-4 py-2 rounded-2xl  font-medium hover:bg-[#e67e22] transition-colors text-lg">
            <Plus size={18} />
            Ajouter Produit
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-black text-lg border-b border-gray-50">
                <th className="pb-4 font-bold">Nom du Produit</th>
                <th className="pb-4 font-bold">Référence</th>
                <th className="pb-4 font-bold">Paiement</th>
                <th className="pb-4 font-bold">Statut</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-50 last:border-0">
                <td className="py-4 text-slate-700 font-medium text-[14px]">
                  Panier en Raffia XL
                </td>
                <td className="py-4 text-gray-500 text-[14px]">#RF-8563</td>
                <td className="py-4 text-gray-500 text-[14px]">Mobile Money</td>
                <td className="py-4">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[12px] font-bold uppercase">
                    En attente
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-indigo-600 font-bold hover:underline text-lg">
                    Détails
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-center mt-6">
            <button className="text-indigo-600 text-lg font-bold hover:tracking-widest transition-all">
              Afficher tout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

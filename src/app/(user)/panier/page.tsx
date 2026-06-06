"use client"

import CartItem from "@/components/common/CartItem"
import Container from "@/components/common/Container"
import { useCommandeStore } from "@/store/commande.store"
import { useRouter } from "next/navigation"

// Composant pour l'item du panier

export default function Panier() {
  const items = useCommandeStore((state) => state.items)
  const clear = useCommandeStore((state) => state.clear)
  const total = items.reduce((sum, item) => sum + item.prix * item.quantite, 0)
  const TAX_RATE = 0.2
  const totalHT = items.reduce(
    (sum, item) => sum + item.prix * item.quantite,
    0
  )
  const tax = totalHT * TAX_RATE
  const totalTTC = totalHT + tax
  const router = useRouter()

  return (
    <Container>
      <div className="min-h-screen bg-[#f0f7ff] p-10 font-sans">
        <h1 className="text-2xl font-bold mb-8 text-[#1a1a1a]">
          {items.length}{" "}
          {items.length > 1
            ? "Categories de produits"
            : "catégorie de produits"}{" "}
          dans le panier
        </h1>

        <div className="flex flex-col lg:flex-row items-start gap-8 max-w-7xl mx-auto">
          {/* Produits (Scrollable) */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="max-h-125 overflow-y-auto custom-scrollbar">
              {/* Remplacez par vos data.map */}
              {items.map((item) => (
                <CartItem key={item.id_produit} {...item} />
              ))}
            </div>
            <div className="flex items-center">
              <button onClick={clear} className="text-red-500 underline">
                Vider le panier
              </button>
            </div>
          </div>

          {/* Card Total (Bloquée / Sticky) */}
          <div className="w-[350px] sticky top-10">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-4 pb-4 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Prix hors Tax:</span>
                  <span className="font-semibold text-gray-800">
                    {total.toFixed(2)} €
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Unités totales :</span>
                  <span className="text-green-600 font-bold">
                    {items.length} (Unités)
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>TAX:</span>
                  <span className="font-semibold text-gray-800">
                    {tax.toFixed(2)} €
                  </span>
                </div>
              </div>

              <div className="py-6 flex justify-between items-baseline">
                <span className="text-2xl font-bold text-[#1a1a1a]">
                  Prix total:
                </span>
                <span className="text-2xl font-black text-[#1a1a1a] ml-2">
                  {" "}
                  {totalTTC.toFixed(2)} €
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push("/commande")}
                  className="w-full border-2  py-2 rounded-full font-semibold   transition-colors"
                >
                  Continue
                </button>
                <button
                  onClick={() => router.push("/modele")}
                  className="w-full border border-gray-300 py-2 rounded-full font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Retour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

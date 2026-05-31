"use client"

import Link from "next/link"
import { usecommandeStore } from "@/store/commande.store"
import CartItem from "@/components/common/CartItem"

export default function CartPage() {
  const items = usecommandeStore((state) => state.items)
  const clearOrder = usecommandeStore((state) => state.clearOrder)
  const getTotal = usecommandeStore((state) => state.getTotal)

  const total = getTotal()

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mon Panier</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p>Panier vide</p>
          <Link href="/catalogue" className="text-blue-500">
            Continuer les achats
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id_produit} item={item} />
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button onClick={clearOrder} className="text-red-500">
              Vider panier
            </button>

            <div className="text-right">
              <p className="font-bold text-lg">
                Total: {total.toLocaleString()} Ar
              </p>

              <button className="mt-3 bg-green-600 text-white px-6 py-2 rounded-full">
                Valider commande
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

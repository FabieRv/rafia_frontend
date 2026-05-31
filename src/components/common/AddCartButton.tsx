"use client"

import { usecommandeStore } from "@/store/commande.store"
import { Product } from "@/types/global"
interface AddToCartButtonProps {
  id_produit: number
  prix: number
  quantite: number
}

export default function AddToCartButton({
  id_produit,
  prix,
  quantite,
}: AddToCartButtonProps) {
  const addItem = usecommandeStore((state) => state.addItem)

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
      onClick={() =>
        addItem({
          id_produit: id_produit,
          prix: prix,
          quantite: quantite,
        })
      }
    >
      Ajouter au panier
    </button>
  )
}

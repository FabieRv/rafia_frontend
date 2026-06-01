"use client"

import { addItem } from "@/store/commande.store"
import { Product } from "@/types/global"
interface AddToCartButtonProps {
  id_produit: number
  prix: number
  quantite: number
  nom_produit:string
}

export default function AddToCartButton({
  id_produit,
  prix,
  quantite,nom_produit
}: AddToCartButtonProps) {

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
      onClick={() =>
        addItem({
          id_produit: id_produit,
          prix: prix,
          quantite: quantite,
          nom_produit: nom_produit
        })
      }
    >
      Ajouter au panier
    </button>
  )
}

"use client"

import { useCommandeStore } from "@/store/commande.store"

export default function AddToCartButton({ product }: any) {
  const addItem = useCommandeStore((state) => state.addItem)

  return (
    <button
      onClick={() =>
        addItem({
          id_produit: product.id_produit,
          nom_produit: product.nom_produit,
          prix: Number(product.prix),
          quantite: 1,
        })
      }
      className="bg-[#e67e22] text-white px-4 py-2 rounded"
    >
      Ajouter au panier
    </button>
  )
}

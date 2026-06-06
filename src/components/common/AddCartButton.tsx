"use client"

import { useRouter } from "next/navigation"
import { useCommandeStore } from "@/store/commande.store"

export default function AddToCartButton({ product }: any) {
  const addItem = useCommandeStore((state) => state.addItem)
  const router = useRouter()

  const handleAddToCart = () => {
    addItem({
      id_produit: product.id_produit,
      nom_produit: product.nom_produit,
      prix: Number(product.prix),
      quantite: 1,
    })

    // redirect vers panier
    setTimeout(() => {
      router.push("/panier")
    }, 1000)
  }

  return (
    <button
      onClick={handleAddToCart}
      className="py-3 px-4 bg-[#E67E22] text-sm font-text text-white rounded-2xl font-semibold
      transition-transform hover:scale-105 active:scale-95
      flex items-center justify-center gap-2"
    >
      Ajouter au panier
    </button>
  )
}

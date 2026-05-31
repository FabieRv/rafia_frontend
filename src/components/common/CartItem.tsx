"use client"

import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi"
import { CommandItem } from "@/types/global"
import { usecommandeStore } from "@/store/commande.store"

interface CartItemProps {
  item: CommandItem
}

export default function CartItem({ item }: CartItemProps) {
  const removeItem = usecommandeStore((state) => state.removeItem)
  const incrementQuantity = usecommandeStore((state) => state.incrementQuantity)
  const decrementQuantity = usecommandeStore((state) => state.decrementQuantity)

  return (
    <div className="flex justify-between items-center border p-4 rounded-xl">
      {/* Produit */}
      <div>
        <p className="font-bold">Produit #{item.id_produit}</p>
        <p className="text-sm text-gray-500">{item.prix.toLocaleString()} Ar</p>
      </div>

      {/* Quantité */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => decrementQuantity(item.id_produit)}
          className="p-2 border rounded"
        >
          <FiMinus />
        </button>

        <span className="w-8 text-center font-bold">{item.quantite}</span>

        <button
          onClick={() => incrementQuantity(item.id_produit)}
          className="p-2 border rounded"
        >
          <FiPlus />
        </button>
      </div>

      {/* Total */}
      <div className="font-bold">
        {(item.prix * item.quantite).toLocaleString()} Ar
      </div>

      {/* Supprimer */}
      <button
        onClick={() => removeItem(item.id_produit)}
        className="text-red-500"
      >
        <FiTrash2 />
      </button>
    </div>
  )
}

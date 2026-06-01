// @/components/common/CartItem.tsx
"use client"

import { addItem, decrementQuantity, getItems, incrementQuantity, removeItem } from "@/store/commande.store"
import { CommandItem } from "@/types/global"
import { Plus, Minus, Trash2 } from "lucide-react"

interface CartItemProps {
  item: CommandItem
}

export default function CartItem({ item }: CartItemProps) {
  

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white gap-4">
      {/* SECTION GAUCHE : INFOS PRODUIT */}
      <div className="flex items-center gap-4 flex-1">
        {/* Placeholder pour l'image (comme sur le design cad.png) */}
        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">
          Image
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{item.nom_produit}</h3>
          <p className="text-gray-500 text-sm">
            {item.prix.toLocaleString()} Ar / unité
          </p>
        </div>
      </div>

      {/* SECTION DROITE : CONTROLES ET PRIX */}
      <div className="flex items-center gap-6">
        {/* Boutons - / + */}
        <div className="flex items-center border rounded-md bg-gray-50 overflow-hidden">
          <button
            type="button"
            onClick={() => decrementQuantity(item.id_produit)}
            className="p-2 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <Minus size={16} />
          </button>

          {/* <span className="font-semibold text-sm w-8 text-center select-none">
            {item.quantite}
          </span> */}
          <input
            type="number"
            value={item.quantite}
            readOnly
          ></input>

          <button
            type="button"
            onClick={() => incrementQuantity(item.id_produit)}
            className="p-2 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Prix Total de la ligne */}
        <p className="font-bold w-28 text-right text-gray-900">
          {(item.prix * item.quantite).toLocaleString()} Ar
        </p>

        {/* Bouton Supprimer */}
        <button
          type="button"
          onClick={() => removeItem(item.id_produit)}
          className="text-red-400 hover:text-red-600 p-1 transition-colors"
          title="Supprimer l'article"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  )
}

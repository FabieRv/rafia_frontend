import { useCommandeStore } from "@/store/commande.store"

type Props = {
  id_produit: number
  nom_produit: string
  prix: number
  quantite: number
  image: string
}

const CartItem = ({ id_produit, nom_produit, prix, quantite, image }: any) => {
  const updateQuantity = useCommandeStore((state) => state.updateQuantity)
  const removeItem = useCommandeStore((state) => state.removeItem)
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-100 last:border-0">
      {/* IMAGE + INFO */}
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 border border-gray-200 rounded p-2 flex items-center justify-center">
          <img
            src={image}
            alt={nom_produit}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-[#1a1a1a] text-lg max-w-7 leading-snug">
            {nom_produit}
          </h3>
          <p>{prix} €</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-12">
        {/* QUANTITÉ */}
        <div className="flex items-center bg-orange-100 rounded-md h-10">
          <button
            onClick={() =>
              updateQuantity(id_produit, Math.max(1, quantite - 1))
            }
            className="w-10 h-10 flex items-center justify-center"
          >
            —
          </button>

          <span className="w-10 h-10 font-bold flex items-center justify-center">
            {quantite}
          </span>

          <button
            onClick={() => updateQuantity(id_produit, quantite + 1)}
            className="w-10 h-10 flex items-center justify-center"
          >
            +
          </button>
        </div>

        {/* PRIX */}
        <div className="text-right min-w-30">
          <p className="text-2xl font-bold text-[#1a1a1a]">
            {(prix * quantite).toFixed(2).replace(".00", "")}€
          </p>
          <p className="text-gray-400 text-xs">${prix} / par detail</p>
        </div>

        {/* REMOVE */}
        <button
          onClick={() => removeItem(id_produit)}
          className="text-red-500 border border-red-200 px-4 py-1.5 rounded hover:bg-red-50 text-sm font-medium transition-colors"
        >
          Supprimer
        </button>
      </div>
    </div>
  )
}

export default CartItem

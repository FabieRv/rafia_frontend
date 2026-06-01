// Option 1 : Déclarer puis exporter (Recommandé pour la clarté)
const CartItem = ({ nom, vendeur, prix, quantite, image }: any) => (
  <div className="flex items-center justify-between p-6 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-6">
      <div className="w-20 h-20 border border-gray-200 rounded p-2 flex items-center justify-center">
        <img
          src={image}
          alt={nom}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <div className="flex flex-col">
        <h3 className="font-bold text-[#1a1a1a] text-lg max-w-7 leading-snug">
          {nom}
        </h3>
        <p className="text-gray-400 text-sm">Seller: {vendeur}</p>
      </div>
    </div>

    <div className="flex items-center gap-12 ">
      <div className="flex items-center bg-orange-100 rounded-md h-10">
        <button className="w-10 h-10 text-gray-700 hover:bg-orange-200 flex items-center justify-center">
          —
        </button>

        <span className="w-10 h-10 font-bold text-gray-800 flex items-center justify-center">
          1
        </span>

        <button className="w-10 h-10 text-gray-700 hover:bg-orange-200 flex items-center justify-center">
          +
        </button>
      </div>
      <div className="text-right min-w-30">
        <p className="text-2xl font-bold text-[#1a1a1a]">
          ${(prix * quantite).toFixed(2).replace(".00", "")}
        </p>
        <p className="text-gray-400 text-xs">${prix} / per item</p>
      </div>

      <button className="text-red-500 border border-red-200 px-4 py-1.5 rounded hover:bg-red-50 text-sm font-medium transition-colors">
        Remove
      </button>
    </div>
  </div>
)

export default CartItem

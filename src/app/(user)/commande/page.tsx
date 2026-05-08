"use client"

import Image from "next/image"

export default function CommandePage() {
  const product = {
    name: "Sac en raphia",
    description: "Sac artisanal fait main à Madagascar",
    price: 25000,
    image: "/sac.jpg",
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* IMAGE */}
      <div className="w-full h-64 relative rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* INFOS PRODUIT */}
      <div className="mt-4">
        <h1 className="text-xl font-bold">{product.name}</h1>

        <p className="text-gray-600 mt-2">{product.description}</p>

        <p className="text-lg font-semibold mt-2">Prix : {product.price} Ar</p>
      </div>

      {/* BOUTONS */}
      <div className="flex gap-3 mt-5">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Chat avec Responsable
        </button>

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Ajouter au panier
        </button>

        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Annuler commande
        </button>
      </div>
    </div>
  )
}

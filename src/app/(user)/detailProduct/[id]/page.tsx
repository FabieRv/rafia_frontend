import AddToCartButton from "@/components/common/AddCartButton"
import { getCleanImageUrl } from "@/components/shared/utils/image"
import { getProductById } from "@/services/produitServices"
import { Product } from "@/types/global"
import Image from "next/image"

export default async function DetailProduct({
  params,
}: {
  params: { id: string }
}) {
  const paramId = await params
  const id: number = Number(paramId.id)

  console.log(
    "-------------------------- + params--------" +
      (await JSON.stringify(params))
  )
  const product: Product = await getProductById(id)
  const displayPrice = !isNaN(Number(product.prix))
    ? Number(product.prix).toFixed(2)
    : "0.00"
  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* IMAGE */}
      <div className="w-full h-80 relative rounded-lg overflow-hidden">
        <Image
          src={getCleanImageUrl(product.image ?? "/default.png")}
          alt={product.nom_produit}
          fill
          className=" w-full h-full object-cover"
          unoptimized
        />
      </div>

      {/* INFOS PRODUIT */}
      <div className="mt-4">
        <h1 className="text-xl font-bold">{product.nom_produit}</h1>

        <p className="text-gray-600 mt-2">{product.description}</p>

        <p className="text-lg font-semibold mt-2">Prix : {displayPrice} € </p>
      </div>

      {/* BOUTONS */}
      <div className="flex flex-wrap gap-4  mt-5 mb-16">
        <button className="bg-[#e67e22] text-white px-4 py-2 rounded hover:bg-[#d35400] transition-colors">
          Ajouter aux favorites
        </button>

        <AddToCartButton product={product} />

        <button className="bg-white text-black px-4 py-2 rounded border border-gray-300">
          Annuler
        </button>
      </div>
    </div>
  )
}

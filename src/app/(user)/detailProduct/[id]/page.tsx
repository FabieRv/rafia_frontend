import AddToCartButton from "@/components/common/AddCartButton"
import CancelButton from "@/components/common/CancelButton"
import Container from "@/components/common/Container"
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
    <Container>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex justify-center shadow-lg items-center h-[450px]">
            <Image
              src={getCleanImageUrl(product.image ?? "/default.png")}
              alt={product.nom_produit}
              width={500}
              height={500}
              className="object-contain max-h-full p-4"
              unoptimized
            />
          </div>

          {/* COLONNE DROITE */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-gray-500">Produit / Détail</p>
            </div>

            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-orange-500 mt-2">
                {product.nom_produit}
              </h1>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-3xl font-bold text-gray-900">
                Prix: € {displayPrice}
              </span>

              <span className="text-xl text-gray-400 line-through">
                € {(Number(displayPrice) + 5).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <span className="text-yellow-500 text-lg">★★★★★</span>

              <span className="text-gray-500 text-sm">17 avis</span>
            </div>

            <hr className="my-6 " />

            <div className="bg-gray-50 border-l-4 border-orange-500 p-4 rounded">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <hr className="my-6" />

            {/* BOUTONS */}
            <div className=" grid grid-cols-3 gap-4 mt-4">
              <button
                className="py-2 px-3 bg-pink-50 text-pink-600 border border-red-300 text-sm font-semibold rounded-2xl
                    transition-all hover:bg-pink-100 hover:scale-105 active:scale-95
                    flex items-center justify-center gap-2 shadow-sm"
              >
                ❤️ Ajouter aux favoris
              </button>
              <AddToCartButton product={product} />
              <button>Chatter avec l'admin</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

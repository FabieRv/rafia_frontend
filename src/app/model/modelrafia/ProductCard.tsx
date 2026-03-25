"use client"

import { Heart, Star } from "lucide-react"

interface ProductProps {
  title: string
  price: number | string
  image: string
  rating?: number
}

export function ProductCard({ title, price, image, rating = 5 }: ProductProps) {
  const getCleanImageUrl = (path: string) => {
    if (!path) return "https://placehold.co/400x300?text=Pas+d'image"
    if (path.startsWith("http")) return path

    const fileName = path.split(/[/\\]/).pop()
    return process.env.NEXT_PUBLIC_API_URL + `/uploads/${fileName}`
  }

  const imageUrl = getCleanImageUrl(image)
  const displayPrice = !isNaN(Number(price)) ? Number(price).toFixed(2) : "0.00"

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-4/3 bg-[#f2f2f2] rounded-[2.5rem] overflow-hidden mb-4 flex items-center justify-center p-8">
        <button className="absolute top-3 right-2 z-10 p-1 text-gray-900 hover:scale-110 transition-transform">
          <Heart size={22} strokeWidth={1.5} />
        </button>

        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.onerror = null
            target.src = "https://placehold.co/400x300?text=Image+Non+Trouvée"
          }}
        />
      </div>

      {/* INFOS PRODUIT */}
      <h3 className="font-bold text-gray-900 text-[16px] mb-1 truncate">
        {title}
      </h3>

      <div className="flex items-center gap-1 mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < rating
                  ? "fill-[#fac748] text-[#fac748]"
                  : "fill-gray-200 text-gray-200"
              }
            />
          ))}
        </div>
        <p className="text-[11px] text-gray-400 ml-1 font-bold">{rating}/5</p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-xl font-bold text-gray-900">{displayPrice} €</p>
      </div>
    </div>
  )
}

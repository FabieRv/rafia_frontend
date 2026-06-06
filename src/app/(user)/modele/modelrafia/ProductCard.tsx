import { getCleanImageUrl } from "@/components/shared/utils/image"
import { Heart, Star } from "lucide-react"
import Link from "next/link"

interface ProductProps {
  id: number
  title: string
  price: number | string
  image: string
  rating?: number
}

export function ProductCard({
  id,
  title,
  price,
  image,
  rating = 5,
}: ProductProps) {
  const imageUrl = getCleanImageUrl(image)

  const displayPrice = !isNaN(Number(price)) ? Number(price).toFixed(2) : "0.00"

  return (
    <Link href={`/detailProduct/${id}`} className="h-full">
      <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* IMAGE */}
        <div className="relative aspect-[4/3] bg-gray-100 flex items-center justify-center p-6 overflow-hidden">
          {/* FAVORI */}
          <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm hover:scale-110 transition">
            <Heart size={18} strokeWidth={1.5} />
          </button>

          <div className="aspect-4/3 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "https://placehold.co/400x300?text=Image"
              }}
            />
          </div>
        </div>

        {/* INFOS */}
        <div className="p-4 flex flex-col flex-1">
          {/* TITLE */}
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 min-h-[40px]">
            {title}
          </h3>

          {/* RATING */}
          <div className="flex items-center gap-1 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }
                />
              ))}
            </div>

            <span className="text-[11px] text-gray-500 font-medium">
              {rating}/5
            </span>
          </div>

          {/* PRICE + BUTTON (TOUJOURS EN BAS) */}
          <div className="flex items-center justify-between mt-auto pt-3">
            <p className="text-lg font-bold text-gray-900">{displayPrice} €</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

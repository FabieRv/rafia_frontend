import { Heart, Star } from "lucide-react"

function ProductCard({ title, price, oldPrice, discount, rating, image }: any) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[4/3] bg-[#f2f2f2] rounded-[2.5rem] overflow-hidden mb-4 flex items-center justify-center p-8">
        <button className="absolute top-5 right-5 z-10 p-1 text-gray-900 hover:scale-110 transition-transform">
          <Heart size={22} strokeWidth={1.5} />
        </button>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

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
                i < Math.floor(rating)
                  ? "fill-[#fac748] text-[#fac748]"
                  : "fill-gray-200 text-gray-200"
              }
            />
          ))}
        </div>
        <p className="text-[11px] text-gray-400 ml-1 font-bold">{rating}/5</p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-xl font-bold text-gray-900">${price}</p>
        {oldPrice && (
          <span className="text-sm text-gray-400 line-through font-medium">
            ${oldPrice}
          </span>
        )}
        {discount && (
          <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
            {discount}
          </span>
        )}
      </div>
    </div>
  )
}

export default ProductCard

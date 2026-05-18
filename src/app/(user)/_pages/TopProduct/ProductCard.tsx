"use client"

import { motion } from "framer-motion"

import WishlistButton from "./WishlistButton"
import StarRating from "./StarRating"

import { cardVariants, imageVariants } from "./animation"

interface ProductCardProps {
  category: string
  title: string
  rating: number
  reviews: number
  price: string
  oldPrice?: string
  image: string
  imageAlt: string
  isWishlisted?: boolean
  index: number
  onWishlistClick?: () => void
  onAddToCart?: () => void
}

export default function ProductCard({
  category,
  title,
  rating,
  reviews,
  price,
  oldPrice,
  image,
  imageAlt,
  isWishlisted = false,
  index,
  onWishlistClick,
}: ProductCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 overflow-hidden"
    >
      <WishlistButton isWishlisted={isWishlisted} onClick={onWishlistClick} />

      <motion.div
        className="relative w-full aspect-square bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden"
        initial="rest"
        whileHover="hover"
      >
        <motion.img
          src={image}
          alt={imageAlt}
          className="object-contain"
          variants={imageVariants}
        />
        <motion.div
          className="absolute inset-0 bg-indigo-600/5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <div className="p-5">
        <span className="text-xs font-medium text-primary uppercase tracking-wide">
          {category}
        </span>
        <h4 className="font-title text-gray-900 font-semibold mt-1 line-clamp-1 group-hover:text-secondary transition-colors duration-300">
          {title}
        </h4>

        <StarRating rating={rating} reviews={reviews} />

        <div className="flex items-center justify-between mt-4">
          <motion.div
            className="flex items-baseline gap-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
          >
            <span className="text-xl font-bold text-gray-900">{price}</span>
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {oldPrice}
              </span>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"

interface WishlistButtonProps {
  isWishlisted?: boolean
  onClick?: () => void
}

export default function WishlistButton({
  isWishlisted = false,
  onClick,
}: WishlistButtonProps) {
  return (
    <motion.button
      className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-rose-200 transition-colors duration-300"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 transition-colors duration-300 ${
          isWishlisted
            ? "text-rose-500 fill-rose-500"
            : "text-gray-400 hover:text-rose-500"
        }`}
        fill={isWishlisted ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </motion.button>
  )
}

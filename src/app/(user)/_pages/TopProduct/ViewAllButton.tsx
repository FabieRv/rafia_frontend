"use client"

import { motion } from "framer-motion"

interface ViewAllButtonProps {
  label: string
  href?: string
  onClick?: () => void
  isInView: boolean
  delay?: number
}

export default function ViewAllButton({
  label,
  href,
  onClick,
  isInView,
  delay = 1.2,
}: ViewAllButtonProps) {
  return (
    <motion.div
      className="flex justify-center mt-14"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.button
        className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-secondary text-secondary font-semibold text-sm hover:bg-secondary hover:text-white transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
      >
        {label}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </motion.svg>
      </motion.button>
    </motion.div>
  )
}

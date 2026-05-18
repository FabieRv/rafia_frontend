"use client"

import { motion } from "framer-motion"
import { itemVariants } from "./animations"

export default function FooterBottom() {
  return (
    <motion.div
      variants={itemVariants}
      className="relative z-10 mt-12 pt-8 border-t border-white/30"
    >
      <div className="flex flex-col justify-center md:flex-row items-center  gap-4">
        <span className="text-gray-50 text-sm">
          &copy; {new Date().getFullYear()} RAFIACRAFT. Tous droits réservés.
        </span>
      </div>
    </motion.div>
  )
}

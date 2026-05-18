"use client"

import { motion } from "framer-motion"
import { itemVariants } from "./animations"
import SocialIcons from "./SocialIcons"
import Logo from "@/components/ui/Logo"

export default function FooterBrand() {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center md:items-start"
    >
      <a href="#" className="mb-4 flex items-center gap-2">
        <Logo />
      </a>
      <p className="text-gray-50 max-w-xs text-center text-lg leading-relaxed md:text-left mb-6">
        Découvrez l'authenticité de l'artisanat malagasy. Chaque pièce raconte
        une histoire, chaque achat soutient directement les artisans locaux.
      </p>
      <SocialIcons />
    </motion.div>
  )
}

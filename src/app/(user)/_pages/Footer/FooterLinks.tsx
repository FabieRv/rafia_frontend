"use client"

import { motion } from "framer-motion"
import { itemVariants, linkVariants } from "./animations"

interface LinkGroup {
  title: string
  links: { label: string; href: string }[]
}

const linkGroups: LinkGroup[] = [
  {
    title: "Lien",
    links: [
      { label: "Accueil", href: "/" },
      { label: "Model", href: "/modele" },
      { label: "Catalogue", href: "/catalogue" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Categorie",
    links: [
      { label: "Panier", href: "#" },
      { label: "Chapeau", href: "#" },
      { label: "Boite", href: "#" },
      { label: "Pochette", href: "#" },
    ],
  },
]

export default function FooterLinks() {
  return (
    <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
      {linkGroups.map((group, groupIdx) => (
        <motion.div key={group.title} variants={itemVariants}>
          <div className="mb-4 text-lg font-bold tracking-widest uppercase bg-linear-to-r from-[#FFF2D7] via-[#D4A373] to-[#FFD893] bg-clip-text text-transparent inline-block">
            {group.title}
          </div>
          <ul className="space-y-3">
            {group.links.map((link, linkIdx) => (
              <li key={linkIdx}>
                <motion.a
                  href={link.href}
                  className="text-gray-50   text-lg hover:text-white transition-colors duration-300 inline-flex items-center gap-1"
                  variants={linkVariants}
                  whileHover="hover"
                  initial="rest"
                >
                  <span className="text-gray-50 ">{link.label}</span>
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </nav>
  )
}

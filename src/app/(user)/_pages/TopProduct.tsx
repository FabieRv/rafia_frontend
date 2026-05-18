"use client"

import Container from "@/components/common/Container"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import SectionHeader from "./TopProduct/SectionHeader"
import { containerVariants } from "./TopProduct/animation"
import ProductCard from "./TopProduct/ProductCard"
import ViewAllButton from "./TopProduct/ViewAllButton"

interface Product {
  category: string
  title: string
  rating: number
  reviews: number
  price: string
  oldPrice?: string
  image: string
  imageAlt: string
  isWishlisted?: boolean
}

const products: Product[] = [
  {
    category: "Panier",
    title: "Panier Rafia",
    rating: 4,
    reviews: 128,
    price: "15€",
    oldPrice: "25€",
    image: "/img/panier-6.webp",
    imageAlt: "Panier Rafia",
  },
  {
    category: "Wearables",
    title: "boite-flower-rouge",
    rating: 5,
    reviews: 89,
    price: "11€",
    oldPrice: "25€",
    image: "/img/lux1_.jpg",
    imageAlt: "boite-flower-rouge",
  },
  {
    category: "Chapeaux",
    title: "Capeline Solaire en Rafia",
    rating: 4,
    reviews: 312,
    price: "12€",
    oldPrice: "120€",
    image: "/img/chapeau.jpg",
    imageAlt: "Capeline Solaire en Rafia",
    isWishlisted: true,
  },
  {
    category: "Rabane",
    title: "Sac à dos Tech Lite",
    rating: 5,
    reviews: 57,
    price: "10€",
    oldPrice: "19€",
    image: "/img/Rabane.jpg",
    imageAlt: "Rabane",
  },
]

export default function TopProduits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 bg-white" ref={ref}>
      <Container>
        <SectionHeader
          subtitle="Collection tendance"
          title="Top Produits"
          description="Découvrez nos produits les plus populaires, sélectionnés pour leur qualité exceptionnelle et leur design moderne."
          isInView={isInView}
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {products.map((product, index) => (
            <ProductCard key={index} {...product} index={index} />
          ))}
        </motion.div>

        <ViewAllButton
          label="Voir tous les produits"
          href="/model"
          isInView={isInView}
        />
      </Container>
    </section>
  )
}

"use client"

import Container from "@/components/common/Container"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import SectionHeader from "./TopProduct/SectionHeader"
import { containerVariants } from "./TopProduct/animation"
import ProductCard from "./TopProduct/ProductCard"
import ViewAllButton from "./TopProduct/ViewAllButton"
import { products } from "@/data/productTops"
import Button from "@/components/common/Button"

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

        <ViewAllButton label="Voir tous les produits" isInView={isInView} />
      </Container>
    </section>
  )
}

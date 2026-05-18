"use client"

import Container from "@/components/common/Container"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import TestimonialHeader from "./Testimonial/TestimonialHeader"
import { containerVariants } from "./Testimonial/animations"
import TestimonialCard from "./Testimonial/TestimonialCard"

interface TestimonialData {
  name: string
  role: string
  avatar: string
  quote: string
  rating: number
}

const testimonials: TestimonialData[] = [
  {
    name: "Sophie Martin",
    role: "Commercial du boutique à Paris",
    avatar: "/img/questionaire1.png",
    quote:
      "La qualité des produits est exceptionnelle. Chaque détail est pensé pour offrir une expérience utilisateur parfaite. Je recommande vivement cette boutique à tous mes collègues.",
    rating: 5,
  },
  {
    name: "Lucas Dubois",
    role: "Vendeuse du boutique en Italie",
    avatar: "/img/questionaire2.png",
    quote:
      "Commande livrée en 24h, emballage soigné et produit conforme à la description. Le service client est également très réactif. Une expérience d'achat sans fausse note !",
    rating: 5,
  },
  {
    name: "Camille Lefèvre",
    role: "Commercial du boutique en Allemagne",
    avatar: "/img/questionaire3.png",
    quote:
      "J'ai acheté le casque Bluetooth Pro X et je suis bluffée par la qualité audio. Le rapport qualité-prix est imbattable. C'est devenu mon indispensable du quotidien.",
    rating: 4,
  },
]

export default function Testimonial() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 bg-white" ref={ref}>
      <Container>
        <TestimonialHeader
          subtitle="Ils nous font confiance"
          title="Témoignages"
          description="Découvrez ce que nos clients satisfaits disent de leur expérience avec nos produits."
          isInView={isInView}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

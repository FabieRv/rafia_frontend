"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Container from "../common/Container"
import { footerVariants } from "@/app/(user)/_pages/Footer/animations"
import FooterBrand from "@/app/(user)/_pages/Footer/FooterBrand"
import FooterLinks from "@/app/(user)/_pages/Footer/FooterLinks"
import FooterNewsletter from "@/app/(user)/_pages/Footer/FooterNewsletter"
import FooterBottom from "@/app/(user)/_pages/Footer/FooterBottom"

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer
      ref={ref}
      className="relative z-10 w-full overflow-hidden pt-16 pb-8 bg-secondary"
    >
      {/* Glow animé en fond */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 select-none">
        <motion.div
          className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-emerald-500/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-1/4 -bottom-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <Container className="py-0!">
        <motion.div
          className="mx-auto flex flex-col items-center gap-10 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={footerVariants}
        >
          <FooterBrand />

          <FooterLinks />

          <FooterNewsletter />
        </motion.div>
        <FooterBottom />
      </Container>
    </footer>
  )
}

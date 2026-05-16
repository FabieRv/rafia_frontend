"use client"

import { motion } from "framer-motion"
import { containerVariants, headerVariants } from "./animation"
import { SectionHeaderProps } from "@/types/global"

export default function SectionHeader({
  subtitle,
  title,
  description,
  isInView,
}: SectionHeaderProps) {
  return (
    <motion.div
      className="flex justify-center mb-14"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        <motion.span
          variants={headerVariants}
          className="text-sm font-semibold tracking-widest uppercase text-primary mb-3"
        >
          {subtitle}
        </motion.span>
        <motion.h1
          variants={headerVariants}
          className="font-title text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={headerVariants}
          className="font-text text-gray-500 text-lg mt-4 max-w-lg"
        >
          {description}
        </motion.p>

        <motion.div
          className="mt-6 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : { width: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
    </motion.div>
  )
}

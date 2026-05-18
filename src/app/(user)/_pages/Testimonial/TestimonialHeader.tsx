"use client"

import { motion } from "framer-motion"
import {
  containerVariants,
  headerVariants,
  decorLineVariants,
} from "./animations"

interface TestimonialHeaderProps {
  subtitle: string
  title: string
  description: string
  isInView: boolean
}

export default function TestimonialHeader({
  subtitle,
  title,
  description,
  isInView,
}: TestimonialHeaderProps) {
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
        <motion.h2
          variants={headerVariants}
          className="font-title text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
        >
          {title}
        </motion.h2>
        <motion.p
          variants={headerVariants}
          className="font-text text-gray-500 text-lg mt-4 max-w-lg"
        >
          {description}
        </motion.p>
        <motion.div
          className="mt-6 h-1 rounded-full bg-linear-to-r from-orange-300 via-green-500 to-pink-500"
          variants={decorLineVariants}
          animate={isInView ? "visible" : "hidden"}
        />
      </div>
    </motion.div>
  )
}

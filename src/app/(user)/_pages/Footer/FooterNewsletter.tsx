"use client"

import { motion } from "framer-motion"
import { itemVariants } from "./animations"
import { useState } from "react"

export default function FooterNewsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <motion.div variants={itemVariants} className="w-full md:w-auto">
      <div className="mb-4 text-lg font-bold tracking-widest uppercase bg-linear-to-r from-[#FFF2D7] via-[#D4A373] to-[#FFD893] bg-clip-text text-transparent inline-block">
        Newsletter
      </div>
      <p className="text-gray-50 text-lg mb-8 max-w-xs leading-relaxed">
        Recevez les dernières nouveautés et offres exclusives directement dans
        votre boîte mail.
      </p>
      {subscribed ? (
        <motion.div
          className="flex items-center gap-2 text-secondary-400 text-sm font-medium"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Merci pour votre inscription !
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white text-sm placeholder:text-gray-50 focus:outline-none focus:border-orange-400/50 focus:ring-1 focus:ring-orange-300/80 transition-all duration-300"
          />
          <motion.button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#e67e22] text-white text-md font-semibold hover:bg-white hover:text-orange-400 transition-colors duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            OK
          </motion.button>
        </form>
      )}
    </motion.div>
  )
}

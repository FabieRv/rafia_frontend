"use client"

import Button from "@/components/common/Button"
import Container from "@/components/common/Container"
import { motion } from "framer-motion"

export default function AboutExpertise() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-[#5da271]/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group">
              <img
                src="/img/titi_2.jpg"
                alt="Artisanat malagasy et mains de maître"
                className="w-full h-150 object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute bottom-8 right-3 bg-secondary text-white p-6 md:p-8 rounded-2xl shadow-2xl font-text">
                <p className="text-5xl font-bold mb-1">10+</p>
                <p className="text-xs uppercase tracking-[0.2em] font-semibold opacity-90">
                  Années d'Excellence
                </p>
              </div>
            </div>
          </motion.div>

          {/* --- Partie Texte (Droite) - RESTE FIXE --- */}
          <div className="w-full lg:w-1/2">
            <div
              className="inline-block px-6 py-2  bg-gray-200 text-sm font-text font-bold tracking-widest uppercase mb-6"
              style={{
                clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
              }}
            >
              Notre Héritage
            </div>

            <h2 className="text-4xl md:text-5xl font-title font-bold text-gray-900 leading-[1.15] mb-8 ">
              L'art du raphia, <br />
              <span className="text-[#5da271]">une signature</span> malagasy.
            </h2>

            <p className="text-gray-600 text-lg mb-10 leading-relaxed max-w-xl font-text">
              Depuis l'année 2010, <strong>RAFIACRAFT</strong> s'engage à
              sublimer les fibres naturelles de Madagascar. Notre savoir-faire
              n'est pas seulement une technique, c'est un héritage transmis de
              génération en génération, réinterprété pour le monde
              d'aujourd'hui.
            </p>

            <div className="space-y-8 font-text">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-2xl">
                  🌿
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xl mb-2">
                    Matières Premières Nobles
                  </h4>
                  <p className="text-gray-500 leading-relaxed">
                    Nous sélectionnons uniquement le raphia de première qualité.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-2xl">
                  ✍️
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xl mb-2">
                    Chaque Pièce est Unique
                  </h4>
                  <p className="text-gray-500 leading-relaxed">
                    Le terme "Signature" prend tout son sens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

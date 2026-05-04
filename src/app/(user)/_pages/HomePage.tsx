"use client"
import Image from "next/image"
import { useEffect } from "react"
import gsap from "gsap"
import Button from "../../../components/common/Button"
import Container from "../../../components/common/Container"
import { useGSAP } from "@gsap/react"

export default function HomePage() {
  useGSAP(() => {
    gsap.from(".hero-content", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    })
  })

  return (
    <section className="relative w-full h-113 md:h-149 overflow-hidden shadow-lg rounded-2xl bg-stone-900 mt-3">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fond.png"
          alt="Artisanat Malagasy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-black/90 via-black/50 to-transparent z-10" />
      </div>

      <div className="relative z-20 h-full">
        <div className="relative z-20 h-full">
          <Container className="h-full flex flex-col justify-center font-text">
            <div className="max-w-2xl text-white px-4 md:px-0 text-center md:text-left mx-auto md:mx-0">
              <h1 className="hero-content text-4xl md:text-6xl lg:w-206 font-bold leading-tight drop-shadow-2xl tracking-tight font-title">
                Derrière chaque création, <br className="hidden md:block" />
                <span className="text-[#D9835D]">Une Signature</span>
              </h1>

              <p className="hero-content mt-6 max-w-lg text-lg md:text-xl text-gray-100 drop-shadow-md leading-relaxed font-text">
                Portez une part de Madagascar : l'alliance parfaite entre
                savoir-faire ancestral et design contemporain
              </p>

              <div className="hero-content mt-10 flex flex-wrap justify-center md:justify-start gap-6">
                <Button
                  href="/auth"
                  label="Explorer la Collection"
                  className="px-10 py-4 text-lg shadow-xl"
                />
                <Button
                  href="/model"
                  label="Notre Savoir-faire"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#D35400] transition-all px-10 py-4 text-lg"
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}

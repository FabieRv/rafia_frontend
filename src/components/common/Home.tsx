"use client"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import Button from "./Button"
import Container from "./Container"
import { useGSAP } from "@gsap/react"

export default function Home() {
  //const heroRef = useRef(null)

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
    // Changement : h-[450px] sur mobile, h-[593px] sur tablette/PC (md:)
    <section className="relative w-full h-[450px] md:h-[593px] overflow-hidden shadow-lg rounded-2xl bg-stone-900">
      {/* 1. L'IMAGE ET OVERLAY */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fond.png"
          alt="Artisanat Malagasy"
          fill
          className="object-cover"
          priority
        />
        {/* Changement : Gradient vertical sur mobile (to-b) et horizontal sur PC (md:to-r) 
            pour que le texte reste lisible peu importe l'écran */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
      </div>

      {/* 2. LE CONTENU */}
      <div className="relative z-20 h-full">
        <div className="relative z-20 h-full">
          <Container className="h-full flex flex-col justify-center">
            {/* On garde le max-w-2xl pour que le texte s'étale bien sur la moitié gauche */}
            <div className="max-w-2xl text-white px-4 md:px-0 text-center md:text-left mx-auto md:mx-0">
              <h1 className="hero-content text-4xl md:text-6xl lg:w-206 font-bold leading-tight drop-shadow-2xl tracking-tight">
                Derrière chaque création, <br className="hidden md:block" />
                <span className="text-[#FF7F50]">Une Signature</span>
              </h1>

              <p className="hero-content mt-6 max-w-lg text-lg md:text-xl text-gray-100 drop-shadow-md leading-relaxed">
                Portez une part de Madagascar : l'alliance parfaite entre
                savoir-faire ancestral et design contemporain
              </p>

              <div className="hero-content mt-10 flex flex-wrap justify-center md:justify-start gap-6">
                <Button
                  label="Explorer la Collection"
                  className="px-10 py-4 text-lg shadow-xl"
                />
                <Button
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

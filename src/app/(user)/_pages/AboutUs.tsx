"use client"

import Button from "@/components/common/Button"
import Container from "@/components/common/Container"
import { ACCORDION_ITEMS } from "@/components/constant"
import { useState } from "react"
import { AccordionItemProps } from "@/types/global"

const AccordionItem = ({
  item,
  isActive,
  onMouseEnter,
}: AccordionItemProps) => {
  return (
    <div
      className={`
        relative h-87.5 md:h-112.5 rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? "w-62.5 md:w-100 grow" : "w-15  md:w-20 shrink-0"}
      `}
      onMouseEnter={onMouseEnter}
      onClick={onMouseEnter}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />

      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isActive ? "bg-black/20" : "bg-black/60"
        }`}
      ></div>

      <span
        className={`
          absolute text-white font-semibold whitespace-nowrap
          transition-all duration-500 ease-in-out
          ${
            isActive
              ? "bottom-6 left-6 md:bottom-8 md:left-8 text-xl md:text-2xl rotate-0"
              : "bottom-20 left-1/2 -translate-x-1/2 -rotate-90 text-sm md:text-lg opacity-70"
          }
        `}
      >
        {item.title}
      </span>
    </div>
  )
}

export default function AboutUs() {
  const [activeIndex, setActiveIndex] = useState(4)

  return (
    <section className="bg-[#F8F3ED] min-h-fit lg:min-h-[75vh] flex items-center">
      <Container className="pb-12 ">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <h2 className="text-secondary text-sm md:text-lg font-text font-semibold tracking-widest uppercase mb-2">
              Authentique chez <span className="font-bold">RAFIACRAFT</span>
            </h2>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-title font-bold text-gray-900 leading-tight">
              Notre Savoir faire en Art
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 font-text">
              Notre savoir-faire repose sur la maîtrise des techniques
              ancestrales pour donner naissance à des accessoires contemporains,
              durables et uniques.
            </p>
            <div className="mt-6 md:mt-8">
              <Button href="/contact" label="Contactez-nous "></Button>
            </div>
          </div>

          <div className="w-full lg:w-2/3 flex justify-center lg:justify-end overflow-hidden px-2 md:px-0">
            <div className="flex flex-row items-center gap-2 md:gap-3 w-full max-w-225">
              {ACCORDION_ITEMS.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

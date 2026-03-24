"use client"

import Link from "next/link"
import { useState } from "react"
import { FiUser, FiHeart, FiShoppingCart, FiPlus } from "react-icons/fi"
import MyMenu from "../common/Menu"
import Container from "../common/Container"
import Logo from "./Logo"
import Recherche from "./Recherche"

export default function Header() {
  const [isClicked, setIsClicked] = useState(false)

  return (
    /* Le conteneur parent est sticky pour fixer les deux lignes ensemble */
    <header className="sticky top-0 z-50 w-full shadow-sm">
      <div className="bg-[#FAFAFA]">
        <Container className="py-6! relative font-text">
          <nav className="flex justify-between items-center w-full relative z-50">
            <Logo />
            <ul className="hidden lg:flex items-center gap-10 font-text font-bold">
              {["ACCUEIL", "MODEL", "CATALOGUE", "CONTACT"].map(
                (text, index) => (
                  <li key={index}>
                    <Link
                      href={
                        text === "ACCUEIL"
                          ? "/"
                          : `/${text.toLowerCase().replace(" ", "")}`
                      }
                      className="text-xl font-semibold text-[#2C2C2C] hover:text-[#E67E22] transition-colors"
                    >
                      {text}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* Actions Desktop */}
            <div className="hidden text-[#A0522D] lg:flex items-center gap-6 font-text ">
              <Link href="/cart">
                <FiShoppingCart
                  size={28}
                  className="hover:text-[#D97A4F] cursor-pointer transition-colors "
                />
              </Link>
              <Link href="/wishlist">
                <FiHeart
                  size={28}
                  className="hover:text-[#D97A4F] cursor-pointer transition-colors"
                />
              </Link>
              <Link href="/profile">
                <FiUser
                  size={28}
                  className="hover:text-[#D97A4F] cursor-pointer transition-colors"
                />
              </Link>
            </div>

            {/* Hamburger Mobile */}
            <div className="lg:hidden z-50">
              <MyMenu
                isClicked={isClicked}
                onClick={() => setIsClicked(!isClicked)}
              />
            </div>
          </nav>

          {/* Menu Mobile */}
          <ul
            className={`lg:hidden absolute top-full left-0 w-screen h-screen bg-[#59a96a] text-[#ffff] flex flex-col items-center justify-center gap-8 text-2xl transition-transform duration-500 z-40 ${
              isClicked ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {["ACCUEIL", "MODEL", "CATALOGUE", "CONTACT"].map((text, index) => (
              <li key={index}>
                <Link
                  href={
                    text === "ACCUEIL"
                      ? "/"
                      : `/${text.toLowerCase().replace(" ", "")}`
                  }
                  className="font-bold hover:text-(--btn-hover) transition-colors"
                  onClick={() => setIsClicked(false)}
                >
                  {text}
                </Link>
              </li>
            ))}

            <div className="h-px bg-gray-200 w-full my-4" />

            <div className="flex items-center justify-between w-full px-4">
              <div className="flex gap-6">
                <FiShoppingCart size={24} />
                <FiHeart size={24} />
                <FiUser size={24} />
              </div>
              <button className="bg-[#E67E22] text-white px-4 py-2 rounded-full flex items-center gap-2">
                <FiPlus /> Publier
              </button>
            </div>
          </ul>
        </Container>
      </div>

      {/* --- DEUXIÈME HEAD (Barre de recherche verte #556B2F) --- */}
      <Recherche />
    </header>
  )
}

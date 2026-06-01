"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { FiUser, FiHeart, FiShoppingCart, FiPlus } from "react-icons/fi"
import MyMenu from "../common/Menu"
import Container from "../common/Container"
import Logo from "./Logo"
import Recherche from "./Recherche"
import IconChevron from "../icons/currentColor"
import { User } from "@/types/global"
import { getItems, getTotal } from "@/store/commande.store"
import { CommandItem } from "@/types/global"

export default function Header() {
  const [isClicked, setIsClicked] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const [items, setItems] = useState<CommandItem[]>([])

  const [total, setTotal] = useState(0)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setUser(null)
    }
    setTotal(getTotal())
    setItems(getItems())
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    setUser(null)
    setIsUserDropdownOpen(false)
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      <div className="bg-[#FAFAFA]">
        <Container className="py-6! relative font-text">
          <nav className="flex justify-between items-center w-full relative z-50">
            <Logo />
            <ul className="hidden lg:flex items-center gap-10 font-text font-bold">
              {["ACCUEIL", "MODELE", "CATALOGUE", "CONTACT"].map(
                (text, index) => (
                  <li key={index}>
                    <Link
                      href={
                        text === "ACCUEIL"
                          ? "/"
                          : `/${text.toLowerCase().replace(" ", "")}`
                      }
                      className="text-lg font-semibold text-[#2C2C2C] hover:text-[#E67E22] transition-colors"
                    >
                      {text}
                    </Link>
                  </li>
                )
              )}
            </ul>

            <div className="hidden text-[#A0522D] lg:flex items-center gap-6 font-text ">
              <Link href="/panier" className="relative">
                <span className="absolute -top-0.5 -right-1 bg-red-500 rounded-full min-w-4 h-4 px-1 text-[10px] text-white flex items-center justify-center p-1">
                  {items.reduce((total, item) => total + item.quantite, 0)}
                </span>

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
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center focus:outline-none"
                >
                  {user ? (
                    //profile
                    <div className="flex items-center gap-2 border border-[#e67e22] rounded-full px-2 py-1 bg-white">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt="Profil"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-orange-100 text-[#e67e22]">
                            {user?.name?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="font-medium text-sm text-gray-700 hidden md:block">
                        {user.name}
                      </span>
                      <IconChevron></IconChevron>
                    </div>
                  ) : (
                    //icons simple
                    <div className="hidden text-[#A0522D] lg:flex items-center gap-6 font-text">
                      <FiUser size={28} />
                    </div>
                  )}
                </button>

                {isUserDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2">
                      {user ? (
                        <>
                          <Link
                            href="/profile"
                            className="block px-4 py-2 hover:bg-orange-50 text-gray-700"
                          >
                            Mon profil
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                          >
                            Se déconnecter
                          </button>
                        </>
                      ) : (
                        <Link
                          href="/auth"
                          className="block px-4 py-2 text-[#e67e22] font-bold hover:bg-orange-50"
                        >
                          Se connecter
                        </Link>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile */}
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
                <Link href={"/auth"}>
                  <FiUser size={24} />
                </Link>
              </div>
              <Link
                href={"/auth?view=register"}
                className="bg-[#E67E22] text-white px-6 py-2 rounded-full flex items-center gap-2"
              >
                S'inscrire
              </Link>
            </div>
          </ul>
        </Container>
      </div>
      <Recherche />
    </header>
  )
}

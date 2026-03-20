"use client"

import Container from "@/components/common/Container"
import Title from "@/components/common/Title"
import { ChevronRight, Star, Heart } from "lucide-react"
import ProductCard from "./ProductCard"

export default function ModelPage() {
  // const categories = ["Tous", "Chapeaux", "Paniers", "Boîtes", "Pochettes"]
  const categories = [
    { name: "Tous", count: 7, icon: "👕" },
    { name: "Chapeaux", count: 2, icon: "🎩" },
    { name: "Paniers", count: 2, icon: "🧺" },
    { name: "Boîtes", count: 1, icon: "📦" },
    { name: "Pochettes", count: 0, icon: "👜" },
    { name: "Divers", count: 25, icon: "🛍️" },
  ]

  return (
    <div>
      <Container className=" px-0!">
        <Title
          text="Nos produits"
          className="text-5xl text-[#7a4e2d] text-center mb-4"
        />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR CATEGORIES */}
          <aside className="w-full lg:w-[300px] shrink-0">
            <div className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
              <h2 className="text-xl font-bold mb-6 text-gray-900 px-2">
                Category
              </h2>
              <div className="space-y-1">
                {categories.map((cat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <p className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-100 text-xl">
                        {cat.icon}
                      </p>
                      <p className="font-medium text-gray-700">{cat.name}</p>
                    </div>
                    <p className="bg-orange-100 text-orange-600 text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
                      {cat.count}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <section className="flex-1">
            {/* Header Nouvelles Articles */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Nouvelles Articles
              </h2>
              <button className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-black tracking-widest uppercase">
                VOIR TOUT <ChevronRight size={14} />
              </button>
            </div>

            {/* Grid Nouvelles Articles (Cartes Verticales) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <ProductCard
                title="T-shirt with Tape Details"
                price={120}
                rating={4.5}
                image="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
              />
              <ProductCard
                title="Skinny Fit Jeans"
                price={240}
                oldPrice={260}
                discount="-20%"
                rating={3.5}
                image="https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"
              />
              <ProductCard
                title="Skinny Fit Jeans"
                price={240}
                oldPrice={260}
                discount="-20%"
                rating={3.5}
                image="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"
              />
            </div>

            {/* Banners Section (Cartes Horizontales du milieu) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
              <div className="md:col-span-7 bg-[#ffebd5] rounded-[2.5rem] h-[220px] relative overflow-hidden flex items-center p-10">
                <div className="z-10 relative max-w-[200px]">
                  <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                    Nouvelle Collection
                  </h3>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400"
                  className="absolute right-0 bottom-0 h-full w-auto object-contain"
                  alt="banner"
                />
              </div>

              <div className="md:col-span-5 bg-[#33373d] rounded-[2.5rem] h-[220px] relative overflow-hidden flex flex-col justify-center p-10 text-white">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">
                  Air Purifier
                </p>
                <p className="text-[10px] text-gray-500 font-bold">FROM</p>
                <h3 className="text-3xl font-bold text-[#b4cc66] mt-1">$169</h3>
                <img
                  src="https://images.unsplash.com/photo-1585338107529-13afc5f0141f?w=400"
                  className="absolute right-[-20px] top-0 h-full w-auto object-contain opacity-80"
                  alt="air purifier"
                />
              </div>
            </div>

            {/* Header Articles Populaires */}
            <div className="flex justify-between items-center mt-12 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Articles populaires
              </h2>
              <button className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-black uppercase">
                VOIR TOUT <ChevronRight size={14} />
              </button>
            </div>

            {/* Reproduire la ligne du bas si nécessaire... */}
          </section>
        </div>
      </Container>
    </div>
  )
}

// COMPOSANT POUR LES "NOUVELLES ARTICLES" (Vertical)

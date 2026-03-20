"use client"

import Container from "@/components/common/Container"
import { ChevronRight, Star, Heart } from "lucide-react"

export default function ModelPage() {
  const categories = [
    { name: "Art du Bois", count: 12, icon: "🪵", color: "text-amber-900" },
    { name: "Sac & Pochette", count: 8, icon: "🧵", color: "text-red-700" },
    { name: "Vannerie", count: 15, icon: "🧺", color: "text-yellow-600" },
    { name: "Bijoux", count: 5, icon: "💍", color: "text-gray-400" },
    { name: "Instruments", count: 3, icon: "🪕", color: "text-brown-500" },
    { name: "Divers", count: 10, icon: "✨", color: "text-gray-500" },
  ]
  return (
    <div>
      <Container className=" py-4! px-0! pt-8 pb-20 px-0!">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-[280px] shrink-0">
            <div className="bg-[#D97A4F] p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-extrabold mb-6 text-gray-900">
                Category
              </h2>
              <div className="space-y-2">
                {categories.map((cat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <p className="text-2xl">{cat.icon}</p>
                      <p className="font-semibold text-gray-600 group-hover:text-black">
                        {cat.name}
                      </p>
                    </div>
                    <p className="bg-orange-50 text-orange-600 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                      {cat.count}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          <section className="flex-1">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Nouvelles Articles
              </h2>
              <button className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-black transition-colors">
                VOIR TOUT <ChevronRight size={14} />
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <ProductCard
                title="T-shirt with Tape Details"
                price={120}
                rating={4.5}
                image="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500"
              />
              <ProductCard
                title="Skinny Fit Jeans"
                price={240}
                oldPrice={260}
                discount="-20%"
                rating={3.5}
                image="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=500"
              />
              <ProductCard
                title="Skinny Fit Jeans"
                price={240}
                oldPrice={260}
                discount="-20%"
                rating={3.5}
                image="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=500"
              />
            </div>

            {/* Banners Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="md:col-span-2 bg-[#FFEDD5] rounded-3xl p-8 relative overflow-hidden h-[200px] flex items-center">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                    Nouvelle <br /> Collection 2026
                  </h3>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full bg-orange-200/50 rounded-l-full"></div>
              </div>
              <div className="bg-gray-900 rounded-3xl p-6 text-white h-[200px] flex flex-col justify-between">
                <div>
                  <p className="text-gray-400 text-xs uppercase">
                    Air Purifier
                  </p>
                  <p className="text-[10px] text-gray-500">FROM</p>
                  <h3 className="text-2xl font-bold text-green-400">$169</h3>
                </div>
                <div className="self-end bg-gray-800 p-2 rounded-xl">⚡</div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}

// Composant Interne : Carte Produit
function ProductCard({ title, price, oldPrice, discount, rating, image }: any) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[4/5] bg-gray-100 rounded-[2rem] overflow-hidden mb-4">
        <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-900 hover:scale-110 transition-transform">
          <Heart size={18} />
        </button>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{title}</h3>

      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
        <p className="text-xs text-gray-400 ml-1 font-medium">{rating}/5</p>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-xl font-extrabold text-gray-900">${price}</p>
        {oldPrice && (
          <span className="text-sm text-gray-400 line-through">
            ${oldPrice}
          </span>
        )}
        {discount && (
          <p className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">
            {discount}
          </p>
        )}
      </div>
    </div>
  )
}

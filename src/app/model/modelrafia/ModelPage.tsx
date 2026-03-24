"use client"

import Container from "@/components/common/Container"
import Title from "@/components/common/Title"
import { ChevronRight } from "lucide-react"
import { ProductCard } from "./ProductCard"
import { useEffect, useState } from "react"

export default function ModelPage() {
  const [products, setProducts] = useState<any[]>([])

  // Les catégories sont recalculées automatiquement quand "products" change
  const categories = [
    { name: "Tous", count: products.length, icon: "👕" },
    { name: "Chapeaux", count: 2, icon: "🎩" },
    { name: "Paniers", count: 2, icon: "🧺" },
    { name: "Boîtes", count: 1, icon: "📦" },
    { name: "Pochettes", count: 0, icon: "👜" },
    { name: "Divers", count: 25, icon: "🛍️" },
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/products/public-models"
        )
        const data = await response.json()

        // --- LE TEST CRUCIAL ---
        console.log("Données reçues du backend :", data)

        // Si ton backend renvoie { products: [...] } au lieu de [...]
        if (data && Array.isArray(data)) {
          setProducts(data)
        } else if (data && data.products) {
          setProducts(data.products)
        }
      } catch (error) {
        console.error("Erreur backend lors du fetch:", error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <Container className="px-0!">
        <Title text="Nos produits" className="font-text" />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR CATEGORIES */}
          <aside className="w-full lg:w-75 shrink-0">
            <div className="bg-white p-6 rounded-4xl border border-gray-50 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
              <h2 className="text-xl font-bold mb-6 text-gray-900 px-2">
                Catégories
              </h2>
              <div className="space-y-1">
                {categories.map((cat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 hover:bg-seco rounded-2xl cursor-pointer transition-all group"
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Nouveaux Articles
              </h2>
              <button className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-black tracking-widest uppercase">
                VOIR TOUT <ChevronRight size={14} />
              </button>
            </div>

            {/* Grid Dynamique */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((p: any) => (
                  <ProductCard
                    key={p.id_produit}
                    title={p.nom_produit}
                    price={p.prix}
                    image={p.image}
                    rating={5}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-gray-400">
                    Aucun produit trouvé dans la base de données.
                  </p>
                  <p className="text-xs text-gray-300 mt-2">
                    Vérifiez la console (F12) pour voir les données reçues.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}

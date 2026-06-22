"use client"

import Container from "@/components/common/Container"
import Title from "@/components/common/Title"
import { ChevronRight } from "lucide-react"
import { ProductCard } from "./ProductCard"
import { useEffect, useState } from "react"

export default function ModelLayout() {
  const [products, setProducts] = useState<any[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  )
  const [countAll, setCountAll] = useState(0)
  const [countChapeaux, setCountChapeaux] = useState(0)
  const [countPaniers, setCountPaniers] = useState(0)
  const [countBox, setCountBox] = useState(0)
  const [countPochettes, setCountPochettes] = useState(0)

  const categoriesList = [
    { id: null, name: "Tous", icon: "👕" },
    { id: 1, name: "Chapeaux", icon: "🎩" },
    { id: 2, name: "Paniers", icon: "🧺" },
    { id: 3, name: "Boîtes", icon: "📦" },
    { id: 4, name: "Pochettes", icon: "👜" },
  ]

  useEffect(() => {
    fetchProducts()
    countAllProductByCategory()
  }, [selectedCategoryId])

  const fetchProducts = async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL + "/products/public-models"
      const url = selectedCategoryId
        ? `${baseUrl}?categoryId=${selectedCategoryId}`
        : baseUrl
      console.log(
        "🚀 Tentative de récupération pour la catégorie ID:",
        selectedCategoryId
      )
      console.log("🔗 URL appelée :", url)

      const response = await fetch(url)

      if (!response.ok) throw new Error("Erreur réseau")

      const data = await response.json()
      console.log("📦 Données reçues du Backend :", data)

      if (Array.isArray(data)) {
        setProducts(data)
      } else if (data && data.products) {
        setProducts(data.products)
      }
    } catch (error) {
      console.error("❌ Erreur lors du fetch:", error)
    }
  }

  const countAllProductByCategory = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL + "/products/get-category-count"
    const response = await fetch(url)
    if (!response.ok) throw new Error("Erreur réseau")
    const data = await response.json()
    let somme = 0
    data.forEach((cat: any) => {
      somme += cat.count
      setCountAll(somme)
      switch (cat.id) {
        case 1:
          setCountChapeaux(cat.count)
          break
        case 2:
          setCountPaniers(cat.count)
          break
        case 3:
          setCountBox(cat.count)
          break
        case 4:
          setCountPochettes(cat.count)
          break
        default:
          break
      }
    })
  }

  return (
    <Container>
      <Title text="Nos produits" className="font-text pb-16" />

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-75 shrink-0">
          <div className="bg-white p-6 rounded-4xl border border-gray-50 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
            <h2 className="text-xl font-text font-bold mb-6 text-gray-900 px-2">
              Catégories
            </h2>
            <div className="space-y-1 font-text">
              {categoriesList.map((cat) => (
                <div
                  key={cat.id ?? "all"}
                  onClick={() => {
                    console.log("🖱️ Clic sur :", cat.name, "(ID:", cat.id, ")")
                    setSelectedCategoryId(cat.id)
                  }}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all group ${
                    selectedCategoryId === cat.id
                      ? "bg-orange-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <p
                      className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors border ${
                        selectedCategoryId === cat.id
                          ? "bg-white border-orange-100"
                          : "bg-gray-50 border-transparent"
                      } text-xl`}
                    >
                      {cat.icon}
                    </p>
                    <p
                      className={`font-medium font-text ${
                        selectedCategoryId === cat.id
                          ? "text-orange-600"
                          : "text-gray-700"
                      }`}
                    >
                      {cat.name}
                    </p>
                  </div>

                  {cat.id == null && (
                    <p className="bg-orange-100 text-orange-600 text-[12px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
                      {countAll}
                    </p>
                  )}
                  {cat.id == 1 && (
                    <p className="bg-orange-100 text-orange-600 text-[12px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
                      {countChapeaux}
                    </p>
                  )}
                  {cat.id == 2 && (
                    <p className="bg-orange-100 text-orange-600 text-[12px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
                      {countPaniers}
                    </p>
                  )}
                  {cat.id == 3 && (
                    <p className="bg-orange-100 text-orange-600 text-[12px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
                      {countBox}
                    </p>
                  )}
                  {cat.id == 4 && (
                    <p className="bg-orange-100 text-orange-600 text-[12px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
                      {countPochettes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-text">
              {selectedCategoryId
                ? categoriesList.find((c) => c.id === selectedCategoryId)?.name
                : "Tous les Articles"}
            </h2>
            <button className="flex items-center gap-1 text-sm font-text font-bold text-gray-400 hover:text-black tracking-widest uppercase">
              VOIR TOUT <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((p: any) => (
                <ProductCard
                  key={p.id_produit}
                  id={p.id_produit}
                  title={p.nom_produit}
                  price={p.prix}
                  image={p.image}
                  rating={5}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
                <p className="text-gray-400 italic">
                  Aucun produit trouvé pour cette catégorie.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Container>
  )
}

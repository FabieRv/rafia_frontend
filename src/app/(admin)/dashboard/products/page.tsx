"use client"

import { deleteProduit, getProduits } from "@/services/produitServices"
import { Product } from "@/types/global"

import { useEffect, useState } from "react"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { CiEdit } from "react-icons/ci"
import { IoIosAdd } from "react-icons/io"
import {
  FiSearch,
  FiSliders,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi"
import * as XLSX from "xlsx"

import AddProductModal from "./Modal/AddProductModal"
import EditProductModal from "./Modal/EditProductModal"

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [productToEdit, setProductToEdit] = useState<Product | null>(null)
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("ALL")
  const [priceFilter, setPriceFilter] = useState<"NONE" | "ASC" | "DESC">(
    "NONE"
  )

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 6

  useEffect(() => {
    setCurrentPage(1)
  }, [search, categoryFilter, priceFilter])

  const loadProducts = async () => {
    try {
      const data = await getProduits()
      const sorted = [...data].sort((a, b) => {
        const dateA = (a as any).date_ajout
          ? new Date((a as any).date_ajout).getTime()
          : 0
        const dateB = (b as any).date_ajout
          ? new Date((b as any).date_ajout).getTime()
          : 0
        return dateB - dateA
      })
      setProducts(sorted)
    } catch (error) {
      console.error("Erreur chargement", error)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Supprimer ce produit ?")
    if (!confirmDelete) return

    try {
      const token = localStorage.getItem("token") || ""
      await deleteProduit(id, token)
      setProducts((prev) => prev.filter((p) => p.id_produit !== id))
    } catch (error) {
      console.error(error)
      alert("Erreur suppression")
    }
  }

  const filteredProducts = products
    .filter((p) => {
      const keyword = search.toLowerCase()
      const matchSearch =
        p.nom_produit?.toLowerCase().includes(keyword) ||
        p.description?.toLowerCase().includes(keyword)

      const matchCategory =
        categoryFilter === "ALL" ||
        p.sous_category?.category?.nom_categorie === categoryFilter

      return matchSearch && matchCategory
    })
    .sort((a, b) => {
      if (priceFilter === "ASC") return Number(a.prix) - Number(b.prix)
      if (priceFilter === "DESC") return Number(b.prix) - Number(a.prix)
      return 0
    })

  const handleExport = () => {
    if (filteredProducts.length === 0) {
      alert("Aucun produit à exporter")
      return
    }

    const dataToExport = filteredProducts.map((p) => ({
      "Nom Produit": p.nom_produit,
      Description: p.description || "",
      "Prix (€)": Number(p.prix),
      Stock: p.quantite_stock ?? 0,
      Catégorie: p.sous_category?.category?.nom_categorie || "",
      "Sous-Catégorie": p.sous_category?.nom_sous_categorie || "",
      "Date d'Ajout": (p as any).date_ajout
        ? new Date((p as any).date_ajout).toLocaleDateString()
        : "",
    }))

    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Produits")
    XLSX.writeFile(workbook, "liste_produits.xlsx")
  }

  const totalPages = Math.ceil(filteredProducts.length / itemPerPage)
  const indexOfLast = currentPage * itemPerPage
  const indexOfFirst = indexOfLast - itemPerPage
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast)

  return (
    <div className="min-h-screen bg-[#F4F6F9] p-6 md:p-12 font-sans text-slate-700">
      <div className="max-w-350 mx-auto">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsModalAddOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#E67E22] hover:bg-[#D35400] text-white font-medium rounded-xl transition shadow-sm"
          >
            <IoIosAdd size={24} />
            Ajouter produit
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Recherche..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-transparent rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#E67E22] text-sm transition"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex items-center bg-white border border-gray-100 rounded-xl shadow-sm px-3 py-3 text-sm text-gray-600 hover:bg-gray-50 transition cursor-pointer">
              <FiSliders className="text-gray-400 mr-2" size={16} />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pr-2 font-medium appearance-none"
              >
                <option value="ALL">Filtrer</option>
                <option value="Paniers">Paniers</option>
                <option value="Chapeaux">Chapeaux</option>
                <option value="Satrana">Satrana</option>
              </select>
            </div>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-3 bg-[#4FA5FF] hover:bg-[#3A8BFF] text-white text-sm font-medium rounded-xl shadow-sm transition"
            >
              <FiDownload size={16} />
              Export
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 text-[#4A5568] text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                  <th className="py-5 px-6">Nom Produit</th>
                  <th className="py-5 px-6">Description Produit</th>
                  <th className="py-5 px-6 text-center">Image</th>
                  <th className="py-5 px-6 text-blue-600">Prix</th>
                  <th className="py-5 px-6 text-center">Stock</th>
                  <th className="py-5 px-6">Catégories</th>
                  <th className="py-5 px-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50 text-sm">
                {currentProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 text-center text-gray-400 font-medium"
                    >
                      Aucune commande ne correspond à vos critères de recherche.
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((p) => (
                    <tr
                      key={p.id_produit}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="py-5 px-6 font-bold text-slate-900">
                        {p.nom_produit}
                      </td>
                      <td className="py-5 px-6 text-gray-400 max-w-50 truncate">
                        {p.description}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden p-1 shadow-inner border border-gray-100">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.nom_produit}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          ) : (
                            <span className="text-[10px] text-gray-400 font-medium">
                              No image
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-5 px-6 font-semibold text-blue-600 text-base">
                        {p.prix}€
                      </td>
                      <td className="py-5 px-6 text-center">
                        <span className="inline-block px-3 py-1 bg-[#E8F8F0] text-[#2ECC71] text-xs font-bold rounded-full min-w-[36px]">
                          {p.quantite_stock ?? 23}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                            {p.sous_category?.category?.nom_categorie ||
                              "RABANE"}
                          </span>
                          <span className="text-sm font-bold text-slate-800">
                            {p.sous_category?.nom_sous_categorie || "Paniers"}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex justify-end items-center gap-3">
                          <button
                            onClick={() => {
                              setProductToEdit(p)
                              setIsModalEditOpen(true)
                            }}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                          >
                            <CiEdit size={22} className="stroke-[0.5]" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id_produit)}
                            className="p-2 text-[#E74C3C] hover:bg-red-50 rounded-lg transition"
                          >
                            <RiDeleteBin2Fill size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION FOOTER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 text-sm text-gray-500 font-medium">
          <div>
            Affichage de{" "}
            <span className="text-slate-800 font-semibold">
              {indexOfFirst + 1}
            </span>{" "}
            à{" "}
            <span className="text-slate-800 font-semibold">
              {Math.min(indexOfLast, filteredProducts.length)}
            </span>{" "}
            sur{" "}
            <span className="text-slate-800 font-semibold">
              {filteredProducts.length}
            </span>{" "}
            produits
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 disabled:opacity-40 transition text-gray-600 shadow-sm"
            >
              <FiChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 flex items-center justify-center font-bold text-sm rounded-xl transition ${
                  currentPage === i + 1
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 shadow-sm"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 disabled:opacity-40 transition text-gray-600 shadow-sm"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <AddProductModal
        isOpen={isModalAddOpen}
        onClose={() => {
          setIsModalAddOpen(false)
          setProductToEdit(null)
        }}
        onSuccess={(product) => {
          setProducts((prev) => [product, ...prev])
        }}
      />
      <EditProductModal
        isOpen={isModalEditOpen}
        onClose={() => {
          setIsModalEditOpen(false)
          setProductToEdit(null)
        }}
        onSuccess={(updatedProduct) => {
          console.log(
            "------------------UPDATED-------------" +
              JSON.stringify(updatedProduct)
          )
          setProducts((prev) =>
            prev.map((p) =>
              p.id_produit === updatedProduct.product.id_produit
                ? updatedProduct.product
                : p
            )
          )
        }}
        productToEdit={productToEdit}
      />
    </div>
  )
}

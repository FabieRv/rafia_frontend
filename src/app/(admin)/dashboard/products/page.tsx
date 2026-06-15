"use client"

import { deleteProduit, getProduits } from "@/services/produitServices"
import { ProductCardProps } from "@/types/global"

import { useEffect, useState } from "react"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { CiEdit } from "react-icons/ci"
import { CiImport } from "react-icons/ci"
import { IoIosAdd } from "react-icons/io"
import AddProductModal from "./Modal/AddProductModal"
import { Product } from "@/types/global"
import DataTableToolbar from "../_pages/DataTableToolbar"

function ProductTable({ product }: ProductCardProps) {
  const [products, setProducts] = useState<ProductCardProps["product"][]>([])
  const [productToEdit, setProductToEdit] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const itemPerPage = 4
  const indexOfLast = currentPage * itemPerPage
  const indexOfFirst = indexOfLast - itemPerPage
  const currentProducts = products.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(products.length / itemPerPage)

  const [filter, setFilter] = useState("TOUS")
  const [search, setSearch] = useState("")

  const loadProducts = async () => {
    try {
      const data = await getProduits()

      const sorted = [...data].sort(
        (a, b) =>
          new Date(b.date_ajout).getTime() - new Date(a.date_ajout).getTime()
      )
      setProducts(sorted)
    } catch (error) {
      console.error("Erreur de chargement", error)
    }
  }
  useEffect(() => {
    loadProducts()
  }, [])

  const handleSuccess = (product: any) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id_produit === product.id_produit)
      if (exists) {
        return prev
          .map((p) => (p.id_produit === product.id_produit ? product : p))
          .sort(
            (a, b) =>
              new Date(b.date_ajout).getTime() -
              new Date(a.date_ajout).getTime()
          )
      }

      return [product, ...prev].sort(
        (a, b) =>
          new Date(b.date_ajout).getTime() - new Date(a.date_ajout).getTime()
      )
    })
  }

  const handleDelete = async (id: number) => {
    console.log("ID à supprimer :", id)

    const confirmDelete = confirm("Voulez-vous vraiment supprimer ce produit ?")
    if (!confirmDelete) return

    try {
      const token = localStorage.getItem("token") || ""
      console.log("TOKEN :", token)

      await deleteProduit(id, token)

      setProducts((prev) => prev.filter((p) => p.id_produit !== id))
      console.log("Suppression réussie")
    } catch (error: any) {
      console.error("Erreur suppression détaillée :", error)
      alert("Erreur lors de la suppression")
    }
  }

  return (
    <div className="m-5 md:m-10 max-w-400 mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6 font-text">
        <div></div>
        <div className="flex-col w-full sm:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-[#e67e22] rounded-xl text-white text-sm hover:bg-[#cf6c16] transition-all duration-200"
          >
            <IoIosAdd size={25} />
            Ajouter produit
          </button>
        </div>
      </div>
      <DataTableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onFilterClick={() => console.log("filter")}
        onExportClick={() => console.log("export")}
      />

      <div className="overflow-x-auto bg-neutral-primary-soft shadow-xl rounded-xl border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200  text-gray-700 uppercase text-sm border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold">Nom Produit</th>
              <th className="px-6 py-4 font-bold hidden lg:table-cell max-w-xs">
                Description Produit
              </th>
              <th className="px-6 py-4 font-bold">Image</th>
              <th className="px-6 py-4 font-bold text-center">Prix</th>
              <th className="px-6 py-4 font-bold text-center">Stock</th>
              <th className="px-6 py-4 font-bold">Catégories</th>{" "}
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-10 text-center text-gray-500 italic"
                >
                  Aucun produit trouvé
                </td>
              </tr>
            ) : (
              currentProducts.map((p) => (
                <tr
                  className="hover:bg-blue-50/30 transition-colors duration-150"
                  key={p.id_produit}
                >
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900 block">
                      {p.nom_produit}
                    </span>
                    <span className="text-xs text-gray-400 lg:hidden line-clamp-1">
                      {p.description}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <p className="text-gray-600 line-clamp-2 max-w-xs text-sm">
                      {p.description}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-100">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.nom_produit}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-[10px] text-gray-400">
                          Non image
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-blue-600">
                    {p.prix}€
                  </td>
                  <td className="px-6 py-4 text-center">
                    {(() => {
                      const stock = Number(p.quantite_stock ?? 0)
                      return (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            stock < 5
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {p.quantite_stock ?? 0}
                        </span>
                      )
                    })()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-sm">
                      {/* TYPE */}
                      <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                        {p.sous_category?.category?.type?.nom_type}
                      </span>

                      {/* CATEGORIE */}
                      <span className="text-gray-700 font-medium">
                        {p.sous_category?.category?.nom_categorie}
                      </span>

                      {/* SOUS CATEGORIE */}
                      <span className="text-gray-500 text-xs">
                        {p.sous_category?.nom_sous_categorie}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setProductToEdit(p)
                          setIsModalOpen(true)
                        }}
                        className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      >
                        <CiEdit size={22} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id_produit)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
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

      {/* Pagination optimisée */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <p className="text-sm text-gray-500 order-2 sm:order-1">
          Affichage de{" "}
          <span className="font-semibold text-gray-700">
            {indexOfFirst + 1}
          </span>{" "}
          à{" "}
          <span className="font-semibold text-gray-700">
            {Math.min(indexOfLast, products.length)}
          </span>{" "}
          sur{" "}
          <span className="font-semibold text-gray-700">{products.length}</span>{" "}
          produits
        </p>

        <div className="flex items-center gap-2 order-1 sm:order-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition-all"
          >
            {"<"}
          </button>

          <div className="hidden sm:flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all ${
                  num === currentPage
                    ? "bg-blue-500 text-white border-blue-500 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition-all"
          >
            {">"}
          </button>
        </div>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        productToEdit={productToEdit}
      />
    </div>
  )
}

export default ProductTable

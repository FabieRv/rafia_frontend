"use client"

import { deleteProduit, getProduits } from "@/services/produitServices"
import { ProductCardProps } from "@/types/global"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { CiEdit } from "react-icons/ci"
import { CiImport } from "react-icons/ci"
import { IoIosAdd } from "react-icons/io"

function ProductTable({ product }: ProductCardProps) {
  const [products, setProduct] = useState<ProductCardProps["product"][]>([])
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 5
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null

  const loadProducts = async () => {
    try {
      const data = await getProduits()
      setProduct(data)
    } catch (error) {
      console.error("Erreur de chargement", error)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce produit?")) return
    try {
      await deleteProduit(id, token || "")
      loadProducts()
    } catch (error) {
      console.error("Erreur de suppression")
    }
  }

  //calcul produit afficher sur la pages
  const indexOfLast = currentPage * itemPerPage
  const indexOfFirst = indexOfLast - itemPerPage
  const currentProducts = products.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(products.length / itemPerPage)

  return (
    <div className="m-10">
      <div className="flex flex-wrap gap-4 items-center justify-end mb-4 font-text">
        <button className="flex items-center gap-2 px-5 py-3 bg-blue-400 text-white rounded-xl hover:bg-blue-500 text-lg ">
          <CiImport size={25} />
          Export
        </button>
        <button className="flex items-center gap-2 px-5 py-3 bg-[#e67e22] rounded-xl text-white text-lg hover:bg-[#cf6c16] transition-all duration-200">
          <IoIosAdd size={25} />
          Ajouter produit
        </button>
      </div>

      {/* Tableau dans son propre div */}
      <div className="overflow-x-auto bg-neutral-primary-soft shadow-lg rounded-lg">
        <table className="w-full text-lg text-left rtl:text-right text-body ">
          <thead className="bg-gray-200 text-xl font-extrabold border-b border-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Produit
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Description
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Image
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Prix
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Catégorie
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Sous-catégorie
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="font-text text-[16px]">
            {products && products.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center">
                  Aucun produit
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr
                  className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                  key={p.id_produit}
                >
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-[16px]">
                    {p.nom_produit}
                  </td>
                  <td className="px-6 py-4">{p.description}</td>
                  <td className="px-6 py-4">{p.image}</td>
                  <td className="px-6 py-4">{p.prix}</td>
                  <td className="px-6 py-4">{p.quantite_stock}</td>
                  <td className="px-6 py-4">
                    {p.sous_category?.category?.nom_categorie || "-"}
                  </td>
                  <td className="px-6 py-4">
                    {p.sous_category?.nom_sous_categorie || "-"}
                  </td>
                  <td className="px-6 py-4 flex flex-wrap gap-4">
                    <CiEdit
                      size={25}
                      className="text-blue-600 cursor-pointer"
                    />
                    <RiDeleteBin2Fill
                      size={20}
                      className="text-red-600 cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-4 py-2 rounded-lg border ${
              num === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } hover:bg-blue-500 hover:text-white transition-colors`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductTable

"use client"

import { IoMdClose } from "react-icons/io"
import { FaCloudUploadAlt } from "react-icons/fa"
import { useRef, useState, useEffect } from "react"
import { SUB_CATEGORIES_DATA } from "@/components/constant"
import SuccessPopup from "@/components/common/SuccessPopup"
import { addProduit } from "@/services/produitServices"
import { AddProductModalProps } from "@/types/global"

export default function AddProductModal({
  isOpen,
  onClose,
  onSuccess,
  productToEdit,
}: AddProductModalProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof SUB_CATEGORIES_DATA>("Chapeaux")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!productToEdit) return

    setFormData({
      nom_produit: productToEdit.nom_produit ?? "",
      description: productToEdit.description ?? "",
      prix: productToEdit.prix ?? 0,
      quantite_stock: productToEdit.quantite_stock ?? 0,
      type:
        productToEdit.sous_category?.category?.type?.nom_type ??
        productToEdit.type ??
        "RAFIA",

      image: productToEdit.image ?? "",

      id_sous_categorie: productToEdit.id_sous_categorie ?? 1,
    })

    setPreview(productToEdit.image ?? null)
  }, [productToEdit])

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        nom_produit: "",
        description: "",
        prix: 0,
        quantite_stock: 0,
        type: "RAFIA",
        image: "",
        id_sous_categorie: 1,
      })

      setPreview(null)
    }
  }, [isOpen])

  const [formData, setFormData] = useState({
    nom_produit: "",
    description: "",
    prix: 0,
    quantite_stock: 0,
    type: "RAFIA",
    image: "",
    id_sous_categorie: 1,
  })

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]:
          name === "prix" ||
          name === "quantite_stock" ||
          name === "id_sous_categorie"
            ? value === ""
              ? 0
              : Number(value)
            : value,
      }

      console.log(`Changement sur ${name}:`, newData[name as keyof typeof prev])
      return newData
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      setFormData((prev) => ({ ...prev, image: file.name }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    try {
      const token = localStorage.getItem("token") || ""
      const currentSubCategories = SUB_CATEGORIES_DATA[selectedCategory]
      const subCategoryName =
        currentSubCategories[formData.id_sous_categorie - 1]
      const payload = {
        nom_produit: formData.nom_produit,
        description: formData.description,
        prix: Number(formData.prix),
        quantite_stock: Number(formData.quantite_stock),
        image: formData.image,
        type: formData.type,
        categorie: selectedCategory,
        id_sous_categorie: Number(formData.id_sous_categorie),
      }

      const response = await addProduit(payload, token)
      const newProduct = {
        ...response,
        nom_produit: formData.nom_produit,
        prix: formData.prix,
        quantite_stock: formData.quantite_stock,
        image: formData.image,

        sous_category: {
          nom_sous_categorie: subCategoryName,
          category: {
            nom_categorie: selectedCategory,
            type: {
              nom_type: formData.type,
            },
          },
        },

        date_ajout: response.date_ajout || new Date().toISOString(),
      }
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
        onSuccess(newProduct)
        onClose()
      }, 1500)
    } catch (error: any) {
      console.error("Erreur attrapée :", error)
      alert(`Erreur : ${error.message || "Impossible de contacter le serveur"}`)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto relative p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Ajouter un produit
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <IoMdClose size={28} className="text-slate-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nom du produit
              </label>
              <input
                name="nom_produit"
                type="text"
                required
                value={formData.nom_produit}
                onChange={handleInputChange}
                placeholder="Panier Rabane"
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Type
                </label>
                <select
                  name="type"
                  onChange={handleInputChange}
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 outline-none"
                >
                  <option value="RAFIA">RAFIA</option>
                  <option value="RABANE">RABANE</option>
                  <option value="SATRANA">SATRANA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Catégorie
                </label>
                <select
                  name="categorie"
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(
                      e.target.value as keyof typeof SUB_CATEGORIES_DATA
                    )
                  }
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(SUB_CATEGORIES_DATA).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Sous Categories
              </label>
              <select
                name="id_sous_categorie"
                onChange={handleInputChange}
                value={formData.id_sous_categorie}
                className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SUB_CATEGORIES_DATA[selectedCategory].map((sub, index) => (
                  <option key={sub} value={index + 1}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 outline-none resize-none"
                placeholder="Entrez la description..."
              ></textarea>
            </div>
          </div>

          <div className="space-y-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Images du produit
            </label>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="group w-48 aspect-square border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer p-6"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <>
                  <FaCloudUploadAlt
                    size={48}
                    className="text-slate-300 group-hover:text-blue-500 mb-4 transition-colors"
                  />
                  <div className="text-center">
                    <p className="text-sm text-slate-500 font-medium">
                      Glissez vos images ici
                    </p>
                    <p className="text-sm text-slate-400">
                      ou{" "}
                      <span className="text-blue-600 font-bold">
                        cliquez pour parcourir
                      </span>
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4">
                    PNG, JPG jusqu'à 10MB
                  </p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Prix en ($)
                </label>
                <input
                  name="prix"
                  type="number"
                  value={formData.prix}
                  onChange={handleInputChange}
                  placeholder="35$"
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Quantité stock
                </label>
                <input
                  name="quantite_stock"
                  value={formData.quantite_stock}
                  type="number"
                  onChange={handleInputChange}
                  placeholder="10"
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-10">
              <button
                type="submit"
                disabled={loading}
                className="flex-2 bg-blue-500 text-white p-4 rounded-xl"
              >
                {loading ? "Chargement..." : "Enregistrer"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 p-4 bg-red-600 text-white transition-transform hover:scale-105 active:scale-95 flex items-center justify-center py-4 rounded-xl font-bold cursor-pointer"
              >
                Annuler Produit
              </button>
            </div>
          </div>
        </form>
        {showSuccess && (
          <SuccessPopup message="Enregistrement produit avec succès !" />
        )}
      </div>
    </div>
  )
}

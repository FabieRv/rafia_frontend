"use client"

import { IoMdClose } from "react-icons/io"
import { FaCloudUploadAlt } from "react-icons/fa"
import { useRef, useState, useEffect } from "react"
import { SUB_CATEGORIES_DATA } from "@/components/constant"
import SuccessPopup from "@/components/common/SuccessPopup"
import { addProduit, updateProduit } from "@/services/produitServices"
import { AddProductModalProps } from "@/types/global"
import { getCategoryId } from "@/utils/helper"

export default function AddProductModal({
  isOpen,
  onClose,
  onSuccess,
}: AddProductModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof SUB_CATEGORIES_DATA>("Chapeaux")

  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [formData, setFormData] = useState({
    nom_produit: "",
    description: "",
    prix: 0,
    quantite_stock: 0,
    type: "RAFIA",
    image: "",
    id_sous_categorie: 1,
  })
  // RESET WHEN CLOSE
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

  // HANDLE INPUT
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "prix" ||
        name === "quantite_stock" ||
        name === "id_sous_categorie"
          ? Number(value)
          : value,
    }))
  }

  // IMAGE
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setFormData((prev) => ({
      ...prev,
      image: file.name,
    }))
  }

  // SUBMIT
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
        categorie: getCategoryId(selectedCategory),
        id_sous_categorie: Number(formData.id_sous_categorie),
        isEdit: isEdit,
      }

      const response = await addProduit(payload, token)

      const newProduct = {
        ...(response || {}),
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

        date_ajout: response?.date_ajout || new Date().toISOString(),
      }
      console.log("++++++++++++newProduct++++++++" + JSON.stringify(newProduct))
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
        onSuccess(newProduct)
        onClose()
      }, 1200)
    } catch (error: any) {
      console.error(error)
      alert(error.message || "Erreur serveur")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto relative p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-bold text-slate-800">
            {"Ajouter un produit"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-700"
          >
            <IoMdClose size={26} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {/* LEFT COLUMN */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Nom du produit
              </label>
              <input
                name="nom_produit"
                type="text"
                required
                value={formData.nom_produit}
                onChange={handleInputChange}
                placeholder="Ex: Sac en Rabane"
                className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50 transition-all text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Matière / Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                >
                  <option value="RAFIA">RAFIA</option>
                  <option value="RABANE">RABANE</option>
                  <option value="SATRANA">SATRANA</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Catégorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(
                      e.target.value as keyof typeof SUB_CATEGORIES_DATA
                    )
                  }
                  className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
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
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Sous-catégorie
              </label>
              <select
                name="id_sous_categorie"
                value={formData.id_sous_categorie}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              >
                {SUB_CATEGORIES_DATA[selectedCategory].map((sub, i) => (
                  <option key={sub} value={i + 1}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Description du produit
              </label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Décrivez les spécificités de cet article artisanal..."
                className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 outline-none resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 transition-all"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Image de produit
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group w-full h-48 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer overflow-hidden relative"
                >
                  {preview ? (
                    <div className="w-full h-full relative group">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-sm">
                        Changer l'image
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <FaCloudUploadAlt
                        size={38}
                        className="text-slate-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors"
                      />
                      <p className="text-sm text-slate-600 font-medium">
                        Parcourir un fichier image
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Sert d'affichage principal pour la galerie
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Prix ($)
                  </label>
                  <input
                    name="prix"
                    type="number"
                    value={formData.prix || ""}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Quantité en Stock
                  </label>
                  <input
                    name="quantite_stock"
                    type="number"
                    value={formData.quantite_stock || ""}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 pt-6 border-t border-slate-100 lg:pt-0 lg:border-none">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all rounded-xl font-semibold text-center cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 p-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white transition-all rounded-xl font-semibold shadow-md shadow-blue-500/10 text-center cursor-pointer"
              >
                {loading ? "Chargement..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </form>

        {showSuccess && <SuccessPopup message="Produit ajouté avec succès !" />}
      </div>
    </div>
  )
}

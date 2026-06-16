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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof SUB_CATEGORIES_DATA>("Chapeaux")

  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState({
    nom_produit: "",
    description: "",
    prix: 0,
    quantite_stock: 0,
    type: "RAFIA",
    image: "",
    id_sous_categorie: 1,
  })

  // EDIT MODE
  useEffect(() => {
    if (!productToEdit) return

    setFormData({
      nom_produit: productToEdit.nom_produit ?? "",
      description: productToEdit.description ?? "",
      prix: productToEdit.prix ?? 0,
      quantite_stock: productToEdit.quantite_stock ?? 0,
      type: productToEdit.sous_category?.category?.type?.nom_type ?? "RAFIA",

      image: productToEdit.image ?? "",
      id_sous_categorie: productToEdit.id_sous_categorie ?? 1,
    })

    setPreview(productToEdit.image ?? null)
  }, [productToEdit])

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
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Ajouter un produit</h2>
          <button onClick={onClose}>
            <IoMdClose size={28} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* LEFT */}
          <div className="space-y-6">
            {/* NOM */}
            <input
              name="nom_produit"
              value={formData.nom_produit}
              onChange={handleInputChange}
              placeholder="Nom produit"
              className="w-full p-3 border rounded-xl"
            />

            {/* TYPE */}
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-xl"
            >
              <option value="RAFIA">RAFIA</option>
              <option value="RABANE">RABANE</option>
              <option value="SATRANA">SATRANA</option>
            </select>

            {/* CATEGORIE */}
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value as keyof typeof SUB_CATEGORIES_DATA
                )
              }
              className="w-full p-3 border rounded-xl"
            >
              {Object.keys(SUB_CATEGORIES_DATA).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* SOUS CATEGORIE */}
            <select
              name="id_sous_categorie"
              value={formData.id_sous_categorie}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-xl"
            >
              {SUB_CATEGORIES_DATA[selectedCategory].map((sub, i) => (
                <option key={sub} value={i + 1}>
                  {sub}
                </option>
              ))}
            </select>

            {/* DESCRIPTION */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-xl"
              placeholder="Description"
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* IMAGE */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-dashed border-2 p-6 rounded-xl cursor-pointer"
            >
              {preview ? (
                <img src={preview} className="w-full h-48 object-cover" />
              ) : (
                <FaCloudUploadAlt size={40} />
              )}
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>

            {/* PRIX */}
            <input
              name="prix"
              type="number"
              value={formData.prix}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-xl"
              placeholder="Prix"
            />

            {/* STOCK */}
            <input
              name="quantite_stock"
              type="number"
              value={formData.quantite_stock}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-xl"
              placeholder="Stock"
            />

            {/* BUTTONS */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-3 rounded-xl w-full"
              >
                {loading ? "Chargement..." : "Enregistrer"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="bg-red-600 text-white px-4 py-3 rounded-xl w-full"
              >
                Annuler
              </button>
            </div>
          </div>
        </form>

        {showSuccess && <SuccessPopup message="Produit ajouté avec succès !" />}
      </div>
    </div>
  )
}

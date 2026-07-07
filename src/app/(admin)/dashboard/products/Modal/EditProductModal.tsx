"use client"

import { IoMdClose } from "react-icons/io"
import { FaCloudUploadAlt } from "react-icons/fa"
import { useRef, useState, useEffect } from "react"
import { SUB_CATEGORIES_DATA } from "@/components/constant"
import SuccessPopup from "@/components/common/SuccessPopup"
import { addProduit, updateProduit } from "@/services/produitServices"
import { EditProductModalProps } from "@/types/global"
import { getCategoryId } from "@/utils/helper"
import { json } from "stream/consumers"
import axios from "axios"

export default function EditProductModal({
  isOpen,
  onClose,
  onSuccess,
  productToEdit,
}: EditProductModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  interface ProductFormData {
    nom_produit: string
    description: string
    prix: number
    quantite_stock: number
    type: string
    categorie: number
    image: string
    id_sous_categorie: number
    fichier: File | null
  }

  interface SubCategory {
    id_sous_categorie: number
    nom_sous_categorie: string
    description: string
    date_creation: string // Présent dans votre JSON
    id_categorie: number // Fait le lien avec selectedCategory.id_categorie
  }

  interface Category {
    id_categorie: number
    nom_categorie: string
    description: string
    id_type: number
  }

  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id_categorie: 0,
    nom_categorie: "",
    description: "",
    id_type: 0,
  })

  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>({
    id_sous_categorie: 0,
    nom_sous_categorie: "",
    description: "",
    date_creation: "",
    id_categorie: 0,
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [sousCategories, setSousCategories] = useState<SubCategory[]>([])

  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isEdit, setIsEdit] = useState(true)

  const [file, setFile] = useState<File | null>(null)

  const [formData, setFormData] = useState<ProductFormData>({
    nom_produit: "",
    description: "",
    prix: 0,
    quantite_stock: 0,
    type: "RAFIA",
    image: "",
    categorie: 1,
    id_sous_categorie: 1,
    fichier: null,
  })

  useEffect(() => {
    const token = localStorage.getItem("token") || ""
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token") || ""
        const categors: any = await getAllCategory()
        setCategories(categors)
        const subCategories: any = await getAllSouscategory()
        setSousCategories(subCategories.data || subCategories)
        console.log(
          "---------------subCategories----------" +
            JSON.stringify(subCategories)
        )
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error)
      }
    }
    fetchData()
  }, [])

  const getAllCategory = async () => {
    const token = localStorage.getItem("token") || ""
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/category/find`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return res.json()
  }

  const getAllSouscategory = async () => {
    const token = localStorage.getItem("token") || ""
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/sous_category/find`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return res.json()
  }

  // EDIT MODE
  // EDIT MODE
  useEffect(() => {
    if (!productToEdit) return

    setFormData({
      nom_produit: productToEdit.nom_produit ?? "",
      description: productToEdit.description ?? "",
      prix: productToEdit.prix ?? 0,
      quantite_stock: productToEdit.quantite_stock ?? 0,
      type:
        productToEdit.type ??
        productToEdit.sous_category?.category?.type?.nom_type ??
        "RAFIA",
      image: productToEdit.image ?? "",
      categorie: productToEdit.id_categorie,
      id_sous_categorie: productToEdit.id_sous_categorie ?? 1,
      fichier: null,
    })

    // 🌟 SYNC 1 : Trouver la catégorie complète du produit et l'activer
    if (categories.length > 0) {
      const matchedCat = categories.find(
        (c) => c.id_categorie === productToEdit.id_categorie
      )
      if (matchedCat) {
        setSelectedCategory(matchedCat)
      }
    }

    // 🌟 SYNC 2 : Trouver la sous-catégorie complète du produit et l'activer
    if (sousCategories.length > 0) {
      const matchedSub = sousCategories.find(
        (s) => s.id_sous_categorie === productToEdit.id_sous_categorie
      )
      if (matchedSub) {
        setSelectedSubCategory(matchedSub)
      }
    }

    const urlEncoded = productToEdit.image.replace(" ", "%20")
    const urlImageEdit =
      process.env.NEXT_PUBLIC_API_URL + "/uploads/" + urlEncoded
    setPreview(urlImageEdit ?? null)

    // Ajout indispensable de categories et sousCategories dans les dépendances
  }, [productToEdit, categories, sousCategories])

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
        categorie: 1,
        fichier: null,
      })
      setPreview(null)
    }
  }, [isOpen])
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    const numberFields = ["prix", "quantite_stock", "id_sous_categorie"]

    setFormData((prev) => ({
      ...prev,
      [name]: numberFields.includes(name) ? safeNumber(value) : value,
    }))
  }

  // IMAGE
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return
    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setFormData((prev) => ({
      ...prev,
      image: selectedFile.name,
      fichier: selectedFile,
    }))
  }

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    try {
      const token = localStorage.getItem("token") || ""

      console.log("--------FORMDATA---------" + JSON.stringify(formData))

      const dataToSend = new FormData()
      // 2. Remplir le FormData avec les clés attendues par votre DTO
      dataToSend.append("nom_produit", formData.nom_produit)
      dataToSend.append("description", formData.description)
      dataToSend.append("type", formData.type)
      dataToSend.append("prix", formData.prix.toString())
      dataToSend.append("quantite_stock", "" + formData.quantite_stock)
      dataToSend.append("categorie", "" + selectedCategory.id_categorie)
      dataToSend.append(
        "id_sous_categorie",
        String(Number(formData.id_sous_categorie))
      )

      // 3. Ajouter le fichier image s'il a été modifié/sélectionné (ex: stocké dans un state 'file')
      if (file) {
        dataToSend.append("image", file)
      } else {
        dataToSend.append("image", formData.image) // Garde l'ancienne chaîne textuelle si pas de changement
      }

      const idProduit = productToEdit.id_produit

      // 4. Envoyer le FormData à votre fonction
      const response = await updateProduit(idProduit, dataToSend, token)

      console.log("isEdit: --------------------------" + isEdit)
      const currentSubCategories = selectedCategory
      const subCategoryName = selectedSubCategory.nom_sous_categorie

      console.log(
        "-------FORMDATA-------" + JSON.stringify(dataToSend.entries())
      )

      const newProduct = {
        id_sous_categorie: selectedSubCategory.id_sous_categorie,
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
        ...response,
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

  const safeNumber = (val: string) => (val === "" ? 0 : Number(val))

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto relative p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-bold text-slate-800">
            {productToEdit ? "Modifier le produit" : "Ajouter un produit"}
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
                  name="categorie"
                  value={selectedCategory.nom_categorie}
                  onChange={(e) => {
                    const nextCat = e.target.value
                    const targetCatName = e.target.value

                    // 1. On cherche l'objet Category complet dans votre tableau de catégories
                    const foundCategory = categories.find(
                      (cat) => cat.nom_categorie === targetCatName
                    )

                    // 2. Si on le trouve, on passe l'objet entier à setSelectedCategory
                    if (foundCategory) {
                      setSelectedCategory(foundCategory)
                    }

                    // Sécurité : Réinitialise la sous-catégorie à 1 pour éviter un index hors-limite
                    setFormData((prev) => ({
                      ...prev,
                      categorie: selectedCategory.id_categorie,
                    }))
                  }}
                  className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                >
                  {categories.map((cat) => (
                    <option key={cat.id_categorie} value={cat.nom_categorie}>
                      {cat.nom_categorie}
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
                name="sous_categorie"
                // On lie la valeur au NOM de la sous-catégorie stockée dans l'objet d'état
                value={selectedSubCategory.nom_sous_categorie}
                onChange={(e) => {
                  const targetSubCatName = e.target.value

                  // 1. On cherche l'objet SubCategory complet dans le tableau global sousCategories
                  const foundSubCategory = sousCategories.find(
                    (sub) => sub.nom_sous_categorie === targetSubCatName
                  )

                  // 2. Si on le trouve, on met à jour l'objet d'état et le formData
                  if (foundSubCategory) {
                    setSelectedSubCategory(foundSubCategory)

                    setFormData((prev) => ({
                      ...prev,
                      // On enregistre le véritable ID de la base de données pour l'envoi au serveur
                      id_sous_categorie: foundSubCategory.id_sous_categorie,
                    }))
                  }
                }}
                className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              >
                {/* Option par défaut si aucune sous-catégorie n'est encore chargée ou trouvée */}
                {/*{selectedSubCategory.id_sous_categorie === 0 && (
                  <option value="">Sélectionnez une sous-catégorie</option>
                )}*/}

                {sousCategories
                  .filter(
                    (sub) => sub.id_categorie === selectedCategory.id_categorie
                  )
                  .map((sub) => (
                    <option
                      key={sub.id_sous_categorie}
                      value={sub.nom_sous_categorie}
                    >
                      {sub.nom_sous_categorie}
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

        {showSuccess && (
          <SuccessPopup message="Produit modifié avec succès !" />
        )}
      </div>
    </div>
  )
}

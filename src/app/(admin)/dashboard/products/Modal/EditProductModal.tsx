"use client"

import { IoMdClose } from "react-icons/io"
import { FaCloudUploadAlt } from "react-icons/fa"
import { useRef, useState, useEffect, useCallback } from "react"
import SuccessPopup from "@/components/common/SuccessPopup"
import { updateProduit } from "@/services/produitServices"
import { EditProductModalProps } from "@/types/global"

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductFormData {
  nom_produit: string
  description: string
  prix: number
  quantite_stock: number
  type: string
  categorie: number
  image: string
  id_sous_categorie: number
}

interface SubCategory {
  id_sous_categorie: number
  nom_sous_categorie: string
  description: string
  date_creation: string
  id_categorie: number
}

interface Category {
  id_categorie: number
  nom_categorie: string
  description: string
  id_type: number
}

// ─── Valeurs par défaut ────────────────────────────────────────────────────────

const DEFAULT_FORM: ProductFormData = {
  nom_produit: "",
  description: "",
  prix: 0,
  quantite_stock: 0,
  type: "RAFIA",
  image: "",
  categorie: 1,
  id_sous_categorie: 1,
}

// ─── Composant ────────────────────────────────────────────────────────────────

export default function EditProductModal({
  isOpen,
  onClose,
  onSuccess,
  productToEdit,
}: EditProductModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [categories, setCategories] = useState<Category[]>([])
  const [sousCategories, setSousCategories] = useState<SubCategory[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1)
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>(1)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>(DEFAULT_FORM)

  // ─── Helpers API ────────────────────────────────────────────────────────────

  const getToken = () => localStorage.getItem("token") || ""

  const fetchCategories = useCallback(async (): Promise<Category[]> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/category/find`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    )
    return res.json()
  }, [])

  const fetchSousCategories = useCallback(async (): Promise<SubCategory[]> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/sous_category/find`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    )
    const data = await res.json()
    // Gère les deux formats : tableau direct ou { data: [...] }
    return Array.isArray(data) ? data : data.data ?? []
  }, [])
  useEffect(() => {   console.log("productToEdit reçu :", productToEdit)   ;
    console.log("id_categorie :", productToEdit?.id_categorie)   ;
    console.log("id_sous_categorie :", productToEdit?.id_sous_categorie) }, [productToEdit])

    useEffect(() => {
      if (isOpen && productToEdit) {
        console.log("Structure complète productToEdit :", JSON.stringify(productToEdit, null, 2))
      }
    }, [isOpen, productToEdit])
 
  // ─── EFFECT UNIQUE : chargement + initialisation ─────────────────────────────
  // Se déclenche uniquement quand la modal s'ouvre ou que productToEdit change

  useEffect(() => {
    if (!isOpen) {
      // Reset complet à la fermeture
      setFormData(DEFAULT_FORM)
      setPreview(null)
      setFile(null)
      setSelectedCategoryId(1)
      setSelectedSubCategoryId(1)
      return
    }
   
    // ✅ ÉTAPE 1 : Initialisation IMMÉDIATE depuis productToEdit
    // Sans attendre l'API → pas de flash avec les valeurs par défaut
    if (productToEdit) {
      const catId = productToEdit.id_categorie
        ?? productToEdit.sous_category?.category?.id_categorie
        ?? 1
   
      const subCatId = productToEdit.id_sous_categorie
        ?? productToEdit.sous_category?.id_sous_categorie
        ?? 1
   
      // ✅ On set les IDs AVANT le fetch
      setSelectedCategoryId(catId)
      setSelectedSubCategoryId(subCatId)
   
      setFormData({
        nom_produit:     productToEdit.nom_produit     ?? "",
        description:     productToEdit.description     ?? "",
        prix:            productToEdit.prix            ?? 0,
        quantite_stock:  productToEdit.quantite_stock  ?? 0,
        type:
          productToEdit.type
          ?? productToEdit.sous_category?.category?.type?.nom_type
          ?? "RAFIA",
        image:           productToEdit.image           ?? "",
        categorie:       catId,
        id_sous_categorie: subCatId,
      })
   
      // ✅ Image preview immédiate
      if (productToEdit.image) {
        const urlEncoded = productToEdit.image.replace(/ /g, "%20")
        setPreview(`${process.env.NEXT_PUBLIC_API_URL}/uploads/${urlEncoded}`)
      }
    }
   
    // ✅ ÉTAPE 2 : Chargement des listes en arrière-plan (ne touche PAS formData)
    const loadLists = async () => {
      try {
        const [cats, subCats] = await Promise.all([
          fetchCategories(),
          fetchSousCategories(),
        ])
        setCategories(cats)
        setSousCategories(subCats)
        // ⚠️ On ne réinitialise PAS formData ici → les valeurs restent correctes
      } catch (error) {
        console.error("Erreur chargement listes :", error)
      }
    }
   
    loadLists()
   
  }, [isOpen, productToEdit])

  // ─── Sous-catégories filtrées selon la catégorie sélectionnée ───────────────

  const filteredSubCategories = sousCategories.filter(
    (sub) => sub.id_categorie === selectedCategoryId
  )

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    const numberFields = ["prix", "quantite_stock"]
    setFormData((prev) => ({
      ...prev,
      [name]: numberFields.includes(name) ? (value === "" ? 0 : Number(value)) : value,
    }))
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCatId = Number(e.target.value)
    setSelectedCategoryId(newCatId)
    setFormData((prev) => ({ ...prev, categorie: newCatId }))

    // Auto-sélectionne la première sous-catégorie de la nouvelle catégorie
    const firstSub = sousCategories.find(
      (sub) => sub.id_categorie === newCatId
    )
    if (firstSub) {
      setSelectedSubCategoryId(firstSub.id_sous_categorie)
      setFormData((prev) => ({
        ...prev,
        categorie: newCatId,
        id_sous_categorie: firstSub.id_sous_categorie,
      }))
    }
  }

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSubId = Number(e.target.value)
    setSelectedSubCategoryId(newSubId)
    setFormData((prev) => ({ ...prev, id_sous_categorie: newSubId }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return
    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setFormData((prev) => ({ ...prev, image: selectedFile.name }))
  }

  // ─── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)

    try {
      const dataToSend = new FormData()
      dataToSend.append("nom_produit", formData.nom_produit)
      dataToSend.append("description", formData.description)
      dataToSend.append("type", formData.type)
      dataToSend.append("prix", formData.prix.toString())
      dataToSend.append("quantite_stock", formData.quantite_stock.toString())
      dataToSend.append("categorie", selectedCategoryId.toString())
      dataToSend.append("id_sous_categorie", selectedSubCategoryId.toString())

      if (file) {
        dataToSend.append("image", file)
      } else {
        dataToSend.append("image", formData.image)
      }

      const response = await updateProduit(
        productToEdit.id_produit,
        dataToSend,
        getToken()
      )

      // Construction de l'objet retourné au parent
      const selectedCat = categories.find(
        (c) => c.id_categorie === selectedCategoryId
      )
      const selectedSub = sousCategories.find(
        (s) => s.id_sous_categorie === selectedSubCategoryId
      )

      const updatedProduct = {
        ...response,
        id_sous_categorie: selectedSubCategoryId,
        nom_produit: formData.nom_produit,
        prix: formData.prix,
        quantite_stock: formData.quantite_stock,
        image: formData.image,
        sous_category: {
          nom_sous_categorie: selectedSub?.nom_sous_categorie ?? "",
          category: {
            nom_categorie: selectedCat?.nom_categorie ?? "",
            type: { nom_type: formData.type },
          },
        },
        date_ajout: response.date_ajout || new Date().toISOString(),
      }

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onSuccess(updatedProduct)
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

  // ─── Rendu ───────────────────────────────────────────────────────────────────

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
                {/* ✅ value lié à l'ID (number), pas au nom */}
                <select
                  name="categorie"
                  value={selectedCategoryId}
                  onChange={handleCategoryChange}
                  className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                >
                  {categories.map((cat) => (
                    <option key={cat.id_categorie} value={cat.id_categorie}>
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
              {/* ✅ value lié à l'ID (number), filtré par catégorie sélectionnée */}
              <select
                name="sous_categorie"
                value={selectedSubCategoryId}
                onChange={handleSubCategoryChange}
                className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              >
                {filteredSubCategories.map((sub) => (
                  <option
                    key={sub.id_sous_categorie}
                    value={sub.id_sous_categorie}
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

"use client"

import { IoMdClose } from "react-icons/io"
import { FaCloudUploadAlt } from "react-icons/fa"
import Button from "@/components/common/Button"
import { useRef, useState } from "react"
import { SUB_CATEGORIES_DATA } from "@/components/constant"
import { FileInput } from "lucide-react"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddProductModal({
  isOpen,
  onClose,
  onSuccess,
}: AddProductModalProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof SUB_CATEGORIES_DATA>("Chapeaux")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
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

        <form className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* COLONNE GAUCHE : Informations */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nom du produit
              </label>
              <input
                type="text"
                placeholder="Panier Rabane"
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
              <p className="text-xs text-slate-400 mt-2">
                Ne pas dépasser 20 caractères.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Type
                </label>
                <select className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 outline-none">
                  <option>RAFIA</option>
                  <option>RABANE</option>
                  <option>SATRANA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Catégorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(
                      e.target.value as keyof typeof SUB_CATEGORIES_DATA
                    )
                  }
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Chapeaux">Chapeaux</option>
                  <option value="Panier">Panier</option>
                  <option value="Boite">Boite</option>
                  <option value="Pochette">Pochette</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Sous Categories
              </label>
              <select className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-500">
                {SUB_CATEGORIES_DATA[selectedCategory].map((sub) => (
                  <option key={sub} value={sub}>
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
                rows={6}
                className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 outline-none resize-none"
                placeholder="Entrez la description..."
              ></textarea>
              <p className="text-xs text-slate-400 mt-2">
                Maximum 100 caractères.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Images du produit
            </label>
            <div className="flex justify-start">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="group w-64 aspect-square border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer p-6"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <>
                    {" "}
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
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Quantité produit{" "}
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 outline-none"
                ></input>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Date d'ajout du produit
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-10">
              <button
                type="submit"
                className="flex-1 bg-red-600 text-white transition-transform hover:scale-105 active:scale-95 flex items-center justify-center py-4 rounded-xl font-bold cursor-pointer"
              >
                Annuler Produit
              </button>
              <Button
                label="Enregistrer"
                type="submit"
                className="w-30! rounded-xl px-0! py-2! p-4 border-2 border-slate-400 hover:border-blue-400   text-slate-600! bg-white"
              ></Button>

              <button
                type="button"
                className="flex-1 border-2 border-slate-100 text-slate-300 py-4 rounded-xl font-bold cursor-not-allowed"
              >
                Planifier
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

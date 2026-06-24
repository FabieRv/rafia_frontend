"use client"
import { useEffect, useState } from "react"
import { User } from "@/types/global"
import { Camera, Save, User as UserIcon } from "lucide-react" // Facultatif : pour des icônes
import Container from "@/components/common/Container"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  // Gérer la prévisualisation locale de l'image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleUpload = async () => {
    if (!imageFile) return
    const formData = new FormData()
    formData.append("image", imageFile)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/uploadimage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })

    if (!res.ok) {
      console.error("UPLOAD ERROR")
      return
    }

    const data = await res.json()
    localStorage.setItem("user", JSON.stringify(data))
    setUser(data)
    window.dispatchEvent(new Event("userUpdated"))
  }

  return (
    <Container className="font-text">
      <div className=" flex items-center justify-center ">

        <div className="w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/20 shadow-2xl rounded-3xl p-8 flex flex-col items-center">
          <h1 className="text-3xl font-light tracking-tight text-gray-800 mb-8">
            Mon Profil
          </h1>

          {/* Section Avatar */}
          <div className="relative group mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-black/5">
              {preview || user?.image ? (
                <img
                  src={preview || `http://localhost:3000${user?.image}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Profile"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                  <UserIcon size={48} strokeWidth={1} />
                </div>
              )}
            </div>

            {/* Label Input File stylisé en bouton Caméra */}
            <label className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-orange-50 transition-colors border border-gray-100">
              <Camera size={20} className="text-orange-600" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Infos Utilisateur */}
          <div className="text-center mb-8">
            <p className="text-lg font-medium text-gray-800">
              {user?.name || "Utilisateur"}
            </p>
            <p className="text-sm text-gray-500">
              {user?.email || "email@exemple.com"}
            </p>
          </div>

          {/* Bouton de sauvegarde */}
          <button
            onClick={handleUpload}
            disabled={!imageFile}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg ${
              imageFile
                ? "bg-[#E67E22] font-text text-white  hover:bg-orange-700 hover:-translate-y-1 active:scale-95"
                : "bg-[#E67E22] font-text text-white  cursor-not-allowed"
            }`}
          >
            <Save size={18} />
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </Container>
  )
}

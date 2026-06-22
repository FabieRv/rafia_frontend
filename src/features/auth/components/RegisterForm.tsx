import { Link, Lock, Mail, MapPin, Phone, User } from "lucide-react"
import React, { useState } from "react"

export default function Register({ onSwitch }: { onSwitch: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    adress: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          adress: formData.adress,
        }),
      })

      if (response.ok) {
        alert("Compte créé avec succès !")
        onSwitch()
      } else {
        const errorData = await response.json()
        alert(`Erreur: ${errorData.message}`)
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      alert("Impossible de contacter le serveur.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <div className="animate-in fade-in zoom-in-95 duration-500">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">
          Inscription
        </h2>
        <p className="text-center text-white/80 mb-8 text-sm">
          Créez votre compte RafiaCraft
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ Nom */}
          <div className="relative border-b border-white/30 py-2 text-white">
            <input
              name="name"
              type="text"
              required
              placeholder="Nom complet"
              className="w-full bg-transparent outline-none placeholder:text-white/40 text-sm"
              onChange={handleChange}
            />
            <User className="absolute right-0 bottom-2 opacity-60" size={16} />
          </div>

          {/* Champ Email */}
          <div className="relative border-b border-white/30 py-2 text-white">
            <input
              name="email"
              type="email"
              required
              placeholder=" Email"
              className="w-full bg-transparent outline-none placeholder:text-white/40 text-sm"
              onChange={handleChange}
            />
            <Mail className="absolute right-0 bottom-2 opacity-60" size={16} />
          </div>

          {/* Champ Phone */}
          <div className="relative border-b border-white/30 py-2 text-white">
            <input
              name="phone"
              type="text"
              placeholder="Numero Téléphone"
              className="w-full bg-transparent outline-none placeholder:text-white/40 text-sm"
              onChange={handleChange}
            />
            <Phone className="absolute right-0 bottom-2 opacity-60" size={16} />
          </div>

          {/* Champ Adress */}
          <div className="relative border-b border-white/30 py-2 text-white">
            <input
              name="adress"
              type="text"
              placeholder="Addresse"
              className="w-full bg-transparent outline-none placeholder:text-white/40 text-sm"
              onChange={handleChange}
            />
            <MapPin
              className="absolute right-0 bottom-2 opacity-60"
              size={18}
            />
          </div>

          {/* Champ Password */}
          <div className="relative border-b border-white/30 py-2 text-white text-sm">
            <input
              name="password"
              type="password"
              required
              placeholder="Mot de passe"
              className="w-full bg-transparent outline-none placeholder:text-white/40 "
              onChange={handleChange}
            />
            <Lock className="absolute right-0 bottom-2 opacity-60" size={16} />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-white text-black font-bold py-3 rounded-full mt-4 hover:bg-opacity-90 transition disabled:bg-gray-400"
          >
            {loading ? "Chargement..." : "Register"}
          </button>
        </form>

        <button
          onClick={onSwitch}
          className="w-full text-center mt-6 text-sm text-white/60 hover:text-white underline"
        >
          Vous avez déjà créé un compte? Login
        </button>
      </div>
    </div>
  )
}

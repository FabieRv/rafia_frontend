"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Lock, Loader2 } from "lucide-react"

interface LoginFormProps {
  onSwitch: () => void
  onForgotPassword: () => void
}

export default function LoginForm({
  onSwitch,
  onForgotPassword,
}: LoginFormProps) {
  // On utilise un seul état pour le formulaire, c'est plus propre
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // 1. Stockage des informations essentielles
        localStorage.setItem("token", data.access_token)
        localStorage.setItem("user_name", data.name)
        localStorage.setItem("user_role", data.role)

        // 2. Redirection dynamique intelligente
        if (data.role === "ADMIN") {
          router.push("/dashboard")
        } else {
          router.push("/")
        }
      } else {
        setError(data.message || "Email ou mot de passe incorrect")
      }
    } catch (err) {
      setError("Le serveur est injoignable. Vérifie ton backend.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold text-center mb-6">Connexion</h2>

      {error && (
        <p className="bg-red-500/20 border border-red-500 text-red-200 text-xs p-2 rounded mb-4 text-center">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Champ Email */}
        <div className="relative border-b border-white/30 py-2">
          <input
            type="email"
            required
            placeholder="Adresse Email"
            className="w-full bg-transparent outline-none text-white placeholder:text-white/40 text-sm"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <User className="absolute right-0 opacity-60" size={18} />
        </div>

        {/* Champ Password */}
        <div className="relative border-b border-white/30 py-2">
          <input
            type="password"
            required
            placeholder="Mot de passe"
            className="w-full bg-transparent outline-none text-white placeholder:text-white/40 text-sm"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Lock className="absolute right-0 opacity-60" size={18} />
        </div>

        {/* Bouton de soumission stylé */}
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-white text-black font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-opacity-90 transition disabled:bg-gray-400"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Se connecter"
          )}
        </button>
      </form>

      <div className="flex flex-col gap-2 mt-6">
        <button
          onClick={onForgotPassword}
          className="text-xs text-white/50 hover:text-white transition underline"
        >
          Mot de passe oublié ?
        </button>
        <button
          onClick={onSwitch}
          className="text-sm text-white/60 hover:text-white underline"
        >
          Pas encore de compte ? S'inscrire
        </button>
      </div>
    </div>
  )
}

"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Lock, Loader2 } from "lucide-react"

export default function LoginForm({
  onSwitch,
  onForgotPassword,
}: {
  onSwitch: () => void
  onForgotPassword: () => void
}) {
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
        localStorage.setItem("token", data.access_token)
        router.push("/")
      } else {
        setError(data.message || "Email ou mot de passe incorrect")
      }
    } catch (err) {
      setError("Impossible de contacter le serveur. Vérifiez votre connexion.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

      {error && (
        <p className="bg-red-500/20 border border-red-500 text-red-200 text-xs p-2 rounded mb-4 text-center">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative border-b border-white/30 py-2">
          <input
            type="email"
            required
            placeholder="Email Address"
            className="w-full bg-transparent outline-none text-white placeholder:text-white/40 text-sm"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <User className="absolute  right-0 opacity-60" size={18} />
        </div>

        <div className="relative  border-b border-white/30 py-2">
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full bg-transparent outline-none text-white placeholder:text-white/40 text-sm"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Lock className="absolute right-0 opacity-60" size={18} />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-white text-black font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-opacity-90 transition disabled:bg-gray-400"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Login"}
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
          Don't have an account? Register
        </button>
      </div>
    </div>
  )
}

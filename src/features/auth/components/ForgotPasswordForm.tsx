"use client"
import { useState } from "react"
import { Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:3001/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      setMessage(data.message)
    } catch (err) {
      setMessage("Erreur lors de l'envoi")
    }
  }

  return (
    <div className="animate-in slide-in-from-right-5 duration-300">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/50 hover:text-white mb-6 text-sm"
      >
        <ArrowLeft size={16} /> Retour
      </button>
      <h2 className="text-2xl font-bold mb-4">Réinitialisation</h2>
      <p className="text-sm text-white/60 mb-6">
        Entrez votre email pour recevoir un lien.
      </p>

      {message && <p className="text-xs text-green-400 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative border-b border-white/30 py-2">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-transparent outline-none text-white"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Mail className="absolute right-0 opacity-60" size={18} />
        </div>
        <button className="w-full bg-white text-black font-bold py-3 rounded-full">
          Envoyer le lien
        </button>
      </form>
    </div>
  )
}

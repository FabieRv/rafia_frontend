"use client"

import Container from "@/components/common/Container"
import SuccessPopup from "@/components/common/SuccessPopup"
import { useCommandeStore } from "@/store/commande.store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export default function CommandePage() {
  const items = useCommandeStore((state) => state.items)
  const clearCart = useCommandeStore((state) => state.clear)

  const [email, setEmail] = useState("")
  const [adresse, setAdresse] = useState("")
  const [ville, setVille] = useState("")
  const [region, setRegion] = useState("")

  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return
        const userString = localStorage.getItem("user")

        if (userString) {
          const user = JSON.parse(userString)
          setEmail(user.email || "")
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (res.ok) {
          const data = await res.json()
          setAdresse(data.adresse || "")
        }
      } catch (err) {
        console.error("Erreur fetch user:", err)
      }
    }

    fetchUser()
  }, [])

  const handleCommande = async () => {
    if (items.length === 0) {
      if (items.length === 0) {
        toast.error("Votre panier est vide")
        return
      }
    }

    if (!email || !adresse || !ville || !region) {
      toast.error("Veuillez remplir tous les champs")
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const payload = {
        items: items.map((item: any) => ({
          id_produit: item.id_produit,
          prix: item.prix,
          quantite: item.quantite,
        })),
        adresse_livraison: adresse,
        ville,
        region,
        email,
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/commande/validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      )

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.message || "Erreur serveur")
      }

      setShowSuccess(true)
      clearCart()

      setTimeout(() => {
        setShowSuccess(false)
        router.push("/modele")
      }, 2000)
    } catch (error: any) {
      setErrorMessage(error.message)

      setTimeout(() => setErrorMessage(""), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <Container className="pb-16">
        <div className="max-w-2xl mx-auto border border-gray-200 p-10 bg-white mt-10 shadow-lg rounded-xl">
          <h1 className="text-4xl text-[#4A3728]  text-center font-title title">
            Finaliser commande
          </h1>

          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-3 rounded-lg"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm">Adresse de livraison</label>
              <input
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                placeholder="Lot 166 bis Andrefantsena"
                className="border p-3 rounded-lg"
                type="text"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <input
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                  className="border p-3 rounded-lg"
                  placeholder="Antananarivo"
                />
                <label className=" text-sm">Ville</label>
              </div>
              <div className="flex flex-col gap-2">
                <input
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="border p-3 rounded-lg"
                  placeholder="Analamanga"
                />
                <label className="text-sm">Région</label>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button
                onClick={handleCommande}
                disabled={loading || showSuccess}
                className="py-3 px-4 bg-[#E67E22] text-sm font-text text-white rounded-full font-semibold
                transition-transform hover:scale-105 active:scale-95
                flex items-center justify-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {showSuccess
                  ? "Commande réussie ✔"
                  : loading
                  ? "Traitement..."
                  : "Confirmer la commande"}
              </button>
            </div>
          </div>
        </div>
      </Container>
      {showSuccess && <SuccessPopup message="Commande réussie ✔️" />}
      {errorMessage && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg z-50">
          {errorMessage}
        </div>
      )}
    </div>
  )
}

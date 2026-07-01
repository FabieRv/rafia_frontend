"use client"

import { useEffect, useState } from "react"
import {
  getCommandeById,
  updateCommandeStatus,
} from "@/services/dashboard/commande.service"
import { useParams, useRouter } from "next/navigation"
import { Mail, MessageSquare, Save } from "lucide-react"
import { toast } from "react-hot-toast"
import axios from "axios"

export default function CommandeDetail() {
  const [statusCommande, setStatusCommande] = useState("")
  const [notifyMail, setNotifyMail] = useState(false)
  const [notifySms, setNotifySms] = useState(false)

  const params = useParams()
  const id = params.id
  const [commande, setCommande] = useState<any>(null)
  const router = useRouter()
  const FINAL_STATUTS = ["LIVREE", "ANNULEE"]

  const isFinalStatut = (statut?: string) => {
    if (!statut) return false
    return FINAL_STATUTS.includes(statut)
  }

  useEffect(() => {
    const load = async () => {
      if (!id) return

      const token = localStorage.getItem("token")
      const data = await getCommandeById(Number(id), token!)
      console.log("COMMANDE", data)
      setCommande(data)
      setStatusCommande(data.statut || "EN_ATTENTE")
    }

    load()
  }, [id])

  const produits =
    commande?.items?.map((item: any) => {
      const prixHT = item.prix * item.quantite
      const prixTTC = prixHT * 1.2
      return {
        id: item.id_commandeItem,
        nom:
          item.product?.nom_produit ??
          item.product_name_snapshot ??
          "Produit supprimé",
        type: item.product?.type || "-",
        // Sécurisation de la catégorie ici
        categorie:
          item.product?.sous_category?.category?.nom_categorie ??
          "Non catégorisé",
        quantite: item.quantite,
        prixUnitaire: item.prix,
        prixHT: item.prix * item.quantite,
        prixTTC,
      }
    }) || []

  const handleSaveStatus = async () => {
    const token = localStorage.getItem("token")
    try {
      await updateCommandeStatus(commande.id_commande, statusCommande, token!)
      router.refresh()
      toast.success("Statut mis à jour")
    } catch (error) {
      console.error(error)

      alert("Erreur lors de la mise à jour")
    }
  }

  const handleSendMail = async () => {
    try {
      const token = localStorage.getItem("token")

      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mail/send`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success("Email envoyé au client !")
    } catch (error) {
      console.error(error)
      toast.error("Erreur envoi email")
    }
  }

  const handleSendSms = () => {
    alert("SMS envoyé au client !")
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm font-sans text-gray-800">
      <div className="text-xs text-gray-500 mb-4">
        Référence : cmd_rafiacraft_ {commande?.id_commande}
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-t-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-sm text-gray-700">
              <th className="p-3 font-semibold">Nom de produit</th>
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3 font-semibold">Categories</th>
              <th className="p-3 font-semibold">Quantité</th>
              <th className="p-3 font-semibold">Prix unitaire</th>
              <th className="p-3 font-semibold">Prix HT</th>
              <th className="p-3 font-semibold text-right">Prix TTC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {produits.map((produit: any) => (
              <tr key={produit.id} className="hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-900">{produit.nom}</td>

                <td className="p-3 text-gray-600">{produit.type}</td>

                <td className="p-3 text-gray-600">{produit.categorie}</td>

                <td className="p-3 text-gray-600">{produit.quantite}</td>

                <td className="p-3 text-gray-600">
                  {produit.prixUnitaire.toFixed(2)} €
                </td>
                <td className="p-3 text-gray-600">
                  {produit.prixHT.toFixed(2)} €
                </td>
                <td className="p-3 text-right font-medium text-gray-900">
                  {produit.prixTTC.toFixed(2)} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-6 text-xl font-bold text-gray-900 tracking-wide">
        PRIX TOTAL : {commande?.total?.toFixed(2)} €
      </div>
      <hr className="border-gray-200 my-6" />
      <div className="space-y-4 max-w-xl">
        <label className="block text-sm font-medium text-gray-700">
          État de la commande
        </label>
        <select
          value={statusCommande}
          onChange={(e) => setStatusCommande(e.target.value)}
          disabled={isFinalStatut(commande?.statut)}
          className={`w-full p-2.5 bg-white border rounded-md shadow-sm text-sm focus:outline-none focus:ring-1
    ${
      isFinalStatut(commande?.statut)
        ? "opacity-50 cursor-not-allowed border-gray-300"
        : "border-amber-400 focus:ring-amber-400"
    }
  `}
        >
          <option value="EN_ATTENTE">En Attente</option>
          <option value="NEGOCIEE">Négociée</option>
          <option value="CONFIRMEE">Confirmée</option>
          <option value="LIVREE">Livrée</option>
          <option value="ANNULEE">Annulée</option>
        </select>

        <button
          onClick={handleSaveStatus}
          className="flex items-center gap-2 bg-[#f49f0a] hover:bg-[#FF8811] text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg shadow transition-colors"
        >
          <Save size={14} />
          Sauvegarder
        </button>
      </div>
      <hr className="border-gray-200 my-8" />
      {/* Section Notifications Client */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Commande prête ? Prévenir le client
        </h3>

        {/* Bouton Mail + Checkbox */}
        <div className="flex flex-col space-y-2 max-w-xs">
          <button
            onClick={handleSendMail}
            className="flex items-center justify-center gap-2 bg-[#A7C957] hover:bg-[#70AE6E] text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg shadow transition-colors w-full"
          >
            <Mail size={14} />
            Envoyer un mail
          </button>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={notifyMail}
              onChange={(e) => setNotifyMail(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#FF4500] focus:ring-[#FF4500]"
            />
            <span className="text-xs text-gray-500">
              Statut de notification
            </span>
          </label>
        </div>

        {/* Bouton SMS + Checkbox */}
        <div className="flex flex-col space-y-2 max-w-xs">
          <button
            onClick={handleSendSms}
            className="flex items-center justify-center gap-2 bg-[#A7C957] hover:bg-[#70AE6E] text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg shadow transition-colors w-full"
          >
            <MessageSquare size={14} />
            Envoyer un message
          </button>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={notifySms}
              onChange={(e) => setNotifySms(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#FF4500] focus:ring-[#FF4500]"
            />
            <span className="text-xs text-gray-500">
              Statut de notification
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

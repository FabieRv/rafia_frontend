"use client"
import { useEffect, useState } from "react"
import { CiImport } from "react-icons/ci"
import { IoMdSearch } from "react-icons/io"
import DataTableToolbar from "../_pages/DataTableToolbar"

import { motion } from "framer-motion"
import { Commande, CommandesTableProps } from "@/types/global"

export default function CommandesDashboard({
  commandes,
  onStatusChange,
}: CommandesTableProps) {
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(
    null
  )

  // Couleurs dynamiques pour le statut de la commande
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "EN_ATTENTE":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "VALIDE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      default:
        return "bg-rose-50 text-rose-700 border-rose-200"
    }
  }

  return (
    <div className="w-full space-y-6 font-text">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 border-b border-gray-100 text-gray-700 text-sm font-bold tracking-wider uppercase">
                <th className="p-5">COMMANDE</th>
                <th className="p-5">CLIENT</th>
                <th className="p-5">DATE COMMANDE</th>
                <th className="p-5">TOTAL TTC</th>
                <th className="p-5">STATUS</th>
                <th className="p-5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {commandes.map((cmd) => (
                <tr
                  key={cmd.id_commande}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  {/* ID Commande */}
                  <td className="p-5 font-bold text-gray-900">
                    #{cmd.id_commande}
                  </td>

                  {/* Client */}
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        {cmd.user.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {cmd.user.email}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="p-5 text-gray-500">
                    {new Date(cmd.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Total */}
                  <td className="p-5 font-bold text-gray-900">
                    {Number(cmd.total).toFixed(2)} €
                  </td>

                  {/* Statut */}
                  <td className="p-5">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getStatutColor(
                        cmd.statut
                      )}`}
                    >
                      {cmd.statut}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-5 text-right space-x-2">
                    <button
                      onClick={() => setSelectedCommande(cmd)}
                      className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all inline-flex items-center gap-1"
                    ></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL Framer Motion pour les détails de la commande sélectionnée */}
      {selectedCommande && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedCommande(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black font-bold text-lg"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Détails de la Commande #{selectedCommande.id_commande}
            </h3>

            {/* Articles achetés */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase flex items-center gap-2">
                Articles Commandés
              </h4>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl p-2 bg-gray-50/50">
                {selectedCommande.items.map((item) => (
                  <div
                    key={item.id_commandeItem}
                    className="flex items-center gap-4 py-3 px-2"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={
                          item.product.image
                            ? `/images/${item.product.image}`
                            : "https://placehold.co/100"
                        }
                        alt={item.product.nom_produit}
                        className="object-contain w-full h-full p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate text-sm">
                        {item.product.nom_produit}
                      </p>
                      <p className="text-xs text-gray-400">
                        Quantité : {item.quantite} × {item.prix} €
                      </p>
                    </div>
                    <p className="font-bold text-gray-900 text-sm">
                      {(item.quantite * item.prix).toFixed(2)} €
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Adresse de livraison */}
            <div className="bg-orange-50/50 border border-orange-100/50 rounded-2xl p-5 text-sm">
              <h4 className="font-bold text-orange-900 mb-2">
                Adresse de livraison
              </h4>
              <p className="text-gray-700">
                {selectedCommande.adresse_livraison}
              </p>
              <p className="text-gray-600 font-medium">
                {selectedCommande.ville} - {selectedCommande.region}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

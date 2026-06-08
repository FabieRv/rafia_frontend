"use client"

import { useEffect, useState } from "react"

import { Loader2 } from "lucide-react"
import CommandesDashboard from "./CommandesTable"
import DataTableToolbar from "../_pages/DataTableToolbar"

export default function AdminCommandesPage() {
  const [commandes, setCommandes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filter, setFilter] = useState("TOUS")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("Vous n'êtes pas connecté ou votre session a expiré.")
        }
        const NestUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
        const response = await fetch(`${NestUrl}/admin/commandes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("Accès refusé. Vous devez être Administrateur.")
          }
          throw new Error("Erreur lors de la récupération des commandes.")
        }

        const data = await response.json()
        setCommandes(data)
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue")
      } finally {
        setLoading(false)
      }
    }

    fetchCommandes()
  }, [])

  const handleStatusChange = async (id: number, newStatus: string) => {
    console.log(`Changement de statut pour la commande ${id} vers ${newStatus}`)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 font-text">
        <Loader2 className="animate-spin text-orange-600" size={40} />
        <p className="text-gray-500 font-medium">Chargement des commandes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center font-text">
        <div className="bg-rose-50 border border-rose-100 text-rose-700 p-6 rounded-3xl max-w-md mx-auto">
          <p className="font-bold mb-2">Erreur d'accès</p>
          <p className="text-sm opacity-90">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto font-text">
      {/* On passe les données récupérées au tableau de composants créé précédemment */}
      <DataTableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onFilterClick={() => console.log("filter")}
        onExportClick={() => console.log("export")}
      />
      <CommandesDashboard
        commandes={commandes}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}

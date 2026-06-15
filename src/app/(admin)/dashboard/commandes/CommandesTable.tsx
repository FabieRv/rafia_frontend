"use client"
import { useState, useEffect } from "react"
import { CommandesTableProps } from "@/types/global"
import { MdDeleteForever } from "react-icons/md"
import { AiOutlineEye } from "react-icons/ai"
import { IoMdClose } from "react-icons/io"
import FilterTabs from "../_pages/FilterTabs"
import DataTableToolbar from "../_pages/DataTableToolbar"
import { useRouter } from "next/navigation"
import FilterContent from "../_pages/FilterContent"
import { STATUTS, StatutCommande } from "@/components/constant/Status"
import { COMMANDE_CSV_HEADERS } from "@/components/constant/commandeExport"
import { deleteCommande } from "@/services/dashboard/commande.service"

export default function CommandesDashboard({ commandes }: CommandesTableProps) {
  const [search, setSearch] = useState("")
  const [statutSelectionne, setStatutSelectionne] =
    useState<StatutCommande>("Tous")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [localCommandes, setLocalCommandes] = useState(commandes)

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const router = useRouter()
  const statusMap: Record<string, string> = {
    "En attente": "EN_ATTENTE",
    Confirmée: "CONFIRMEE",
    Négociée: "NEGOCIEE",
    Livrée: "LIVREE",
    Annulée: "ANNULEE",
  }

  const filteredCommandes = localCommandes.filter((cmd) => {
    const matchesStatut =
      statutSelectionne === "Tous" ||
      cmd.statut === statusMap[statutSelectionne]

    const searchLower = search.toLowerCase().trim()

    // filtrer date
    const matchesSearch =
      search === "" ||
      cmd.user.name.toLowerCase().includes(searchLower) ||
      cmd.user.email.toLowerCase().includes(searchLower) ||
      `cmd ${cmd.id_commande}`.toLowerCase().includes(searchLower) ||
      String(cmd.id_commande).includes(searchLower) ||
      `cmd${cmd.id_commande}`.includes(searchLower) ||
      `cmd ${cmd.id_commande}`.includes(searchLower)

    // filtre par plage de prix
    const cmdTotal = Number(cmd.total)
    const matchesMinPrice = minPrice === "" || cmdTotal >= Number(minPrice)
    const matchesMaxPrice = maxPrice === "" || cmdTotal <= Number(maxPrice)

    // filtre par date
    let matchesDate = true
    const cmdDateStr = new Date(cmd.createdAt).toLocaleDateString("fr-CA")

    if (startDate) {
      matchesDate = matchesDate && cmdDateStr >= startDate
    }
    if (endDate) {
      matchesDate = matchesDate && cmdDateStr <= endDate
    }

    return (
      matchesStatut &&
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesDate
    )
  })

  useEffect(() => {
    setLocalCommandes(commandes)
  }, [commandes])

  //Transformation des lignes
  const rows = filteredCommandes.map((cmd) => {
    const totalItems =
      cmd.items?.reduce((acc, item) => acc + item.quantite, 0) ?? 0
    const dateFormatee = new Date(cmd.createdAt).toLocaleDateString("fr-FR")

    return [
      `CMD${cmd.id_commande}`,
      cmd.user.name,
      cmd.user.email,
      totalItems,
      Number(cmd.total).toFixed(2),
      dateFormatee,
      cmd.statut,
    ]
  })

  const csvHeaders = [
    "N° Commande",
    "Nom Client",
    "Email Client",
    "Nombre d'articles",
    "Total TTC (€)",
    "Date de Commande",
    "Statut",
  ]

  const mapCommandeToCsvRow = (cmd: any) => {
    // Sécurité pour le calcul des articles
    const totalItems =
      cmd?.items?.reduce(
        (acc: number, item: any) => acc + (item?.quantite || 0),
        0
      ) ?? 0

    const dateFormatee = cmd?.createdAt
      ? new Date(cmd.createdAt).toLocaleDateString("fr-FR")
      : "-"

    // infos du client
    const clientName = cmd?.user?.name || "Client Inconnu"
    const clientEmail = cmd?.user?.email || "-"
    const totalTtc = cmd?.total ? Number(cmd.total).toFixed(2) : "0.00"
    const idCommande = cmd?.id_commande || ""

    return [
      `CMD${idCommande}`,
      clientName.replace(/;/g, " "),
      clientEmail.replace(/;/g, " "),
      totalItems,
      totalTtc,
      dateFormatee,
      cmd?.statut || "-",
    ]
  }

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "EN_ATTENTE":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "CONFIRMEE":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "NEGOCIEE":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "LIVREE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "ANNULEE":
        return "bg-rose-50 text-rose-700 border-rose-200"
      default:
        return "bg-gray-50 text-gray-700 border-agray-200"
    }
  }

  const handleReset = () => {
    setStartDate("")
    setEndDate("")
    setMinPrice("")
    setMaxPrice("")
  }

  const handleExport = () => {
    // On vérifie directement sur filteredCommandes (qui utilise déjà localCommandes)
    if (!filteredCommandes || filteredCommandes.length === 0) {
      alert("Aucune donnée à exporter avec les filtres actuels.")
      return
    }

    // On génère les lignes du tableau
    const rows = filteredCommandes.map((cmd) => {
      const totalItems =
        cmd?.items?.reduce(
          (acc: number, item: any) => acc + (item?.quantite || 0),
          0
        ) ?? 0
      const dateFormatee = cmd?.createdAt
        ? new Date(cmd.createdAt).toLocaleDateString("fr-FR")
        : "-"
      return [
        `CMD${cmd?.id_commande || ""}`,
        (cmd?.user?.name || "Client Inconnu").replace(/;/g, " "),
        (cmd?.user?.email || "-").replace(/;/g, " "),
        totalItems,
        cmd?.total ? Number(cmd.total).toFixed(2) : "0.00",
        dateFormatee,
        cmd?.statut || "-",
      ]
    })

    const csvContent = [
      COMMANDE_CSV_HEADERS.join(";"),
      ...rows.map((row: any[]) => row.join(";")),
    ].join("\n")

    //  CE BLOC REFAIT À NEUF POUR FORCER LE TÉLÉCHARGEMENT DIRECT :
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    // On force l'attribut download de manière très stricte
    link.setAttribute(
      "download",
      `export_commandes_${new Date().toLocaleDateString("fr-CA")}.csv`
    )

    // On l'ajoute obligatoirement au document pour simuler un vrai clic physique
    link.style.display = "none"
    document.body.appendChild(link)

    // Déclenchement du téléchargement
    link.click()

    // Nettoyage complet
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Voulez-vous supprimer cette commande ?")
    if (!confirmDelete) return

    const token = localStorage.getItem("token")
    if (!token) return

    try {
      await deleteCommande(id, token)

      // 🔥 update UI immédiate
      setLocalCommandes((prev) => prev.filter((cmd) => cmd.id_commande !== id))

      alert("Commande supprimée avec succès")
    } catch (error) {
      console.error(error)
      alert("Erreur suppression commande")
    }
  }

  return (
    <div className="w-full space-y-6 font-text relative">
      <FilterTabs
        tabs={STATUTS}
        activeTab={statutSelectionne}
        onChange={setStatutSelectionne}
      />

      <DataTableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onFilterClick={() => setIsFilterOpen(true)}
        onExportClick={handleExport}
      />

      {/* STRUCTURE DU TABLEAU CORRIGÉE ICI */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 border-b border-gray-100 text-gray-700 text-sm font-bold tracking-wider uppercase">
                <th className="p-5"> N° COMMANDE</th>
                <th className="p-5">CLIENT</th>
                <th className="p-5">PRODUIT</th>
                <th className="p-5">TOTAL TTC</th>
                <th className="p-5">DATE COMMANDE</th>
                <th className="p-5">STATUS</th>
                <th className="p-5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredCommandes.map((cmd) => {
                const totalItems =
                  cmd.items?.reduce((acc, item) => acc + item.quantite, 0) ?? 0

                return (
                  <tr
                    key={cmd.id_commande}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-5 font-bold text-gray-900">
                      CMD{cmd.id_commande}
                    </td>

                    <td className="p-5 flex flex-col">
                      <span className="text-gray-800 font-text text-sm">
                        {cmd.user.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {cmd.user.email}
                      </span>
                    </td>

                    <td className="p-5">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-blue-500 text-xs font-semibold">
                        {totalItems} article{totalItems > 1 ? "s" : ""}
                      </span>
                    </td>

                    <td className="p-5 font-bold text-gray-900">
                      {Number(cmd.total).toFixed(2)} €
                    </td>

                    <td className="p-5 text-gray-500">
                      {new Date(cmd.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="p-5">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getStatutColor(
                          cmd.statut
                        )}`}
                      >
                        {cmd.statut}
                      </span>
                    </td>

                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            router.push(
                              `/dashboard/commandes/${cmd.id_commande}`
                            )
                          }
                        >
                          <AiOutlineEye />
                        </button>

                        <button
                          onClick={() => handleDelete(cmd.id_commande)}
                          className="p-2 rounded-full bg-orange-100 hover:bg-red-200 transition"
                        >
                          <MdDeleteForever size={20} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {filteredCommandes.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-gray-400">
                    Aucune commande ne correspond à vos critères de recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* LE VOLET LATÉRAL (DRAWER) */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 border-l border-gray-100 ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900">Filtres avancés</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-50 text-gray-400"
          >
            <IoMdClose size={18} />
          </button>
        </div>
        <div className="p-6">
          <FilterContent
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            handleReset={handleReset}
            onApply={() => setIsFilterOpen(false)}
          ></FilterContent>
        </div>
      </div>
    </div>
  )
}

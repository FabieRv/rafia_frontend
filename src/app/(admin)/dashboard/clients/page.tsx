"use client"

import {
  getClients,
  deleteClient,
  updateClient,
} from "@/services/clientService"
import { useEffect, useState } from "react"
import { CiEdit } from "react-icons/ci"
import { MdDeleteForever } from "react-icons/md"
import { Client } from "@/types/global"
import DataTableToolbar from "../_pages/DataTableToolbar"
import EditModal from "./EditModal"
import { getTokenFromLocalStorage } from "@/utils/getToken"

function ClientTable() {
  const [clients, setClients] = useState<Client[]>([])
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const [search, setSearch] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 5

  // FETCH
  useEffect(() => {
    getClients().then(setClients).catch(console.error)
  }, [])

  // RESET PAGE si filtre change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, dateFilter])

  // FILTER
  const filteredClients = clients.filter((client) => {
    const searchLower = search.toLowerCase()

    const matchesSearch =
      client.name.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.phone.toLowerCase().includes(searchLower)

    const clientDate = new Date(client.createdAt).toISOString().split("T")[0]

    const matchesDate = dateFilter === "" || clientDate === dateFilter

    return matchesSearch && matchesDate
  })

  // PAGINATION SAFE
  const totalPages = Math.max(
    1,
    Math.ceil(filteredClients.length / itemPerPage)
  )

  const safeCurrentPage = Math.min(currentPage, totalPages)

  const indexOfLast = safeCurrentPage * itemPerPage
  const indexOfFirst = indexOfLast - itemPerPage

  const paginatedClients = filteredClients.slice(indexOfFirst, indexOfLast)

  // DELETE
  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Supprimer ${name} ?`)) return

    try {
      const token = getTokenFromLocalStorage()
      await deleteClient(id, token)
      setClients((prev) => prev.filter((c) => c.id_user !== id))
    } catch (err) {
      console.error(err)
    }
  }

  // EDIT
  const handleEditClick = (client: Client) => {
    setEditingClient({ ...client })
  }

  // UPDATE
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingClient) return

    try {
      const token = getTokenFromLocalStorage()
      const payload = {
        name: editingClient.name,
        email: editingClient.email,
        phone: editingClient.phone,
        adress: editingClient.adress,
      };
      
      await updateClient(editingClient.id_user, payload, token);

      setClients((prev) =>
        prev.map((c) =>
          c.id_user === editingClient.id_user ? editingClient : c
        )
      )

      setEditingClient(null)
    } catch (err) {
      console.log("-------ERROR-------"+err)
      alert("Erreur update")
    }
  }

  const handleExport = () => {
    if (!filteredClients || filteredClients.length === 0) {
      alert("Aucun client à exporter avec les filtres actuels.")
      return
    }

    const rows = filteredClients.map((client) => {
      const dateFormatee = client.createdAt
        ? new Date(client.createdAt).toLocaleDateString("fr-FR")
        : "-"

      return [
        client.id_user,
        client.name || "Client Inconnu",
        (client.email || "-").replace(/;/g, " "),
        (client.phone || "-").replace(/;/g, " "),
        (client.adress || "-").replace(/;/g, " "),
        dateFormatee,
      ]
    })

    const csvHeaders = [
      "ID Client",
      "Nom",
      "Email",
      "Téléphone",
      "Adresse",
      "Date inscription",
    ]

    const csvContent = [
      csvHeaders.join(";"),
      ...rows.map((row) => row.join(";")),
    ].join("\n")

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.setAttribute(
      "download",
      `export_clients_${new Date().toLocaleDateString("fr-CA")}.csv`
    )

    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      {/* TOOLBAR */}
      <DataTableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="Rechercher client..."
        onFilterClick={() => setIsFilterOpen(true)}
        onExportClick={handleExport}
      />

      {/* MODAL EDIT */}
      {editingClient && (
        <EditModal
          editingClient={editingClient}
          setEditingClient={setEditingClient}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      )}

      {/* TABLE */}
      <div className="relative overflow-x-auto bg-white shadow-lg rounded-lg m-5 ">
        <table className="w-full text-left text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm border-b border-gray-200">
            <tr>
              <th className="p-4">Nom</th>
              <th className="p-4 hidden md:table-cell">Email</th>
              <th className="p-4 hidden sm:table-cell">Téléphone</th>
              <th className="p-4 hidden lg:table-cell">Adresse</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedClients.length > 0 ? (
              paginatedClients.map((client) => (
                <tr key={client.id_user} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{client.name}</td>

                  <td className="p-4 hidden md:table-cell">{client.email}</td>

                  <td className="p-4 hidden sm:table-cell">{client.phone}</td>

                  <td className="p-4 hidden lg:table-cell">{client.adress}</td>

                  <td className="p-4">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <CiEdit
                        size={20}
                        className="text-blue-600 cursor-pointer"
                        onClick={() => handleEditClick(client)}
                      />
                      <MdDeleteForever
                        size={20}
                        className="text-red-500 cursor-pointer"
                        onClick={() =>
                          handleDelete(client.id_user, client.name)
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  Aucun client ne correspond à vos critères de recherche.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between p-4 ">
          <p>
            Page {safeCurrentPage} / {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={safeCurrentPage === 1}
            >
              Prev
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={safeCurrentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* FILTER MODAL */}
      {isFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
            onClick={() => setIsFilterOpen(false)}
          />

          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 p-6">
            <h2 className="font-bold mb-4">Filtre clients</h2>

            <label>Date inscription</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full border p-2 mt-2"
            />

            <button
              onClick={() => setDateFilter("")}
              className="w-full mt-4 bg-gray-200 p-2"
            >
              Réinitialiser
            </button>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full mt-2 bg-blue-600 text-white p-2"
            >
              Appliquer
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ClientTable

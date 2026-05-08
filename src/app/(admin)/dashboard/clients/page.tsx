"use client"

import {
  getClients,
  deleteClient,
  updateClient,
} from "@/services/clientService"
import { useEffect, useState } from "react"
import { CiEdit } from "react-icons/ci"
import { MdDeleteForever, MdClose } from "react-icons/md"
import { Client } from "@/types/global"
import Button from "@/components/common/Button"

function ClientTable() {
  const [clients, setClients] = useState<Client[]>([])
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  // --- LOGIQUE PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 5 // Tu peux changer ce nombre
  const indexOfLast = currentPage * itemPerPage
  const indexOfFirst = indexOfLast - itemPerPage

  // On découpe la liste originale pour n'afficher que les clients de la page actuelle
  const currentClients = clients.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(clients.length / itemPerPage)

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Supprimer le client ${name} ?`)) {
      try {
        await deleteClient(id)
        setClients((prev) => prev.filter((c: any) => c.id_user !== id))
        // Ajustement si on supprime le dernier élément d'une page
        if (currentClients.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1)
        }
      } catch (error) {
        console.error("Erreur:", error)
        alert("Impossible de supprimer le client.")
      }
    }
  }

  const handleEditClick = (client: Client) => {
    setEditingClient({ ...client })
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingClient) return
    try {
      await updateClient(editingClient.id_user, editingClient)
      setClients((prev) =>
        prev.map((c) =>
          c.id_user === editingClient.id_user ? editingClient : c
        )
      )
      setEditingClient(null)
    } catch (error) {
      alert("Erreur lors de la mise à jour")
    }
  }

  useEffect(() => {
    getClients().then(setClients).catch(console.error)
  }, [])

  return (
    <div>
      {editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-8 pb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Modifier le client
              </h2>
              <button
                onClick={() => setEditingClient(null)}
                className="text-gray-400"
              >
                <MdClose size={28} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Nom complet
                </label>
                <input
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-300 outline-none bg-gray-50/50 transition-all text-gray-700 shadow-sm"
                  value={editingClient.name}
                  onChange={(e) =>
                    setEditingClient({ ...editingClient, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Adresse Email
                </label>
                <input
                  type="email"
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-300 outline-none bg-gray-50/50 transition-all text-gray-700 shadow-sm"
                  value={editingClient.email}
                  onChange={(e) =>
                    setEditingClient({
                      ...editingClient,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-50 flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Téléphone
                  </label>
                  <input
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-300 outline-none bg-gray-50/50 transition-all text-gray-700 shadow-sm"
                    value={editingClient.phone}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex-1 min-w-50 flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Adresse
                  </label>
                  <input
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-300 outline-none bg-gray-50/50 transition-all text-gray-700 shadow-sm"
                    value={editingClient.adress}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        adress: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-4 border-t border-gray-100">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Date d'inscription
                </label>
                <input
                  type="date"
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-300 outline-none bg-white transition-all text-gray-600 font-medium cursor-pointer"
                  value={
                    new Date(editingClient.createdAt)
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) =>
                    setEditingClient({
                      ...editingClient,
                      createdAt: new Date(e.target.value).toISOString(),
                    })
                  }
                />
              </div>

              <div className="pt-8 w-full flex justify-center">
                <Button
                  label=" Enregistrer le profil client"
                  className="rounded-xl w-full max-w-lg text-[18px] uppercase"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TABLE ORIGINALE AVEC PAGINATION --- */}
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-lg rounded-lg m-5 md:m-10 border border-gray-200">
        <table className="w-full text-lg text-left rtl:text-right text-body">
          <thead className="bg-gray-200 text-xl font-extrabold border-b border-gray-300">
            <tr>
              <th className="px-6 py-3 font-medium">Nom complet</th>
              <th className="px-6 py-3 font-medium hidden md:table-cell">
                Email
              </th>
              <th className="px-6 py-3 font-medium hidden sm:table-cell">
                Téléphone
              </th>
              <th className="px-6 py-3 font-medium hidden lg:table-cell">
                Adresse
              </th>
              <th className="px-6 py-3 font-medium">Inscription</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="font-text text-[16px]">
            {currentClients.map((client: any) => (
              <tr
                key={client.id_user}
                className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap font-bold text-[16px]">
                  {client.name}
                  {/* Email visible sur mobile uniquement */}
                  <div className="text-[12px] font-normal text-gray-400 md:hidden">
                    {client.email}
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  {client.email}
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  {client.phone}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  {client.adress}
                </td>
                <td className="px-6 py-4">
                  {new Date(client.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-6 md:gap-10">
                    <CiEdit
                      size={25}
                      className="text-blue-600 cursor-pointer"
                      onClick={() => handleEditClick(client)}
                    />
                    <MdDeleteForever
                      size={25}
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(client.id_user, client.name)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- CONTRÔLES DE PAGINATION --- */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 font-text">
            Affichage de{" "}
            <span className="font-semibold text-gray-700">
              {clients.length > 0 ? indexOfFirst + 1 : 0}
            </span>{" "}
            à{" "}
            <span className="font-semibold text-gray-700">
              {Math.min(indexOfLast, clients.length)}
            </span>{" "}
            sur{" "}
            <span className="font-semibold text-gray-700">
              {clients.length}
            </span>{" "}
            clients
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-all text-sm font-medium"
            >
              {" "}
              {"<"}
            </button>

            <div className="hidden sm:flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n)}
                  className={`w-10 h-10 rounded-lg border transition-all text-sm font-bold ${
                    currentPage === n
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 hover:border-blue-400"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-all text-sm font-medium"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientTable

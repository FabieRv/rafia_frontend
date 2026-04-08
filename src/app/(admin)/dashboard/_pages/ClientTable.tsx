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

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Supprimer le client ${name} ?`)) {
      try {
        await deleteClient(id)
        setClients((prev) => prev.filter((c: any) => c.id_user !== id))
      } catch (error) {
        console.error("Erreur:", error)
        alert("Impossible de supprimer le client.")
      }
    }
  }

  // --- NOUVELLE LOGIQUE MODALE ---
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
      setEditingClient(null) // Ferme la modale
    } catch (error) {
      alert("Erreur lors de la mise à jour")
    }
  }

  useEffect(() => {
    getClients().then(setClients).catch(console.error)
  }, [])

  return (
    <div>
      {/* --- MODALE D'ÉDITION --- */}

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
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-300 focus:border-transparent outline-none bg-gray-50/50 transition-all text-gray-700 shadow-sm"
                  value={editingClient.name}
                  onChange={(e) =>
                    setEditingClient({ ...editingClient, name: e.target.value })
                  }
                  placeholder="Ex: Jean Dupont"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Adresse Email
                </label>
                <input
                  type="email"
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-300 focus:border-transparent outline-none bg-gray-50/50 transition-all text-gray-700 shadow-sm"
                  value={editingClient.email}
                  onChange={(e) =>
                    setEditingClient({
                      ...editingClient,
                      email: e.target.value,
                    })
                  }
                  placeholder="client@domaine.com"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-50 flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Téléphone
                  </label>
                  <input
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-300 focus:border-transparent outline-none bg-gray-50/50 transition-all text-gray-700 shadow-sm"
                    value={editingClient.phone}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        phone: e.target.value,
                      })
                    }
                    placeholder="034 XX XXX XX"
                  />
                </div>

                <div className="flex-1 min-w-50flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Adresse
                  </label>
                  <input
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-300
                     focus:border-transparent outline-none bg-gray-50/50 transition-all text-gray-700 shadow-sm"
                    value={editingClient.adress}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        adress: e.target.value,
                      })
                    }
                    placeholder="Lot IV ..."
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

              {/* Bouton de validation */}
              <div className="pt-6 w-full flex justify-center">
                <div className="pt-8 w-full flex justify-center">
                  <Button
                    label=" Enregistrer le profil client"
                    className="rounded-xl w-full max-w-lg text-[18px] uppercase"
                    type="submit"
                  ></Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* --- TA TABLE ORIGINALE --- */}
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-lg rounded-lg m-10 ">
        <table className="w-full text-lg text-left rtl:text-right text-body ">
          <thead className="bg-gray-200 text-xl font-extrabold border-b border-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Nom complet
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Email
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Téléphone
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Adresse
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Date d'insciption
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Mouvement
              </th>
            </tr>
          </thead>
          <tbody className="font-text text-[16px]">
            {clients.map((client: any) => (
              <tr
                key={client.id_user}
                className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default "
              >
                <td className="px-6 py-4 whitespace-nowrap font-bold text-[16px]">
                  {client.name}
                </td>
                <td className="px-6 py-4 ">{client.email}</td>
                <td className="px-6 py-4 ">{client.phone}</td>
                <td className="px-6 py-4 ">{client.adress}</td>
                <td className="px-6 py-4 ">
                  {new Date(client.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex flex-wrap gap-10">
                  <CiEdit
                    size={25}
                    className="text-blue-600 cursor-pointer"
                    onClick={() => handleEditClick(client)} // Appel de la modale
                  />
                  <MdDeleteForever
                    size={25}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(client.id_user, client.name)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ClientTable

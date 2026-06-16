import { MdClose } from "react-icons/md"
import Button from "@/components/common/Button"
import { Client } from "@/types/global"

type Props = {
  editingClient: Client
  setEditingClient: (client: Client | null) => void
  handleUpdateSubmit: (e: React.FormEvent) => void
}

function EditModal({
  editingClient,
  setEditingClient,
  handleUpdateSubmit,
}: Props) {
  return (
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
          {/* NAME */}
          <input
            className="w-full p-4 border rounded-xl"
            value={editingClient.name}
            onChange={(e) =>
              setEditingClient({
                ...editingClient,
                name: e.target.value,
              })
            }
          />

          {/* EMAIL */}
          <input
            className="w-full p-4 border rounded-xl"
            value={editingClient.email}
            onChange={(e) =>
              setEditingClient({
                ...editingClient,
                email: e.target.value,
              })
            }
          />

          {/* PHONE */}
          <input
            className="w-full p-4 border rounded-xl"
            value={editingClient.phone}
            onChange={(e) =>
              setEditingClient({
                ...editingClient,
                phone: e.target.value,
              })
            }
          />

          {/* ADDRESS */}
          <input
            className="w-full p-4 border rounded-xl"
            value={editingClient.adress}
            onChange={(e) =>
              setEditingClient({
                ...editingClient,
                adress: e.target.value,
              })
            }
          />

          {/* DATE */}
          <input
            type="date"
            className="w-full p-4 border rounded-xl"
            value={
              new Date(editingClient.createdAt).toISOString().split("T")[0]
            }
            onChange={(e) =>
              setEditingClient({
                ...editingClient,
                createdAt: new Date(e.target.value).toISOString(),
              })
            }
          />

          <Button label="Enregistrer" type="submit" className="w-full" />
        </form>
      </div>
    </div>
  )
}

export default EditModal

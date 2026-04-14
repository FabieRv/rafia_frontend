export async function getClients() {
  const res = await fetch("http://localhost:3001/clients")

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des Clients")
  }
  return res.json()
}

const API_URL = "http://localhost:3001/clients"
export const deleteClient = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) throw new Error("Erreur lors de la suppression")
  return response.json()
}

export const updateClient = async (id: number, data: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour du client")
  }

  return response.json()
}

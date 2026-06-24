const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/clients`

export async function getClients() {
  const res = await fetch(API_URL)

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des Clients")
  }
  return res.json()
}

export const deleteClient = async (id: number, token: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Erreur lors de la suppression")
  }
  if (response.status === 204) {
    return { success: true }
  }
  const text = await response.text()
  return text ? JSON.parse(text) : { success: true }
}

export const updateClient = async (id: number, data: any, token: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour du client")
  }

  return response.json()
}

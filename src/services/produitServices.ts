import { ProductCardProps } from "@/types/global"

const API_URL = "http://localhost:3001"

// GET PRODUIT
export async function getProduits() {
  const res = await fetch(`${API_URL}/products/public-models`)
  if (!res.ok) throw new Error("Erreur chargement")
  return res.json()
}

export async function addProduit(data: any, token: string) {
  try {
    const res = await fetch(`${API_URL}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || "Erreur lors de la création")
    }

    return await res.json()
  } catch (error) {
    console.error("Erreur service addProduit:", error)
    throw error // Crucial pour que le Modal arrête le loading
  }
}

// UPDATE
export async function updateProduit(
  id: number,
  data: ProductCardProps,
  token: string
) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

// DELETE
export async function deleteProduit(id: number, token: string) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.json()
}

import { ProductCardProps } from "@/types/global"

const API_URL = "http://localhost:3001"

//GET PRODUIT
export async function getProduits() {
  const res = await fetch(`${API_URL}/products/public-models`)
  if (!res.ok) throw new Error("Erreur chargement")
  return res.json()
}

export async function createProduit(data: ProductCardProps, token: string) {
  const res = await fetch(`${API_URL}/products/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return res.json()
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

//  DELETE
export async function deleteProduit(id: number, token: string) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.json()
}

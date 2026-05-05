import { ProductCardProps } from "@/types/global"

// GET PRODUIT
export async function getProduits() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/public-models`
  )
  if (!res.ok) throw new Error("Erreur chargement des produits")
  return res.json()
}

export async function addProduit(data: any, token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/add`, {
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
  }
}

// UPDATE
export async function updateProduit(
  id: number,
  data: ProductCardProps,
  token: string
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URLL}/products/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return res.json()
}

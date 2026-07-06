import { Product, ProductCardProps } from "@/types/global"

// GET PRODUIT
export async function getProduits() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/public-models`
  )
  if (!res.ok) throw new Error("Erreur chargement des produits")
  return res.json()
}

//GET PRODUCT BY ID
export async function getProductById(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
  if (!res.ok) throw new Error("Erreur chargement des produits")
  const data = await res.json()
  const product: Product = data
  return product
}

// UPDATE

export async function addProduit(data: Record<string, any>, token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await res.json().catch(() => null)

    if (!res.ok) {
      throw new Error(
        result?.message || "Erreur lors de la création du produit"
      )
    }

    return result
  } catch (error: any) {
    console.error("Erreur service addProduit:", error?.message || error)
    throw error
  }
}

export async function updateProduit(id: number, data: any, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "Erreur update")
  }
  return res.json()
}

// DELETE
export async function deleteProduit(id: number, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log("STATUS DELETE :", res.status)
  if (!res.ok) {
    const text = await res.text()
    console.error("ERREUR BACKEND :", text)
    throw new Error(text || "Erreur suppression")
  }
  if (res.status === 204) return null

  return res.json()
}

import { ProductCard } from "@/app/(user)/model/modelrafia/ProductCard"
export const getProduits = async () => {
  try {
    const response = await fetch("http://localhost:3000/products/public-models")

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des produits")
    }
    return await response.json()
  } catch (error) {
    console.error("Erreur service getProduits:", error)
    throw error
  }
}

export const addProduit = async (ProductData: any, token: string) => {
  const tokenDeTest =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NzczNzkxNDAsImV4cCI6MTc3NzU1MTk0MH0.HIz2w-kL_q8ppjEXULltkX61wYbvgj_QWBkSiPbZYWc"
  const response = await fetch("http://localhost:3001/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenDeTest}`,
    },
    body: JSON.stringify(ProductData),
  })

  if (!response.ok) {
    const errorDetail = await response.json().catch(() => ({}))
    console.error("Détail du refus serveur:", errorDetail)
    throw new Error(errorDetail.message || "Erreur lors de l'ajout")
  }

  return response.json()
}

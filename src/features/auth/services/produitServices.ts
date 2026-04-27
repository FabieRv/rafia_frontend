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
  console.log("-------------start add product ka---------------------")
  console.log("TOKEN:", token);
  const response = await fetch("http://localhost:3001/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(ProductData),
  })

  console.log("-------------add product ka---------------------")
  if (!response.ok) throw new Error("Error lors de l'ajout")
  return response.json()
}

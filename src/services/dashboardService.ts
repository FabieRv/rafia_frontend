export async function getTotalClients(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/count`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  console.log(response)

  if (!response.ok) {
    throw new Error("Erreur lors du chargement")
  }

  return response.json()
}

export async function getTotalProduct(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/count`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!response.ok) {
    throw new Error("Erreur chargement produits")
  }
  return response.json()
}

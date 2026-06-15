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


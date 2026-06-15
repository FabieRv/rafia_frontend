export async function getCommandeById(id: number, token: string) {
  const res = await fetch(`http://localhost:3001/admin/commandes/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error("Erreur chargement commande")

  return res.json()
}

export async function updateCommandeStatus(
  id: number,
  status: string,
  token: string
) {
  const res = await fetch(
    `http://localhost:3001/admin/commandes/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  )

  if (!res.ok) throw new Error("Erreur update status commande")

  return res.json()
}

export async function getTotalCommandes(token: string) {
  const res = await fetch("http://localhost:3001/admin/commandes/count", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  console.log("STATUS:", res.status)

  const text = await res.text()
  console.log("RESPONSE:", text)

  if (!res.ok) {
    throw new Error("Erreur count commandes")
  }

  return JSON.parse(text)
}

export async function deleteCommande(id: number, token: string) {
  const res = await fetch(`http://localhost:3001/admin/commandes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    console.log("DELETE ERROR:", data)
    throw new Error("Erreur suppression commande")
  }

  return data
}

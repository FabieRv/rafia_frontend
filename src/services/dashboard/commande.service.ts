export async function getCommandeById(id: number, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/commandes/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) throw new Error("Erreur chargement commande")

  return res.json()
}

// export async function updateCommandeStatus(
//   id: number,
//   status: string,
//   token: string
// ) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/admin/commandes/${id}/status`,
//     {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ status }),
//     }
//   )
//   const text = await res.text()

//   console.log("STATUS CODE:", res.status)
//   console.log("RESPONSE RAW:", text)

//   if (!res.ok) {
//     throw new Error(text)
//   }

//   return JSON.parse(text)
// }
export async function updateCommandeStatus(
  id: number,
  status: string,
  token: string
) {
  console.log("------------status--------------" + status)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/commandes/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //body: JSON.stringify({ status: "CONFIRMEE" }),
      body: JSON.stringify({ status: status }),
    }
  )

  const text = await res.text()

  let data: any = {}

  try {
    data = JSON.parse(text)
  } catch {
    data = { message: text }
  }

  if (!res.ok) {
    throw new Error(
      data?.message || data?.error || "Transition de statut interdite"
    )
  }

  return data
}

export async function getTotalCommandes(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/commandes/count`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  console.log("STATUS:", res.status)

  const text = await res.text()
  console.log("RESPONSE:", text)

  if (!res.ok) {
    throw new Error("Erreur count commandes")
  }

  return JSON.parse(text)
}

export async function deleteCommande(id: number, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/commandes/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    console.log("DELETE ERROR:", data)
    throw new Error("Erreur suppression commande")
  }

  return data
}

// Exemple à ajouter dans @/services/dashboard/commande.service.ts
export async function getTotalVentes(token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/commandes/totalventes`

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })
  const text = await res.text()
  return text
}

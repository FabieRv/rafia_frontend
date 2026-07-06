import axios from "axios"
import { getClients } from "./clientService"

export async function getMessages(userId: number, token: string) {
  console.log("----------tafiditra ve--------------")
  const url = `${process.env.NEXT_PUBLIC_API_URL}/chat/conversations/${userId}`

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.json()
}

export const openConversation = async (token: string) => {
  const userSessionString = localStorage.getItem("user") || ""

  if (userSessionString === "") {
    alert("Vous devez vous connecter, svp!")
    return
  }

  // 2. Convertir la chaîne JSON en objet JavaScript exploitable
  const currentUser = JSON.parse(userSessionString)

  // 3. Récupérer la liste des clients
  const users = await getClients()

  // 4. Utiliser .find() au lieu de .filter() pour obtenir l'objet de l'utilisateur directement
  const matchedUser = users.find(
    (user: any) => user.email === currentUser.email
  )

  if (!matchedUser) {
    alert("Utilisateur introuvable dans la base de données.")
    return
  }
  console.log("-----MATCHEDUSER-----" + JSON.stringify(matchedUser))
  // 5. Vous avez maintenant le senderId correct (un nombre ou une string selon votre BDD)
  const senderId = matchedUser.id_user // ou matchedUser.id selon votre modèle User
  console.log("Sender ID trouvé :", senderId)
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/chat/messages/${senderId}/1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return res.data
}

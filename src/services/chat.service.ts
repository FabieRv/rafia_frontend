export async function getMessages(role: string, userId: number, token: string) {
  console.log("----------tafiditra ve--------------")
  const url =
    role === "ADMIN"
      ? `${process.env.NEXT_PUBLIC_API_URL}/chat/admin/conversations`
      : `${process.env.NEXT_PUBLIC_API_URL}/chat/conversations/${userId}`

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.json()
}

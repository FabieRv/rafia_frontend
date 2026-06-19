import { API_URL } from "@/config/api"

export async function getActivityLogs(token: string) {
  const res = await fetch(`${API_URL}/activity-log`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!res.ok) throw new Error("Erreur fetch activity logs")

  return res.json()
}

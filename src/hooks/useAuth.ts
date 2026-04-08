"use client"
import { useState, useEffect } from "react"
import { UserProps } from "@/types/global"

export function useAuth() {
  const [user, setUser] = useState<UserProps | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  return { user }
}

"use client"

import { loginUser } from "../services/auth.service"

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    const res = await loginUser({ email, password })

    localStorage.setItem("token", res.access_token)

    return res
  }

  return { login }
}

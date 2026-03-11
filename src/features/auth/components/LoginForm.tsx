"use client"

import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

export default function LoginForm() {
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submit = async (e: any) => {
    e.preventDefault()

    await login(email, password)

    alert("Login success")
  }

  return (
    <>
    </>
  )
}

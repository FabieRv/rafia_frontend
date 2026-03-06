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
    <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-4"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-blue-500 text-white w-full p-2 rounded">
        Login
      </button>
    </form>
  )
}

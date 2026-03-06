"use client"

import { useState } from "react"
import { forgotPassword } from "../services/auth.service"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")

  const submit = async (e: any) => {
    e.preventDefault()

    await forgotPassword(email)

    alert("Check your email")
  }

  return (
    <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-xl mb-4">Forgot password</h2>

      <input
        placeholder="Email"
        className="border p-2 w-full mb-4"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="bg-purple-500 text-white w-full p-2 rounded">
        Send reset link
      </button>
    </form>
  )
}

"use client"

import { useState } from "react"
import { registerUser } from "../services/auth.service"

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    adress: "",
    password: "",
  })
  const submit = async (e: any) => {
    e.preventDefault()

    await registerUser(form) 

    alert("User created")
  }
  return (
    <div>
      <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {Object.keys(form).map((field) => (
          <input
            key={field}
            placeholder={field}
            className="border p-2 w-full mb-3"
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}

        <button className="bg-green-500 text-white w-full p-2 rounded">
          Register
        </button>
      </form>
    </div>
  )
}

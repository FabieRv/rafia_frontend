"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/app/(admin)/dashboard/_pages/Sidebar"
import { Header } from "./dashboard/_pages/Header"
import { UserProps } from "@/types/global"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null)

  useEffect(() => {
    // On récupère l'objet complet "user" (nom, rôle, etc.)
    const data = localStorage.getItem("user")
    if (data) {
      try {
        setCurrentUser(JSON.parse(data))
      } catch (error) {
        console.error("Erreur de lecture du profil :", error)
      }
    }
  }, [])

  return (
    <div className="flex bg-[#f6f6f9] min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <Header user={currentUser} />
        {children}
      </main>
    </div>
  )
}

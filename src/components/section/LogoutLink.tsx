"use client"

import { useRouter } from "next/navigation"

const LogoutLink = () => {
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem("token")
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    router.push("/")
  }

  return (
    <button
      onClick={logout}
      className="w-full text-left block px-4 py-2.5 text-lg text-red-600 font-text hover:bg-[#e67e22] hover:text-white rounded-lg"
    >
      Se déconnecter
    </button>
  )
}

export default LogoutLink

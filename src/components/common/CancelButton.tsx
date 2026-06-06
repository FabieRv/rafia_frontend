"use client"

import { useRouter } from "next/navigation"

type CancelButtonProps = {
  label?: string
  redirectTo?: string
}

export default function CancelButton({
  label = "Annuler",
  redirectTo = "/model",
}: CancelButtonProps) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(redirectTo)}
      className="px-6 py-3 border border-gray-500 text-gray-400 font-medium hover:bg-gray-100 transition rounded-full"
    >
      {label}
    </button>
  )
}

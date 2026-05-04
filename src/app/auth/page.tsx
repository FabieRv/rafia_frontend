"use client"
import LoginForm from "@/features/auth/components/LoginForm"
import RegisterForm from "@/features/auth/components/RegisterForm"
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm"
import { useState } from "react"
import { useSearchParams } from "next/navigation"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const viewParam = searchParams.get("view")

  const [view, setView] = useState<"login" | "register" | "forgot">(
    (viewParam as any) || "login"
  )

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/bg-images.png')" }}
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 w-full max-w-110 mx-4 backdrop-blur-xl  bg-black/30  border border-white/10 rounded-3xl p-10 text-white shadow-2xl">
        {view === "login" && (
          <LoginForm
            onSwitch={() => setView("register")}
            onForgotPassword={() => setView("forgot")}
          />
        )}

        {view === "register" && (
          <RegisterForm onSwitch={() => setView("login")} />
        )}

        {view === "forgot" && (
          <ForgotPasswordForm onBack={() => setView("login")} />
        )}
      </div>
    </div>
  )
}

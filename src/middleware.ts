import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const role = request.cookies.get("userRole")?.value
  const { pathname } = request.nextUrl

  console.log(`--- MIDDLEWARE CHECK ---`)
  console.log(`Cible: ${pathname}`)
  console.log(`Rôle détecté: ${role}`)
  console.log(`Token présent: ${!!token}`)

  //page auth
  const isAuthPage = pathname.startsWith("/auth")

  //page admin

  if (pathname.startsWith("/dashboard")) {
    if (!token || role !== "ADMIN") {
      console.log("❌ ACCÈS REFUSÉ : Redirection vers /")
      return NextResponse.redirect(new URL("/", request.url))
    }
    console.log("✅ ACCÈS DASHBOARD AUTORISÉ")
  }

  if ((pathname === "/" || pathname === "/auth") && token && role === "ADMIN") {
    console.log("➡️ ADMIN DÉJÀ CONNECTÉ : Redirection vers /dashboard")
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  //page catalogue
  if (pathname.startsWith("/catalogue")) {
    if (!token) {
      console.log("ACCÈS CATALOGUE REFUSÉ")
      return NextResponse.redirect(new URL("/auth", request.url))
    }
    console.log("acces catalogue autorisé")
  }

  //page commande
  if (pathname.startsWith("/commande")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/catalogue",
    "/catalogue/:path*",
    "/commande/:path*",
    "/auth",
    "/commande",
  ],
}

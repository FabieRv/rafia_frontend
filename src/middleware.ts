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

  const isAuthPage = pathname.startsWith("/auth")

  if (pathname.startsWith("/dashboard")) {
    if (!token || role !== "ADMIN") {
      console.log("❌ ACCÈS REFUSÉ : Redirection vers /")
      return NextResponse.redirect(new URL("/", request.url))
    }
    console.log("✅ ACCÈS DASHBOARD AUTORISÉ")
  }

  if ((pathname === '/' || pathname === '/auth') && token && role === 'ADMIN') {
    console.log("➡️ ADMIN DÉJÀ CONNECTÉ : Redirection vers /dashboard")
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/catalogue"],
}

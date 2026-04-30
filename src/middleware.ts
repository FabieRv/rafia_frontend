import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl

  const isAuthPage = pathname.startsWith("/auth")
  console.log("TOKEN-------------------" + token)
  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  if (token) {
    //&& isAuthPage
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  //matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/dashboard", "/dashboard/:path*", "/catalogue"],
}

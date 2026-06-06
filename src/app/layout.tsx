// src/app/layout.tsx
import { Playfair_Display, Montserrat } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-montserrat",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#FCA5A5",
              color: "#fff",
              fontWeight: "500",
            },
          }}
        />
      </body>
    </html>
  )
}

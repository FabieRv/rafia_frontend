import { Playfair_Display, Montserrat } from "next/font/google"
import "./globals.css"
import Header from "@/components/ui/Header"
import Search from "@/components/ui/Search"

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
        <Header />
        <Search />
        {children}
      </body>
    </html>
  )
}

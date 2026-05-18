import Footer from "@/components/ui/Footer"
import Header from "@/components/ui/Header"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

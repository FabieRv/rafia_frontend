import Footer from "@/components/ui/Footer"
import AboutExpertise from "./_pages/AboutExpertise"
import AboutUs from "./_pages/AboutUs"
import HomePage from "./_pages/HomePage"
import ContactForm from "./contact/ContactForm"

export default function Home() {
  return (
    <main>
      <HomePage />
      <AboutExpertise />
      <AboutUs />
      <ContactForm />
      <Footer />
    </main>
  )
}

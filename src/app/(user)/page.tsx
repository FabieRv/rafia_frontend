import Footer from "@/components/ui/Footer"
import AboutExpertise from "./_pages/AboutExpertise"
import AboutUs from "./_pages/AboutUs"
import HomePage from "./_pages/HomePage"

import ContactForm from "./contact/ContactForm"
import TopProduits from "./_pages/TopProduct"
import Testimonial from "./_pages/Testimonial"

export default function Home() {
  return (
    <main>
      <HomePage />
      <AboutExpertise />
      <TopProduits />
      <AboutUs />
      <Testimonial />
      <ContactForm />
      <Footer />
    </main>
  )
}

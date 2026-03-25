"use client"

import Button from "@/components/common/Button"
import Container from "@/components/common/Container"
import { Mail, MessageCircle } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa6"

function ContactForm() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-16">
          <div className="flex-1">
            <div className="  flex flex-col items-center">
              <h1 className="text-2xl lg:text-4xl font-bold font-title text-gray-900">
                Êtes-vous intéressé ?
              </h1>
              <p className="font-text text-gray-600 text-lg mt-2">
                Vous avez une question ou besoin d’assistance concernant votre
                commande ?
              </p>
              <p className="font-text mb-8 text-gray-600 text-lg">
                Notre équipe est à votre écoute et prête à vous aider.
              </p>
            </div>

            <div className="font-text space-y-2 mb-14 flex flex-col items-center">
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sky-600  font-medium cursor-pointer hover:text-sky-700 transition">
                  <MessageCircle size={20} />
                  <span>Démarrer un chat en direct</span>
                </li>
                <li className="flex items-center gap-3 text-sky-600  font-medium cursor-pointer hover:text-sky-700 transition">
                  <FaWhatsapp size={20} />
                  <span>Contactez-nous sur WhatsApp</span>
                </li>
                <li className="flex items-center gap-3 text-sky-600  font-medium cursor-pointer hover:text-sky-700 transition">
                  <Mail size={20} />
                  <span>Envoyez-nous un email</span>
                </li>
              </ul>
            </div>

            <form
              action=""
              className="grid grid-cols-1 md:grid-cols-2 gap-4 font-text"
            >
              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700">Nom</label>
                <input
                  type="text"
                  placeholder="Votre nom complet"
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#fac748] focus:ring-2 focus:ring-[#fac748] transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700">Prénom</label>
                <input
                  type="text"
                  placeholder="Votre prénom"
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#fac748] focus:ring-2 focus:ring-[#fac748] transition-all"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-bold text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#fac748] focus:ring-2 focus:ring-[#fac748] transition-all"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-bold text-gray-700">Contact</label>
                <input
                  type="text"
                  placeholder="034 ......."
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#fac748] focus:ring-2 focus:ring-[#fac748] transition-all"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-bold text-gray-700">Message</label>
                <textarea
                  rows={4}
                  placeholder="Décrivez votre projet ou posez votre question ici..."
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#fac748] focus:ring-2 focus:ring-[#fac748] transition-all resize-none"
                ></textarea>
              </div>
              <div className="md:col-span-2 pt-2">
                <Button
                  label="Envoyer le message"
                  className="w-full md:w-auto px-8"
                />
              </div>
            </form>
          </div>

          <div className="flex-1 min-h-[400px] lg:min-h-full rounded-2xl overflow-hidden shadow-inner border border-gray-100">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "500px" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15093.224151740925!2d47.5218705!3d-18.8791902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07df59099c08d%3A0xc489d8ccf9850550!2sAntananarivo!5e0!3m2!1sfr!2smg!4v1711111111111!5m2!1sfr!2smg"
            ></iframe>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ContactForm

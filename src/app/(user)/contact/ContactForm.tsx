"use client"

import Button from "@/components/common/Button"
import Container from "@/components/common/Container"
import { Mail, MessageCircle } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa6"

function ContactForm() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="flex justify-center mb-12">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-title text-3xl md:text-4xl font-bold text-[#4A3728] ">
              Contactez-nous
            </h1>
            <p className="font-text text-gray-600 text-lg mt-4">
              Nous sommes à votre entière disposition pour vous guider dans vos
              choix ou assurer le suivi de vos acquisitions.
            </p>
          </div>
        </div>
        <div className="flex flex-col p-0! md:p-10 lg:p-20 lg:flex-row justify-between items-stretch gap-16">
          <div className="flex-1">
            <div className="  flex flex-col items-center">
              <p className="text-xl lg:text-2xl font-bold font-title text-gray-900">
                Besoin d'un conseil ?
              </p>

              <p className="font-text mb-8 text-gray-600 text-lg">
                Notre équipe est à votre écoute et prête à vous aider.
              </p>
            </div>

            <div className="font-text space-y-2 mb-14 flex flex-col items-center">
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sky-600  font-medium cursor-pointer hover:text-sky-700 transition">
                  <a
                    href="http://localhost:3000/chat"
                    className="flex items-center gap-3"
                  >
                    <MessageCircle size={20} />
                    <span>Démarrer un chat en direct</span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sky-600 font-medium cursor-pointer hover:text-sky-700 transition">
                  <a
                    href="https://wa.me/0320497005"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <FaWhatsapp size={20} />
                    <span>Contactez-nous sur WhatsApp</span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sky-600 font-medium cursor-pointer hover:text-sky-700 transition">
                  <a
                    href="mailto:fabie.rav@gmail.com"
                    className="flex items-center gap-3"
                  >
                    <Mail size={20} />
                    <span>Envoyez-nous un email</span>
                  </a>
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
              src="https://maps.google.com/maps?q=-18.804237953700415, 47.59173749501723&z=17&output=embed"
            ></iframe>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ContactForm

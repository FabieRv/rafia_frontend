"use client"

import CartItem from "@/components/common/CartItem"
import Container from "@/components/common/Container"


// Composant pour l'item du panier

export default function Panier() {
  return (
    <Container>
      <div className="min-h-screen bg-[#f0f7ff] p-10 font-sans">
        <h1 className="text-3xl font-bold mb-8 text-[#1a1a1a]">
          (Nombre) Item in Cart
        </h1>

        <div className="flex flex-col lg:flex-row items-start gap-8 max-w-7xl mx-auto">
          {/* Produits (Scrollable) */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="max-h-125 overflow-y-auto custom-scrollbar">
              {/* Remplacez par vos data.map */}
              <CartItem
                nom="Lorem ipsum dolor sit amet consectetur, adipisicing elit"
                vendeur="Shure"
                prix={349}
                quantite={2}
                image="/mic-shure.png"
              />
              <CartItem
                nom="Lorem ipsum dolor sit amet consectetur, adipisicing elit"
                vendeur="AmazonBasics"
                prix={12.99}
                quantite={2}
                image="/mic-amazon.png"
              />
            </div>
          </div>

          {/* Card Total (Bloquée / Sticky) */}
          <div className="w-[350px] sticky top-10">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-4 pb-4 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Amount before Tax:</span>
                  <span className="font-semibold text-gray-800">$</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Units:</span>
                  <span className="text-green-600 font-bold">
                    Nombre (Units)
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>TAX:</span>
                  <span className="font-semibold text-gray-800">$</span>
                </div>
              </div>

              <div className="py-6 flex justify-between items-baseline">
                <span className="text-2xl font-bold text-[#1a1a1a]">
                  Total price:
                </span>
                <span className="text-3xl font-black text-[#1a1a1a]">$</span>
              </div>

              <div className="space-y-3">
                <button className="w-full border-2  py-2 rounded-full font-semibold   transition-colors">
                  Continue
                </button>
                <button className="w-full border border-gray-300 py-2 rounded-full font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  Back to shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

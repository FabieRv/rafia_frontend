import Container from "@/components/common/Container"
import Search from "@/components/icons/Search"

const categories = ["Tous", "Chapeaux", "Paniers", "Boîtes", "Pochettes"]

export default function ModelNav() {
  return (
    <Container className="py-0! px-0! font-text">
      <div className="sticky top-0 z-10 bg-[white/50] backdrop-blur-md border-b border-gray-100 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 order-2 md:order-1">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-6 py-2 rounded-full text-xl font-medium transition-all
                bg-[#FEE0BD]  hover:bg-[#E67E22] hover:text-white
                "
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 2. LA BARRE DE RECHERCHE (Look moderne de droite) */}
          <div className="relative w-full max-w-md order-1 md:order-2">
            <input
              type="text"
              placeholder="Rechercher une création..."
              className="w-full pl-12 pr-4 py-3 bg-[#F8F8F8] border-none rounded-2xl 
                         focus:ring-2 focus:ring-[#E67E22]/30 outline-none 
                         transition-all text-gray-700 placeholder:text-gray-400 text-xl"
            />
            <Search />
          </div>
        </div>
      </div>
    </Container>
  )
}

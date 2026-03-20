import { IoMdSearch } from "react-icons/io"
import { FiChevronDown } from "react-icons/fi"
import Container from "../common/Container"

function Search() {
  return (
    // On utilise ta variable de couleur de fond secondaire
    <div className="bg-secondary font-text py-3">
      <Container className="py-0!">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* --- BLOC RECHERCHE --- */}
          {/* Le fond reste blanc pour que l'input soit lisible comme sur l'image */}
          <div className="relative flex items-center bg-white rounded-full px-5 py-2 w-full max-w-md shadow-sm">
            {/* Sélecteur de catégorie (Le style de l'image) */}
            <div className="flex items-center gap-2 border-r border-gray-200 pr-4 mr-4 cursor-pointer shrink-0 group">
              <span className="text-[13px] font-bold text-gray-700 group-hover:text-black">
                All Categories
              </span>
              <FiChevronDown size={14} className="text-gray-500" />
            </div>

            {/* Input de recherche */}
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />

            {/* Bouton Loupe */}
            <button className="ml-2 text-gray-800 hover:text-secondary transition-colors">
              <IoMdSearch size={22} />
            </button>
          </div>

          {/* --- BLOC AVANTAGES (DROITE) --- */}
          {/* On garde tes textes personnalisés et ta couleur blanche pour le contraste */}
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-6 lg:gap-12 text-white">
            <div className="flex flex-col items-start leading-tight">
              <p className="text-[11px] font-bold uppercase tracking-wide">
                Produit authentique
              </p>
            </div>

            <div className="flex flex-col items-start leading-tight border-l border-white/20 pl-6 lg:pl-12">
              <p className="text-[11px] font-bold uppercase tracking-wide">
                30 Days Money Back
              </p>
            </div>

            <div className="flex flex-col items-start leading-tight border-l border-white/20 pl-6 lg:pl-12">
              <p className="text-[11px] font-bold uppercase tracking-wide">
                100% Malagasy
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Search

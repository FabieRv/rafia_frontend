import { IoMdSearch } from "react-icons/io"
import { FiChevronDown } from "react-icons/fi"
import Container from "../common/Container"

function Recherche() {
  return (
    <div className="bg-secondary  py-3 rounded-xl ">
      <Container className="py-0! font-text">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="relative flex items-center bg-white rounded-full px-5 py-2 w-full max-w-md shadow-sm">
            <div className="flex items-center gap-2 border-r border-gray-200 pr-4 mr-4 cursor-pointer shrink-0 group">
              <span className="text-[13px] font-bold text-gray-700 group-hover:text-black">
                All Categories
              </span>
              <FiChevronDown size={14} className="text-gray-500" />
            </div>

            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
            <button className="ml-2 text-gray-800 hover:text-secondary transition-colors">
              <IoMdSearch size={22} />
            </button>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-6 lg:gap-12 text-white">
            <div className="flex flex-col items-start leading-tight">
              <p className="text-[11px] font-bold uppercase tracking-wide">
                Produit authentique
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

export default Recherche

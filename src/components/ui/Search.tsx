import { IoMdSearch } from "react-icons/io"
import Container from "../common/Container"
import Input from "./Input"

function Search() {
  return (
    <Container className="py-4! bg-secondary">
      <div className="flex flex-row justify-between gap-10">
        <div>
          <div className="flex flex-wrap bg-primary">
            <Input
              className="rounded-3xl"
              placeholder="recherche un categorie"
            ></Input>
            <button>
              {" "}
              <IoMdSearch size={20} />
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-10 ">
          <div>
            <p>Produit authentique</p>
          </div>
          <div>
            <p>100% Malagasy</p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Search

import { LucideIcon } from "lucide-react"

export interface Category {
  id_categorie: number
  nom_categorie: string
  description?: string
  type?: {
    id_type: number
    nom_type: string
  }
}

export interface ProductCardProps {
  product: {
    id_produit: number
    nom_produit: string
    description?: string
    prix?: string | number
    oldPrice?: string | number
    quantite_stock?: number
    image?: string
    sous_category?: {
      nom_sous_categorie?: string
      category?: Category
    }
  }
}

export interface NavItem {
  title: string
  icon: LucideIcon
  href: string
  badge?: number
}

export interface AccordionItemType {
  id: number
  title: string
  imageUrl: string
}

export interface AccordionItemProps {
  item: AccordionItemType
  isActive: boolean
  onMouseEnter: () => void
}

export interface UserProps {
  id_user?: number
  name?: string
  email?: string
  role?: string
}

export interface Client {
  id_user: number
  name: string
  email: string
  phone: string
  adress: string
  createdAt: string
}

export interface User {
  name: string
  email: string
  role?: string
  image?: string
}
export interface Product {
  id_produit: number
  nom_produit: string
  description?: string
  prix?: number | string
  quantite_stock?: number
  image?: string

  sous_category?: {
    nom_sous_categorie?: string
    category?: {
      nom_categorie?: string
      type?: {
        nom_type?: string
      }
    }
  }

  type?: string
  categorie?: string
  id_sous_categorie?: number
}

//-----------commande---------------------
export interface ProductTableProps {
  product: Product[]
}

export interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (product: any) => void
  productToEdit?: any
}

export interface Image {
  src: string
  alt?: string
}

export interface CommandeItem {
  id_commandeItem: number
  quantite: number
  prix: number
  product: Product
}

//commande props

export interface Commande {
  id_commande: number
  total: number
  statut: "EN_ATTENTE" | "CONFIRMEE" | "NEGOCIEE" | "LIVREE" | "ANNULEE"
  statut_livraison: "EN_PREPARATION" | "EN_COURS" | "LIVREE" | "ANNULEE"
  adresse_livraison: string
  ville: string
  region: string
  createdAt: string
  produits: number[]
  user: User

  items: CommandeItem[]
}

export interface CommandesTableProps {
  commandes: Commande[]
  onStatusChange: (id: number, newStatus: string) => void | Promise<void>
}

export interface CartState {
  items: CommandeItem[]
  addItem: (item: CommandeItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, qty: number) => void
  clear: () => void
}

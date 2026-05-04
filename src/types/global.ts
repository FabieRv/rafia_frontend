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
  image?: string
}

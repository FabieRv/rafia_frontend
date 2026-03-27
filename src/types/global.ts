import { LucideIcon } from "lucide-react"

export interface ProductCardProps {
  product: {
    id_produit: number
    nom_produit: string
    description?: string
    prix?: string | number
    oldPrice?: string | number
    discount?: string
    rating?: number
    image?: string
    sous_category?: {
      nom_sous_categorie?: string
      category?: {
        nom_categorie?: string
      }
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

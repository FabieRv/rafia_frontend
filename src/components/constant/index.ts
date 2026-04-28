import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  BarChart3,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
} from "lucide-react"
import { NavItem } from "@/types/global"

export const ADMIN_MENU_ITEMS: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Clients", icon: Users, href: "/dashboard/clients" },
  { title: "Commandes", icon: ShoppingBag, href: "/dashboard/commandes" },
  { title: "Produits", icon: PlusCircle, href: "/dashboard/products" },
  { title: "Ventes", icon: PlusCircle, href: "/admin/sales" },
  { title: "Analytiques", icon: BarChart3, href: "/admin/analytics" },
  {
    title: "Messages",
    icon: MessageSquare,
    href: "/admin/messages",
    badge: 26,
  },

  { title: "Paramètres", icon: Settings, href: "/admin/settings" },

  { title: "Logout", icon: User, href: "admin/logout" },
]

export const ROUTE_TITLES: Record<string, string> = {
  "/dashboard/clients": "Gestion des Clients",
  "/dashboard/products": "Gestion des Produits",
  "/dashboard/commandes": "Gestion des Commandes",
  "/dashboard/ventes": "Gestion des Ventes",
  "/dashboard/messages": "Messagerie",
  "/dashboard/parametres": "Configuration",
  "/dashboard": "Dashboard",
}

//image dans Aboutus
export const ACCORDION_ITEMS = [
  {
    id: 1,
    title: "VANNERIE",
    imageUrl: "/img/tableau-2.jpg",
  },
  {
    id: 2,
    title: "Matière en SATRANA",
    imageUrl: "/img/satrana.jpg",
  },
  {
    id: 3,
    title: "Sculpture RABANE",
    imageUrl: "/img/Rabane.jpg",
  },
  {
    id: 4,
    title: "Tissage RAFIA",
    imageUrl: "/img/sac-crocher.jpg",
  },
  {
    id: 5,
    title: "Savoir-faire",
    imageUrl: "/img/savoir-faire.png",
  },
]

export const SUB_CATEGORIES_DATA = {
  Chapeaux: ["Capeline", "Bob"],
  Panier: [
    "Satrana",
    "2 tons",
    "Ananas",
    "Arc",
    "Barea",
    "Chat double",
    "Rayure",
    "Marienière",
    "Olive",
    "Rectangle",
  ],
  Boite: ["Brush", "Flowers", "Box floor", "Storage"],
  Pochette: ["Etoil", "Sac Dame"],
}

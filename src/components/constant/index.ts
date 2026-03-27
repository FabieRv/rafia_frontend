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
  { title: "Clients", icon: Users, href: "/admin/customers" },
  { title: "Commandes", icon: ShoppingBag, href: "/admin/orders" },
  { title: "Produits", icon: PlusCircle, href: "/admin/products" },
  { title: "Ventes", icon: PlusCircle, href: "/admin/products" },
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

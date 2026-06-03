import { CommandItem, State } from "@/types/global"
import { create } from "zustand"
import { persist } from "zustand/middleware"

const STORAGE_KEY = "commande-storage"

export const useCommandeStore = create<State>()(
  persist(
    (set) => ({
      items: [] as CommandItem[],

      addItem: (item) =>
        set((state) => {
          const exist = state.items.find(
            (p) => p.id_produit === item.id_produit
          )

          if (exist) {
            return {
              items: state.items.map((p) =>
                p.id_produit === item.id_produit
                  ? {
                      ...p,
                      quantite: p.quantite + item.quantite,
                    }
                  : p
              ),
            }
          }

          return { items: [...state.items, item] }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((p) => p.id_produit !== id),
        })),

      updateQuantity: (id, qty) =>
        set((state) => ({
          items: state.items.map((p) =>
            p.id_produit === id ? { ...p, quantite: qty } : p
          ),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: "cart-storage" }
  )
)

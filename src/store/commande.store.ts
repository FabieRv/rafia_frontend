import { CommandItem } from "@/types/global"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface CommandeState {
  items: CommandItem[]

  addItem: (item: CommandItem) => void
  removeItem: (id_produit: number) => void
  updateQuantity: (id_produit: number, quantite: number) => void
  clearOrder: () => void

  getTotal: () => number
  incrementQuantity: (id_produit: number) => void
  decrementQuantity: (id_produit: number) => void
}

export const usecommandeStore = create<CommandeState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const exists = state.items.find(
            (i) => i.id_produit === item.id_produit
          )

          if (exists) {
            return {
              items: state.items.map((i) =>
                i.id_produit === item.id_produit
                  ? { ...i, quantite: i.quantite + item.quantite }
                  : i
              ),
            }
          }

          return { items: [...state.items, item] }
        }),

      removeItem: (id_produit) =>
        set((state) => ({
          items: state.items.filter((i) => i.id_produit !== id_produit),
        })),

      updateQuantity: (id_produit, quantite) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id_produit === id_produit ? { ...i, quantite } : i
          ),
        })),

      clearOrder: () => set({ items: [] }),

      getTotal: () =>
        get().items.reduce(
          (total, item) => total + item.prix * item.quantite,
          0
        ),
      incrementQuantity: (id_produit: number) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id_produit === id_produit ? { ...i, quantite: i.quantite + 1 } : i
          ),
        })),

      decrementQuantity: (id_produit: number) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id_produit === id_produit
              ? { ...i, quantite: Math.max(1, i.quantite - 1) }
              : i
          ),
        })),
    }),
    {
      name: "commande-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

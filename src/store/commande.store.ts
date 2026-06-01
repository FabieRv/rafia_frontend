import { CommandItem } from "@/types/global"

const STORAGE_KEY = "commande-storage"

export const getItems = (): CommandItem[] => {
  if (typeof window === "undefined") return []

  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const saveItems = (items: CommandItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const addItem = (item: CommandItem) => {
  const items = getItems()

  const exists = items.find((i) => i.id_produit === item.id_produit)

  if (exists) {
    const updated = items.map((i) =>
      i.id_produit === item.id_produit
        ? { ...i, quantite: i.quantite + item.quantite }
        : i
    )

    saveItems(updated)
    return
  }

  saveItems([...items, item])
}

export const removeItem = (id_produit: number) => {
  const items = getItems()

  saveItems(items.filter((i) => i.id_produit !== id_produit))
}

export const updateQuantity = (id_produit: number, quantite: number) => {
  const items = getItems()

  saveItems(
    items.map((i) => (i.id_produit === id_produit ? { ...i, quantite } : i))
  )
}

export const incrementQuantity = (id_produit: number) => {
  const items = getItems()

  saveItems(
    items.map((i) =>
      i.id_produit === id_produit ? { ...i, quantite: i.quantite + 1 } : i
    )
  )
}

export const decrementQuantity = (id_produit: number) => {
  const items = getItems()

  saveItems(
    items.map((i) =>
      i.id_produit === id_produit
        ? { ...i, quantite: Math.max(1, i.quantite - 1) }
        : i
    )
  )
}

export const clearOrder = () => {
  localStorage.removeItem(STORAGE_KEY)
}

export const getTotal = () => {
  if (typeof window === "undefined") return 0

  try {
    const raw = localStorage.getItem("commande-storage")

    if (!raw) return 0

    const data = JSON.parse(raw)

    const items = Array.isArray(data)
      ? data
      : data?.state?.items ?? []

    return items.reduce(
      (total: number, item: any) =>
        total + item.prix * item.quantite,
      0
    )
  } catch (e) {
    return 0
  }
}

export const STATUTS = [
  "Tous",
  "En attente",
  "Confirmée",
  "Négociée",
  "Livrée",
  "Annulée",
] as const

export type StatutCommande = (typeof STATUTS)[number]

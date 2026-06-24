export function getCategoryId(category: string): number | null {
  const categories: Record<string, number> = {
    chapeaux: 1,
    panier: 2,
    boite: 3,
    pochette: 4,
  }

  return categories[category.toLowerCase()] ?? null
}

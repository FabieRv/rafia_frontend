export const getCleanImageUrl = (path?: string) => {
  if (!path) {
    return "https://placehold.co/400x300?text=Pas+d'image"
  }

  if (path.startsWith("http")) {
    return path
  }

  const fileName = path.split(/[/\\]/).pop()

  return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${fileName}`
}

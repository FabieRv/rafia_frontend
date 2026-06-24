export const downloadPdf = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/catalogue/download/${id}`
    )

    if (!response.ok) {
      throw new Error("Erreur téléchargement")
    }

    const blob = await response.blob()

    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url

    a.download = "catalogue.pdf"

    document.body.appendChild(a)
    a.click()

    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.log(error)
  }
}

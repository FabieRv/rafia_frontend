"use client"
import React from "react"

type ExportButtonProps = {
  data: any[]
  headers: string[]
  mappingFunction: (item: any) => (string | number)[]
  fileNamePrefix?: string
  children: React.ReactNode
}

export default function ExportButton({
  data,
  headers,
  mappingFunction,
  fileNamePrefix = "export",
  children,
}: ExportButtonProps) {
  const handleExport = () => {
    // 1. Vérification des données
    if (!data || data.length === 0) {
      alert("Aucune donnée à exporter avec les filtres actuels.")
      return
    }

    // 2. Headers (utilise ceux passés en props)
    // const headers = [...] ❌ NE PAS redéfinir ici

    // 3. Transformation des données
    const rows = data.map(mappingFunction)

    // 4. CSV content
    const csvContent = [
      headers.join(";"),
      ...rows.map((row) => row.join(";")),
    ].join("\n")

    // 5. Blob CSV
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    })

    // 6. Download
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url

    const dateStr = new Date().toISOString().split("T")[0]
    link.setAttribute("download", `export_${dateStr}.csv`)

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  // On retourne un span cliquable ou un fragment qui englobe ton bouton
  return (
    <span onClick={handleExport} className="inline-block cursor-pointer">
      {children}
    </span>
  )
}

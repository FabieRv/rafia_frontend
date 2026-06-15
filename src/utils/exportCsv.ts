export function exportToCsv(
  headers: string[],
  rows: (string | number)[][],
  fileName: string
) {
  const csvContent = [headers.join(";"), ...rows.map((r) => r.join(";"))].join(
    "\n"
  )

  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.download = `${fileName}.csv`

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

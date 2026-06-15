export function exportCSV(data: any[], headers: string[], filename: string) {
  const csvContent = [
    headers.join(";"),
    ...data.map((row) => row.join(";")),
  ].join("\n")

  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${filename}.csv`
  link.click()
}

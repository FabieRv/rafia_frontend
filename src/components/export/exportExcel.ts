import * as XLSX from "xlsx"

export function exportExcel(data: any[], headers: string[], filename: string) {
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data])
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, "Data")

  XLSX.writeFile(workbook, `${filename}.xlsx`)
}

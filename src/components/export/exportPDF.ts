import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export function exportPDF(data: any[], headers: string[], filename: string) {
  const doc = new jsPDF()

  autoTable(doc, {
    head: [headers],
    body: data,
  })

  doc.save(`${filename}.pdf`)
}

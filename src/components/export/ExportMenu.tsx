"use client"

import { useState } from "react"
import { exportCSV } from "./exportCSV"
import { exportPDF } from "./exportPDF"
import { exportExcel } from "./exportExcel"
import { CiImport } from "react-icons/ci"

type Props = {
  data: any[]
  headers: string[]
  mappingFunction: (item: any) => (string | number)[]
  fileNamePrefix?: string
}

export default function ExportMenu({
  data,
  headers,
  mappingFunction,
  fileNamePrefix = "export",
}: Props) {
  const [open, setOpen] = useState(false)

  const rows = data.map(mappingFunction)

  return (
    <div className="relative inline-block">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        <CiImport size={20} />
        Export ▼
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-lg w-40 z-50">
          <button
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => exportCSV(rows, headers, fileNamePrefix)}
          >
            CSV
          </button>

          <button
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => exportPDF(rows, headers, fileNamePrefix)}
          >
            PDF
          </button>

          <button
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => exportExcel(rows, headers, fileNamePrefix)}
          >
            Excel
          </button>
        </div>
      )}
    </div>
  )
}

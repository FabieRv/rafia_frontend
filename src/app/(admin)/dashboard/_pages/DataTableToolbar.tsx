"use client"

import { IoMdSearch } from "react-icons/io"
import { CiImport } from "react-icons/ci"
import Container from "@/components/common/Container"

type Props = {
  searchValue: string
  onSearchChange: (value: string) => void
  dateValue?: string
  onDateChange?: (value: string) => void
  onFilterClick?: () => void
  onExportClick?: () => void
  renderExport?: React.ReactNode
  placeholder?: string
}

export default function DataTableToolbar({
  searchValue,
  onSearchChange,
  onFilterClick,
  onExportClick,
  placeholder = "Recherche...",
}: Props) {
  return (
    <Container className="py-0!">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/3">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#fac748]"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
            <IoMdSearch size={20} />
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">
          {onFilterClick && (
            <button
              onClick={onFilterClick}
              className="flex items-center px-4  border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"
            >
              <span>⏳</span> Filtrer
            </button>
          )}

          {onExportClick && (
            <button
              type="button"
              onClick={onExportClick}
              className="flex items-center justify-center px-3 py-3 bg-blue-400 text-white rounded-xl hover:bg-blue-500 text-sm transition-colors"
            >
              <CiImport size={25} />
              Export
            </button>
          )}
        </div>
      </div>
    </Container>
  )
}

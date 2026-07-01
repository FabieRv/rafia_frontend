"use client"
import { useState } from "react"
import { downloadPdf } from "@/services/catalogueService"
import { FileDown, Loader2 } from "lucide-react"

function Catalogue() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      await downloadPdf(1)
    } catch (error) {
      console.error("Erreur lors du téléchargement", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex flex-col items-center py-10 bg-[#F9F6F2]">
      <div className="text-center mb-6">
        <h1 className=" text-[#4A3728] font-title">
          Notre catalogue d’artisanat
        </h1>
        <p className="text-sm text-gray-500">Format PDF - 12MB</p>
      </div>

      <button
        disabled={isDownloading}
        onClick={handleDownload}
        className={`
          flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all
          ${
            isDownloading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#D97A4F] hover:bg-[#C0663F] text-white shadow-lg hover:shadow-[#D97A4F]/30"
          }
        `}
      >
        {isDownloading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Préparation...
          </>
        ) : (
          <>
            <FileDown size={20} />
            Télécharger le Catalogue
          </>
        )}
      </button>
    </div>
  )
}

export default Catalogue

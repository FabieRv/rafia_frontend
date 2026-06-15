"use client"
import { useState, useEffect } from "react"

type FilterContentProps = {
  startDate: string
  setStartDate: (value: string) => void
  endDate: string
  setEndDate: (value: string) => void
  minPrice: string
  setMinPrice: (value: string) => void
  maxPrice: string
  setMaxPrice: (value: string) => void
  handleReset: () => void
  onApply: () => void
}

export default function FilterContent({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  handleReset,
  onApply,
}: FilterContentProps) {
  // État local pour savoir quel bouton radio est coché ("today" | "month" | "")
  const [dateType, setDateType] = useState<string>("")

  // Gère le clic sur un bouton radio
  const handleRadioChange = (type: string) => {
    setDateType(type)
    const now = new Date()
    const todayStr = now.toLocaleDateString("fr-CA") // YYYY-MM-DD

    if (type === "today") {
      setStartDate(todayStr)
      setEndDate(todayStr)
    } else if (type === "month") {
      const firstDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      ).toLocaleDateString("fr-CA")
      const lastDay = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).toLocaleDateString("fr-CA")
      setStartDate(firstDay)
      setEndDate(lastDay)
    }
  }

  // Intercepte les modifications manuelles des calendriers pour décocher les radios si besoin
  const handleCustomDateChange = (type: "start" | "end", value: string) => {
    setDateType("") // Décoche les boutons radios prédéfinis
    if (type === "start") setStartDate(value)
    if (type === "end") setEndDate(value)
  }

  // Synchronise le bouton "Réinitialiser" avec l'état local du radio
  const localReset = () => {
    setDateType("")
    handleReset()
  }

  return (
    <div className="h-[calc(100%-10px)] flex flex-col justify-between">
      {/* CORPS DU FILTRE ACCESSIBLE EN SCROLL */}
      <div className="space-y-6 flex-1 overflow-y-auto pr-1">
        {/* PAR DATE / PÉRIODE */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Par Date / Période
          </h3>

          {/* OPTIONS RADIO (STYLE EXACT DE TON IMAGE) */}
          <div className="space-y-3 pl-1">
            <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-600 group">
              <input
                type="radio"
                name="datePeriod"
                checked={dateType === "today"}
                onChange={() => handleRadioChange("today")}
                className="w-4 h-4 text-gray-950 border-gray-300 focus:ring-0 accent-gray-950 cursor-pointer"
              />
              <span className="group-hover:text-gray-900 transition-colors">
                Aujourd'hui
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-600 group">
              <input
                type="radio"
                name="datePeriod"
                checked={dateType === "month"}
                onChange={() => handleRadioChange("month")}
                className="w-4 h-4 text-gray-950 border-gray-300 focus:ring-0 accent-gray-950 cursor-pointer"
              />
              <span className="group-hover:text-gray-900 transition-colors">
                Ce mois-ci
              </span>
            </label>
          </div>

          {/* SÉPARATEUR DISCRET VERS LES INPUTS CALENDRIER */}
          <div className="pt-2">
            <span className="text-[10px] font-medium text-gray-400 block mb-2">
              Ou choisir une date précise :
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                  Du
                </span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    handleCustomDateChange("start", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-gray-50/50 focus:outline-none focus:border-gray-900 focus:bg-white transition-all cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                  Au
                </span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) =>
                    handleCustomDateChange("end", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-gray-50/50 focus:outline-none focus:border-gray-900 focus:bg-white transition-all cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* PAR PLAGE DE PRIX TOTAL */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Par Plage de Prix total (€)
          </h3>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min (ex: 82.80)"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
            />
            <span className="text-gray-400 text-xs">à</span>
            <input
              type="number"
              placeholder="Max (ex: 172.80)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
            />
          </div>
        </div>
      </div>

      {/* BOUTONS ACTIONS FIXÉS EN BAS */}
      <div className="pt-4 border-t border-gray-50 bg-white flex gap-2 mt-auto">
        <button
          onClick={localReset}
          className="w-1/2 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Réinitialiser
        </button>
        <button
          onClick={onApply}
          className="w-1/2 py-2.5 bg-gray-950 text-white font-medium rounded-lg text-sm hover:bg-gray-900 transition-colors"
        >
          Appliquer
        </button>
      </div>
    </div>
  )
}

"use client"
import { useEffect, useState } from "react"
import { CiImport } from "react-icons/ci"
import { IoMdSearch } from "react-icons/io"

export default function CommandesDashboard() {
  const [commandes, setCommandes] = useState([])
  const [filter, setFilter] = useState("TOUS")

  useEffect(() => {
    fetch("http://localhost:3001/commandes")
      .then((res) => res.json())
      .then((data) => setCommandes(data))
  }, [])

  return (
    <div className="p-8  min-h-screen font-base">
      {" "}
      <div className="flex gap-4 mb-8">
        {["TOUS", "EN_ATTENTE", "CONFIRMEE", "LIVREE", "ANNULEE"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              filter === tab
                ? "bg-[#A8E6CF] text-[#2D3436]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/*Barre de recherche et actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Recherche par nom des commandes"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#fac748]"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
            <IoMdSearch size={20} />
          </span>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-lg text-gray-600 hover:bg-gray-50">
            <span>⏳</span> Filtrer
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-blue-400 text-white rounded-xl hover:bg-blue-500 text-lg transition-colors">
            <CiImport size={25} />
            Export
          </button>
        </div>
      </div>
      {/* 3. Le Tableau */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200  text-gray-900 uppercase text-sm border-b border-gray-200 font-bold">
            <tr className=" ">
              <th className="px-6 py-4 font-semibold">Clients</th>
              <th className="px-6 py-4 font-semibold">Produits</th>
              <th className="px-6 py-4 font-semibold">Total Prix</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="" alt="avatar" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">
                      ""
                    </div>
                    <div className="text-xs text-gray-400">""</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">""</td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                '' Ar
              </td>
              <td className="px-6 py-4 text-center">
                <span className="px-3 py-1 rounded border text-[10px] font-bold uppercase">
                  {/* On remplace les underscores par des espaces pour faire joli */}
                </span>
              </td>
              <td className="px-6 py-4 text-xs text-gray-500"></td>
              <td className="px-6 py-4 text-right">
                <button className="text-xs font-semibold text-gray-400 hover:text-gray-800 underline">
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

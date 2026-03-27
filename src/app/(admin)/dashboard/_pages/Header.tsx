"use client"
import { Sun, Moon, Search } from "lucide-react"
import Image from "next/image"

export const Header = () => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800">Dashboard</h1>
        <div className="mt-2 bg-white px-4 py-1.5 rounded-lg border border-gray-100 text-gray-400 text-sm inline-block">
          <input
            type="date"
            className="outline-none bg-transparent cursor-pointer"
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center bg-gray-200 rounded-xl p-1">
          <button className="p-1.5 rounded-lg bg-white text-indigo-600 shadow-sm">
            <Sun size={18} />
          </button>
          <button className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 transition-colors">
            <Moon size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-lg">
              Hey, <span className="font-bold">Fabienne</span>
            </p>
            <p className="text-sm text-gray-400 capitalize">Admin</p>
          </div>
          <div className="w-11 h-11 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
            <div className="w-full h-full bg-[#FC7A57] flex items-center justify-center text-white font-bold text-lg">
              F
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

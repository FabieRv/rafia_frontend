import React from "react"

export default function ChatWindow() {
  return (
    <div className="flex flex-col h-full border-l border-slate-100">
      {/* En-tête du Chat */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600">
            👤
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm md:text-base">
              utilisateur Sh
            </h2>
            <p className="text-xs text-emerald-500 font-medium">En ligne</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <button className="hover:text-slate-600 text-lg">📞</button>
          <button className="hover:text-slate-600 text-lg">⋮</button>
        </div>
      </div>

      {/* Zone des messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 flex flex-col justify-between">
        {/* Séparateur de date */}
        <div className="flex items-center justify-center my-4">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="px-3 text-xs bg-slate-200 text-slate-500 py-1 rounded-full mx-2">
            Aujourd'hui
          </span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {/* Bulle de message envoyé */}
        <div className="flex justify-end items-end gap-2 ml-auto max-w-[70%]">
          <div className="flex flex-col items-end">
            <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-2.5 rounded-2xl rounded-tr-none shadow-sm text-sm">
              salut
            </div>
            <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-0.5">
              19:34 <span className="text-emerald-500">✓</span>
            </span>
          </div>
          <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs text-slate-500">
            👤
          </div>
        </div>
      </div>

      {/* Barre de saisie de message */}
      <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
        <button className="text-slate-400 hover:text-slate-600 text-xl">
          📎
        </button>
        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            placeholder="Écrire un message..."
            className="w-full pl-4 pr-10 py-3 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button className="absolute right-3 text-xl hover:scale-110 transition">
            😊
          </button>
        </div>
        <button className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition shadow-sm">
          ➔
        </button>
      </div>
    </div>
  )
}

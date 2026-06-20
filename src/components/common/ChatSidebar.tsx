import React from "react"

interface Conversation {
  id: number
  name: string
  avatarColor: string
  initial: string
  lastMessage: string
  active: boolean
}

export default function ChatSidebar() {
  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Client1",
      avatarColor: "bg-orange-500",
      initial: "S",
      lastMessage: "Le prix est fixé à 20 000 Ariary. On se trouve à...",
      active: false,
    },
    {
      id: 2,
      name: "Client2",
      avatarColor: "bg-gradient-to-br from-orange-400 to-emerald-600",
      initial: "U",
      lastMessage: "Aucun message",
      active: true,
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto px-2 space-y-1">
      {conversations.map((chat) => (
        <div
          key={chat.id}
          className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition ${
            chat.active
              ? "bg-orange-50/60 border border-orange-100"
              : "hover:bg-slate-50"
          }`}
        >
          {/* Avatar avec indicateur en ligne */}
          <div className="relative">
            <div
              className={`w-12 h-12 rounded-full ${chat.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-sm`}
            >
              {chat.initial}
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          {/* Infos de la discussion */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-sm md:text-base">
              {chat.name}
            </h3>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              {chat.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

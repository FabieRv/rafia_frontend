import { useEffect, useState } from "react"
import { getMessages } from "@/services/chat.service"

interface ChatSidebarProps {
  conversations: any[]
  onSelect: (conv: any) => void
  selectedConvId?: number
  currentAdminId: number
}

export default function ChatSidebar({
  conversations,
  onSelect,
  selectedConvId,
  currentAdminId,
}: ChatSidebarProps) {
  return (
    <div className="flex-1 overflow-y-auto px-2 space-y-1">
      {conversations.map((chat) => {
        const client = chat.users?.find(
          (u: any) => u.id_user !== currentAdminId
        )
        const lastMsg = chat.messages?.[0]?.content || "Aucun message"
        const isSelected = selectedConvId === chat.id

        return (
          <div
            key={chat.id}
            onClick={() => onSelect(chat)}
            className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition ${
              isSelected
                ? "bg-orange-50/60 border border-orange-100"
                : "hover:bg-slate-50"
            }`}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                {client ? `U${client.id_user}` : "?"}
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 text-sm md:text-base">
                {client?.name || "Anonyme"}
              </h3>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                {lastMsg}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

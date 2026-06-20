"use client"
import { useState } from "react"

import ChatBoutton from "./ChatBoutton"
import { IoIosSend } from "react-icons/io"
import { BsPaperclip } from "react-icons/bs"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"

export default function ChatWindow() {
  const [message, setMessage] = useState("") // Gère le texte du message
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji)
  }

  return (
    <div className="flex flex-col h-full border-l border-slate-100">
      <div className="p-4 border-b border-slate-100 bg-white flex items-center justify-end">
        <ChatBoutton />
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
          <BsPaperclip size={25} />
        </button>
        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            placeholder="Écrire un message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full pl-4 pr-14 py-3 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="absolute right-4 text-xl hover:scale-110 transition z-10 cursor-pointer"
            type="button"
          >
            😊
          </button>

          {/* Boîte des emojis */}
          {showEmojiPicker && (
            <div className="absolute bottom-16 right-0 z-50 shadow-xl rounded-2xl overflow-hidden">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                searchDisabled={false}
                height={400}
                width={320}
              />
            </div>
          )}
        </div>
        <button className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition shadow-sm">
          <IoIosSend size={25} />
        </button>
      </div>
    </div>
  )
}

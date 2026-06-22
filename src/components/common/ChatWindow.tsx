"use client"

import { useState, useEffect, useRef } from "react"
import ChatBoutton from "./ChatBoutton"
import { IoIosSend } from "react-icons/io"
import { BsPaperclip } from "react-icons/bs"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"
import { Socket } from "socket.io-client"

interface ChatWindowProps {
  selectedConv: any | null
  socket: Socket | null
  currentUser: { id: number; role: string }
  token: string
}

export default function ChatWindow({
  selectedConv,
  socket,
  currentUser,
  token,
}: ChatWindowProps) {
  const [message, setMessage] = useState("")

  const [messagesList, setMessagesList] = useState<any[]>([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Récupération de l'historique des messages
  useEffect(() => {
    if (!selectedConv) return

    const fetchHistory = async () => {
      const otherUser = selectedConv.users.find(
        (user: any) => user.id_user !== String(currentUser.id)
      )
      if (!otherUser) return

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chat/messages/${currentUser.id}/${otherUser.id_user}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        const data = await res.json()
        setMessagesList(data)
      } catch (err) {
        console.error("Erreur lors de la récupération des messages", err)
      }
    }

    fetchHistory()
  }, [selectedConv, currentUser.id, token])

  // Écoute des nouveaux messages en temps réel
  useEffect(() => {
    if (!socket) return

    const handleNewMessage = (msg: any) => {
      if (selectedConv && msg.conversationId === selectedConv.id) {
        setMessagesList((prev) => [...prev, msg])
      }
    }

    socket.on("newMessage", handleNewMessage)
    return () => {
      socket.off("newMessage", handleNewMessage)
    }
  }, [socket, selectedConv])

  // Défilement automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesList])

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji)
  }

  // Envoi d'un message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !selectedConv || !socket) return

    const otherUser = selectedConv.users.find(
      (user: any) => String(user.id_user) !== String(currentUser.id)
    )

    socket.emit("sendMessage", {  
      senderId: currentUser.id,
      receiverId: otherUser.id_user,
      content: message.trim(),
    })

    setMessage("")
    setShowEmojiPicker(false)
  }

  if (!selectedConv) {
    return (
      <div className="flex flex-1 items-center justify-center bg-slate-50 text-slate-400">
        Sélectionnez une discussion pour commencer à communiquer
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full border-l border-slate-100">
      <div className="p-4 border-b border-slate-100 bg-white flex items-center justify-end">
        <ChatBoutton />
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 flex flex-col">
        <div className="flex items-center justify-center my-4">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="px-3 text-xs bg-slate-200 text-slate-500 py-1 rounded-full mx-2">
            Aujourd'hui
          </span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        <div className="space-y-4 flex-1 flex flex-col">
          {messagesList.map((msg) => {
            // Vérification : est-ce moi l'expéditeur (Sender) ?
            const isSender = String(msg.senderId) === String(currentUser.id)

            // Formatage de l'heure
            const messageTime = new Date(msg.createdAt).toLocaleTimeString(
              "fr-FR",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )

            const isRead = msg.isRead ?? false

            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 max-w-[70%] ${
                  isSender ? "ml-auto justify-end" : "mr-auto justify-start"
                }`}
              >
                {/* Emplacement de l'avatar du RECEIVER (à gauche) */}
                {!isSender && (
                  <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs text-slate-500 shadow-sm">
                    👤
                  </div>
                )}

                {/* Conteneur texte + heure : alignement inversé selon le rôle */}
                <div
                  className={`flex flex-col ${
                    isSender ? "items-end" : "items-start"
                  }`}
                >
                  {/* Différenciation de la couleur du message */}
                  <div
                    className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
                      isSender
                        ? "bg-linear-to-r from-pink-400 to-rose-400 text-white rounded-tr-none"
                        : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Heure et statut de lecture */}
                  <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-0.5">
                    {messageTime}
                    {isSender && (
                      <span
                        className={
                          isRead
                            ? "text-emerald-500 font-bold"
                            : "text-slate-400"
                        }
                      >
                        {isRead ? " ✓✓" : " ✓"}
                      </span>
                    )}
                  </span>
                </div>

                {/* Emplacement de l'avatar du SENDER (à droite) */}
                {isSender && (
                  <div className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-sm">
                    {currentUser.role === "ADMIN" ? "A" : "U"}
                  </div>
                )}
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-white border-t border-slate-100 flex items-center gap-3"
      >
        <button
          type="button"
          className="text-slate-400 hover:text-slate-600 text-xl"
        >
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
        <button
          type="submit"
          className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition shadow-sm"
        >
          <IoIosSend size={25} />
        </button>
      </form>
    </div>
  )
}

"use client"

import { openConversation } from "@/services/chat.service"
import { getTokenFromLocalStorage } from "@/utils/getToken"
import { useEffect, useState, useRef } from "react"
import { io, Socket } from "socket.io-client"

export default function IndependentClientChatPage() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConv, setSelectedConv] = useState<any | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [token, setToken] = useState<string>("")
  const [loading, setLoading] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const currentUser = {
    id: 2,
    role: "USER",
  }

  const adminId = 1

  //scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialisation du Chat
  useEffect(() => {
    const savedToken = getTokenFromLocalStorage() || ""
    setToken(savedToken)

    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL || "", {
      transports: ["websocket", "polling"],
    })
    setSocket(socketInstance)

    const initChat = async () => {
      try {
        if (savedToken) {
          //recuperer la discussion avec admin
          const data = await openConversation(savedToken)

          setConversations([data])
        }
      } catch (error) {
        console.error("Erreur d'initialisation du chat:", error)
      } finally {
        setLoading(false)
      }
    }

    initChat()

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  // Écoute des messages Socket.io
  useEffect(() => {
    if (!socket) return

    socket.on("newMessage", (message: any) => {
      setConversations((prevConvs) =>
        prevConvs.map((conv) =>
          conv.id === message.conversationId
            ? { ...conv, messages: [message, ...(conv.messages || [])] }
            : conv
        )
      )

      if (selectedConv && message.conversationId === selectedConv.id) {
        setMessages((prev) => [...prev, message])
      }
    })

    return () => {
      socket.off("newMessage")
    }
  }, [socket, selectedConv])

  const handleSelectAdminChat = (conv: any) => {
    setSelectedConv(conv)
    setMessages(conv.messages ? [...conv.messages] : [])
    if (socket) {
      socket.emit("joinConversation", String(conv.id))
    }
  }

  // Envoi d'un message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !socket || !selectedConv) return

    const messageData = {
      senderId: currentUser.id,
      receiverId: adminId,
      content: newMessage.trim(),
    }

    socket.emit("sendMessage", messageData)
    setNewMessage("")
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500 animate-pulse">
          Chargement de l'espace support...
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-[550px] max-w-5xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm my-6 overflow-hidden">
      <div className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col">
        <div className="p-4 bg-white border-b border-slate-100">
          <h1 className="text-xl font-bold text-slate-800">Mes Discussions</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((conv) => {
            const isSelected = selectedConv?.id === conv.id
            console.log("----message------" + JSON.stringify(conv.message))
            const lastMessage =
              conv.messages?.[conv.messages.length - 1]?.content ||
              "Aucun message pour le moment"
            console.log("----lastmessage------" + JSON.stringify(lastMessage))
            return (
              <div
                key={conv.id}
                onClick={() => handleSelectAdminChat(conv)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? "bg-emerald-50 border border-emerald-200"
                    : "bg-white hover:bg-slate-100 border border-transparent shadow-sm"
                }`}
              >
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                  AD
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-slate-900 truncate">
                    Administrateur Support
                  </h3>
                  <p className="text-xs text-slate-500 truncate">
                    {lastMessage}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. PARTIE DROITE : Fenêtre de discussion active */}
      <main className="flex-1 flex-col bg-white flex">
        {selectedConv ? (
          <>
            <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-white">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h2 className="font-semibold text-slate-800">
                Discussion avec l'Admin
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-slate-400 mt-8 text-xs">
                  Envoyez un message pour commencer la discussion avec le
                  support.
                </div>
              ) : (
                messages.map((msg: any) => {
                  // Vérification de la provenance du message (userId ou senderId selon votre API)
                  const isMe =
                    msg.userId === currentUser.id ||
                    msg.senderId === currentUser.id
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-xs ${
                          isMe
                            ? "bg-emerald-600 text-white rounded-tr-none"
                            : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                        }`}
                      >
                        <p className="break-words">{msg.content}</p>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-slate-100 bg-white flex gap-2"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Votre message..."
                className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-full text-sm font-medium transition"
              >
                Envoyer
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm bg-slate-50/30">
            Sélectionnez l'administrateur à gauche pour démarrer la discussion.
          </div>
        )}
      </main>
    </div>
  )
}

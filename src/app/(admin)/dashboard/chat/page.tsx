import ChatSidebar from "@/components/common/ChatSidebar"
import ChatWindow from "@/components/common/ChatWindow"

export default function ChatPage() {
  return (
    <div>
      <div className="flex flex-col h-130 bg-slate-50 text-slate-800 font-sans">
        {/* Zone principale */}
        <div className="flex flex-1 overflow-hidden">
          {/* Colonne Gauche : Liste des messages */}
          <aside className="w-full md:w-96 border-r border-slate-200 bg-white flex flex-col">
            <div className="p-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Messages</h1>
              <button className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-700 transition">
                <span className="text-xl font-bold">+</span>
              </button>
            </div>

            {/* Barre de recherche */}
            <div className="px-4 pb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher une conversation..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">
                  🔍
                </span>
              </div>
            </div>

            {/* Liste des discussions */}
            <ChatSidebar />
          </aside>

          {/* Colonne Droite : Fenêtre de discussion active */}
          <main className="hidden md:flex flex-1 flex-col bg-white">
            <ChatWindow />
          </main>
        </div>

        {/* Barre de navigation inférieure */}
      </div>
    </div>
  )
}

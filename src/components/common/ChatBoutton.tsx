interface NavItem {
  label: string
  icon: string
  active?: boolean
  count?: number
}

export default function ChatBoutton() {
  const navItems: NavItem[] = [
    { label: "Messages", icon: "💬", active: true },
    { label: "Notifications", icon: "🔔", count: 2 },
    { label: "Publish", icon: "➕" },
    { label: "Profile", icon: "👤" },
    { label: "Cart", icon: "🛒", count: 1 },
  ]

  return (
    <div className="bg-white border-t border-slate-200 py-2 px-6 flex justify-around items-center md:justify-center md:gap-16">
      {navItems.map((item, index) => (
        <button
          key={index}
          className="flex flex-col items-center gap-1 relative group"
        >
          <div className="relative text-xl">
            {item.icon}
            {item.count && (
              <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                {item.count}
              </span>
            )}
          </div>
          <span
            className={`text-[10px] md:text-xs font-medium ${
              item.active ? "text-slate-900 font-semibold" : "text-slate-400"
            }`}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  )
}

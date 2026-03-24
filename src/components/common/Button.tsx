interface ButtonProps {
  label: string
  icon?: React.ReactNode
  className?: string
  type?: "submit" | "button"
  onClick?: () => void
}

export default function Button(props: ButtonProps) {
  const { label, icon, className = "", type = "button", onClick } = props

  return (
    <button
      type={type}
      // Ajout de bg-[#E67E22] par défaut et text-white pour la lisibilité
      className={`py-3 px-6 lg:px-8 lg:py-4 bg-[#E67E22] font-text text-white rounded-full font-semibold transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 ${className}`}
      onClick={onClick}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{label}</span>
    </button>
  )
}

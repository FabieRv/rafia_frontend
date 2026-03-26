interface ButtonProps {
  label?: string // Mis en optionnel car tu peux utiliser children à la place
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
  type?: "submit" | "button"
  onClick?: () => void
}

export default function Button(props: ButtonProps) {
  // AJOUT de "children" ici dans la déstructuration
  const {
    label,
    icon,
    children,
    className = "",
    type = "button",
    onClick,
  } = props

  return (
    <button
      type={type}
      className={`py-3 px-6 lg:px-8 lg:py-4 bg-[#E67E22] font-text text-white rounded-full font-semibold transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${className}`}
      onClick={onClick}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
      {label && <span>{label}</span>}
    </button>
  )
}

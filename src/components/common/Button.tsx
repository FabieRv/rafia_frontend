import Link from "next/link"

interface ButtonProps {
  label?: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
  type?: "submit" | "button"
  onClick?: () => void
  href?: string
  disabled?: boolean
}

export default function Button(props: ButtonProps) {
  const {
    label,
    icon,
    children,
    className = "",
    type = "button",
    onClick,
    href,
    disabled = false,
  } = props

  const content = (
    <>
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
      {label && <span>{label}</span>}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center justify-center gap-2
        py-2 px-3 lg:px-8 lg:py-4
        bg-[#E67E22] font-text text-white rounded-full font-semibold
        transition-transform hover:scale-105 active:scale-95
        ${className}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-3 lg:px-6 lg:py-4
      bg-[#E67E22] font-text text-white rounded-full font-semibold
      transition-transform hover:scale-105 active:scale-95
      flex items-center justify-center gap-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}`}
    >
      {content}
    </button>
  )
}

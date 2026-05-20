import React from "react"

type TitleProps = {
  text: string
  size?: "h1" | "h2" | "h3"
  className?: string
}

function Title({ text, size = "h1", className = "" }: TitleProps) {
  const Tag = size

  return (
    <Tag
      className={` text-5xl text-[#4A3728]  text-center mb-4  font-title title ${className}  `}
    >
      {text}
    </Tag>
  )
}

export default Title

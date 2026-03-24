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
      className={` text-5xl text-[#7a4e2d]  text-center mb-4 title ${className}  `}
    >
      {text}
    </Tag>
  )
}

export default Title

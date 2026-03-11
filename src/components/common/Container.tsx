import React from "react"
interface ContainerProps {
  children: React.ReactNode
  tag?: "section" | "div" | "header" | "footer"
  className?: string
  id?: string
  ref?: React.Ref<HTMLDivElement> | null
}

export default function Container(props: ContainerProps) {
  const { children, tag = "section", className = "", id, ref } = props
  const Tag = tag
  return (
    <Tag
      id={id}
      ref={ref}
      className={`mx-auto w-full h-fit relative max-w-[1440px] px-5 md:px-7 lg:px-12 pt-12 lg:pt-20 xl:pt-24  ${className}`}
    >
      {children}
    </Tag>
  )
}

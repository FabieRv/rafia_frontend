import React from "react"
// import type { UseFormRegisterReturn } from "react-hook-form"

interface InputProps {
  type?: "text" | "password"
  name?: string
  placeholder: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  //   register: UseFormRegisterReturn
}

function Input(props: InputProps) {
  // register
  const { type = "text", placeholder, className = "" } = props
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        // {...register}
        className={` w-full px-3 py-2 lg:px-5 bg-white text-black outline-none ${className} `}
      />
    </div>
  )
}

export default Input

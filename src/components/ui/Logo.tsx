import Link from "next/link"

function Logo() {
  return (
    <div>
      <Link href="/">
        <h1 className="relative z-50 text-2xl font-title font-bold tracking-tight bg-gradient-to-r from-[#D4A373] via-[#8B5A2B] to-[#6B8E23] bg-clip-text text-transparent">
          RAFIACRAFT
        </h1>
      </Link>
    </div>
  )
}

export default Logo

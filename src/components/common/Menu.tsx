function MyMenu({
  isClicked,
  onClick,
}: {
  isClicked: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col cursor-pointer relative gap-2 w-[30px] lg:w-10  lg:hidden z-10 `}
    >
      <span
        className={`w-full bg-black h-0.5  transition duration-400 ${
          isClicked && "absolute rotate-45 top-1/2"
        }`}
      ></span>
      <span
        className={`w-full bg-black h-0.5  transition duration-400 ${
          isClicked && "absolute opacity-0 top-1/2"
        } `}
      ></span>
      <span
        className={`w-full bg-black h-0.5  transition duration-400 ${
          isClicked && "absolute -rotate-45 top-1/2 "
        }`}
      ></span>
    </div>
  )
}

export default MyMenu

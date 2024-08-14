import { useHandleOptionSelected } from '../hooks/useHandleOptionSelected'

interface IButton extends React.ComponentProps<'button'> {
  children: React.ReactNode
  index: number
}

export function ButtonOption({ children, index }: IButton) {
  const { handleClick } = useHandleOptionSelected()

  return (
    <button
      className="text-[#BAB0A3] text-2xl md:text-2xl border-0 text-left hover:text-[#DBA864] transition-colors duration-200 outline-none "
      key={index}
      value={index}
      onClick={handleClick}
    >
      <li className="list-none bg-no-repeat bg-[url('../pics/lista.webp')] bg-left pl-10">
        {children}
      </li>
    </button>
  )
}

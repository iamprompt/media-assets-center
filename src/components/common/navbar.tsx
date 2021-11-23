import { NextPage } from 'next'

type Props = {
  className?: string
}

const NavBar: NextPage<Props> = ({ className }) => {
  return (
    <nav className="h-11 bg-black sticky inset-0 z-[100]">
      <ul className={`text-white flex justify-between items-center h-full${className ? ` ${className}` : ``}`}>
        <div>
          <li>a</li>
        </div>
        <div>
          <li>a</li>
        </div>
      </ul>
    </nav>
  )
}

export default NavBar

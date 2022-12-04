import { NextPage } from 'next'
import Link from 'next/link'

type Props = {
  className?: string
}

const NavBar: NextPage<Props> = ({ className }) => {
  return (
    <nav className="h-14 bg-white/70 sticky inset-0 z-[100] filter backdrop-blur-md">
      <ul
        className={`text-black flex justify-between items-center h-full px-5 md:p-0${className ? ` ${className}` : ``}`}
      >
        <li>
          <Link href="/" className="font-bold hover:text-gray-500">
            Media Assets Center
          </Link>
        </li>
        <div>
          <li>
            <Link href="/" className="hover:text-gray-500">
              Search
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default NavBar

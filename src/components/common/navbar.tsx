import { NextPage } from 'next'
import Link from 'next/link'

type Props = {
  className?: string
}

const NavBar: NextPage<Props> = ({ className }) => {
  return (
    <nav className="h-11 bg-black/90 sticky inset-0 z-[100]">
      <ul
        className={`text-white flex justify-between items-center h-full px-5 md:p-0${className ? ` ${className}` : ``}`}
      >
        <div>
          <li className="font-bold">Apple TV Assets Center</li>
        </div>
        <div>
          <li>
            <Link href="/search" passHref={true}>
              <a className="font-semibold">Search</a>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default NavBar

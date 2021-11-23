import { NextComponentType } from 'next'
import NavBar from './navbar'

const Layout: NextComponentType = ({ children }) => {
  return (
    <div className="bg-[#f5f5f7]">
      <NavBar className="max-w-screen-lg mx-auto" />
      <main className="max-w-screen-lg mx-auto">{children}</main>
    </div>
  )
}

export default Layout

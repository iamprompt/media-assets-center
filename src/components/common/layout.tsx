import { ComponentProps, FC } from 'react'
import NavBar from './navbar'

const Layout: FC<ComponentProps<'main'>> = (props) => {
  return (
    <div>
      <NavBar className="max-w-screen-lg mx-auto" />
      <main className="max-w-screen-lg mx-auto" {...props} />
    </div>
  )
}

export default Layout

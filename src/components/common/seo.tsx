import { NextPage } from 'next'
import Head from 'next/head'

type Props = {
  title?: string
  description?: string
  image?: string
  children?: React.ReactNode
}

const SEO: NextPage<Props> = ({ children, title, description = 'The center of the Apple TV assets' }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Media Assets Center` : 'Media Assets Center'}</title>
        <meta name="description" content={description} />
      </Head>
      {children}
    </>
  )
}

export default SEO

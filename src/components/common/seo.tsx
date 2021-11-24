import { NextPage } from 'next'
import Head from 'next/head'

type Props = {
  title?: string
  description?: string
  image?: string
}

const SEO: NextPage<Props> = ({ children, title, description = 'The center of the Apple TV assets' }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Apple TV Assets Center` : 'Apple TV Assets Center'}</title>
        <meta name="description" content={description} />
      </Head>
      {children}
    </>
  )
}

export default SEO

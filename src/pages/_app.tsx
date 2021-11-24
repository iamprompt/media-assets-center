import '../styles/global.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import '../utils/axios.config'
import '../utils/dayjs.config'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return <Component {...pageProps} key={router.asPath} />
}

export default MyApp

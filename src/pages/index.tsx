import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/common/layout'
import SEO from '../components/common/seo'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/search')
  }, [])

  return (
    <SEO>
      <Layout>
        <div className="pt-5"></div>
      </Layout>
    </SEO>
  )
}

export default Home

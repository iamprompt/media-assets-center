import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/common/layout'
import SEO from '../components/common/seo'

type ErrorProps = {
  statusCode?: number
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  const router = useRouter()

  return (
    <Layout>
      <SEO title="Error" />
      <main className="text-center mt-10">
        <h1 className="font-bold text-5xl font-headline">ไม่พบหน้าที่คุณกำลังหา</h1>
        <div
          className="mt-10 text-blue-600 font-light hover:underline cursor-pointer text-lg"
          onClick={() => router.back()}
        >
          {'< กลับสู่หน้าก่อนหน้า'}
        </div>
      </main>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error

import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import Layout from '../components/common/layout'
import { APPLE_TV_API } from '../utils/helpers'
import Card from '../components/card'

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  // const { data } = await APPLE_TV_API.GET_MEDIA_INFO({ country: 'th', cId: 'umc.cmc.5983fipzqbicvrve6jdfep4x3' })
  console.log(query)

  if (query?.q && !Array.isArray(query.q)) {
    const {
      data: { data },
    } = await APPLE_TV_API.SEARCH_MEDIA({
      country: query?.country && !Array.isArray(query.country) ? query.country : 'th',
      query: query.q,
    })
    return { props: { data } }
  }

  return {
    props: {},
  }
}

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  // console.log(data)

  return (
    <Layout>
      <div className="pt-5">
        <div></div>
        {data && (
          <ul className="grid grid-cols-3 gap-5">
            {data.canvas.shelves[0].items.map((item) => (
              // @ts-expect-error
              <Card d={item} key={item.id} />
            ))}
          </ul>
        )}
      </div>
    </Layout>
  )
}

export default Home

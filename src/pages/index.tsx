import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Layout from '../components/common/layout'
import { APPLE_TV_API } from '../utils/helpers'
import Image from 'next/image'
import Card from '../components/card'
import { useState } from 'react'

export const getServerSideProps = async () => {
  // const { data } = await APPLE_TV_API.GET_MEDIA_INFO({ country: 'th', cId: 'umc.cmc.5983fipzqbicvrve6jdfep4x3' })
  const {
    data: { data },
  } = await APPLE_TV_API.SEARCH_MEDIA({ country: 'th', query: 'spider' })

  return {
    props: {
      data,
    },
  }
}

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  console.log(data)

  return (
    <Layout>
      <div className="pt-5">
        {/* <div className="relative">
          <div className="rounded-b-md w-screen-lg aspect-w-16 aspect-h-9">
            <Image
              src="https://is4-ssl.mzstatic.com/image/thumb/70JHxpPi5TNz66xHfiSAkg/3358x1889sr.jpg"
              className="rounded-b-md"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="absolute w-full z-[5] bottom-0 from-black/100 to-black/0 bg-gradient-to-t rounded-b-md h-20"></div>
        </div> */}
        <ul className="grid grid-cols-4 gap-5">
          {data.canvas.shelves[0].items.map((item) => (
            // @ts-expect-error
            <Card d={item} key={item.id} />
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default Home

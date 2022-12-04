import axios from 'axios'
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { ResponseProps } from '../../@types/api/common'
import { LandingItem, LandingResponse } from '../../@types/platforms/disney-plus/api/landing-response'
import Layout from '../../components/common/layout'
import SEO from '../../components/common/seo'
import { stringDefault } from '../../utils/helpers'

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const slug = stringDefault(query?.slug, 'home')
  const region = stringDefault(query?.region, 'SG')
  const locale = stringDefault(query?.locale, 'en-US')
  const label = stringDefault(query.label, '')

  try {
    const {
      data: { payload },
    } = await axios.get<ResponseProps<LandingResponse>>(`/api/disney-plus/slug/${slug}`, {
      params: {
        region: region,
        locale: locale,
      },
    })

    return { props: { data: payload, options: { region, locale, label } } }
  } catch (err) {
    console.log(err)
  }

  return { notFound: true }
}

const Home: NextPage<{ data: LandingResponse; options: { region: string; locale: string; label: string } }> = ({
  data,
  options,
}) => {
  const [landingItems, setLandingItems] = useState<LandingItem[]>(Object.values(data))

  return (
    <SEO>
      <Layout>
        <div className="pt-5 px-5 pb-10">
          <h1 className="font-bold text-4xl text-center mt-10">Disney+</h1>
          <div className="space-y-10 mt-10">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {landingItems.map((d) => {
                  return (
                    <Link
                      href={`/disney-plus/${d.type}/${d.encodedId}?region=${options.region}&locale=${options.locale}`}
                      key={d.encodedId}
                      className={`w-full relative rounded-xl shadow-md aspect-h-9 aspect-w-16`}
                    >
                      <img
                        className="rounded-xl object-cover"
                        src={`${d.image.url}/badging?width=800&aspectRatio=1.78&format=jpeg${
                          options.label || d.badging ? `&label=${options.label !== '' ? options.label : d.badging}` : ''
                        }`}
                        alt={d.name}
                      />
                      <div className="text-white w-full h-full absolute inset-0 z-10 from-black/80 to-black/0 bg-gradient-to-t rounded-xl bg-opacity-0 opacity-0 hover:bg-opacity-70 hover:opacity-100 transition-all group flex flex-col justify-end p-3">
                        <h1 className="font-bold font-headline text-right">{d.name}</h1>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </SEO>
  )
}

export default Home

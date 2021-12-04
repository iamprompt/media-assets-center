import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { ResponseProps } from '../../@types/api/common'
import { LandingItem, LandingResponse } from '../../@types/platforms/disney-plus/api/landing-response'
import Layout from '../../components/common/layout'
import SEO from '../../components/common/seo'

import Card from '../../components/platform/disney-plus/card'

const Home: NextPage = () => {
  const [landingItems, setLandingItems] = useState<LandingItem[]>([])

  useEffect(() => {
    console.log('disney-plus')
    const loadLanding = async () => {
      const {
        data: { payload },
      } = await axios.get<ResponseProps<LandingResponse>>('/api/disney-plus/home')

      setLandingItems(Object.values(payload))
    }

    loadLanding()
  }, [])

  return (
    <SEO>
      <Layout>
        <div className="pt-5 px-5 pb-10">
          <h1 className="font-bold text-4xl text-center mt-10">Disney+</h1>
          <div className="space-y-10 mt-10">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {landingItems.map((item) => {
                  return <Card d={item} key={item.encodedFamilyId} />
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

import type { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType, NextPage } from 'next'
import Layout from '../../components/common/layout'
import { APPLE_TV_API, getImageUrl } from '../../utils/helpers'
import Image from 'next/image'
import Card from '../../components/card'
import { AppleMediaResponse, ImageDetails } from '../../@types/atv-response-common'
import { ItemResponse } from '../../@types/atv-item-response'
import AssetCard from '../../components/assetcard'
import { ImageType } from '../../utils/constant/constant'
import REGIONS from '../../utils/constant/region'

export const getServerSideProps = async ({ params, query }: GetServerSidePropsContext) => {
  const id = query?.id && !Array.isArray(query.id) ? query.id : undefined
  const country = query?.country && !Array.isArray(query.country) ? query.country : 'TH'
  const locale =
    query?.locale && !Array.isArray(query.locale)
      ? query.locale
      : country
      ? Object.keys(REGIONS[country.toUpperCase()].langs)[0]
      : 'th-TH'

  if (id) {
    const {
      data: { data },
    } = await APPLE_TV_API.GET_MEDIA_INFO({
      country: query?.country && !Array.isArray(query.country) ? query.country : 'th',
      cId: id,
    })
    return { props: { data, country: country?.toUpperCase(), locale: locale } }
  }

  return {
    notFound: true,
  }
}

const ItemPage: NextPage<{
  data: ItemResponse
  country: string
  locale: string
}> = ({ data: { content, related }, country, locale }) => {
  // console.log(content)

  return (
    <Layout>
      <div>
        <div className="aspect-h-9 aspect-w-16 rounded-b-xl">
          <Image src={getImageUrl(content.images.coverArt16X9)} alt="" layout="fill" className="rounded-b-xl" />
        </div>

        <div className="px-5 mb-20">
          <h1 className="font-headline text-2xl font-bold mt-5 mb-3">Assets</h1>
          <ul className="space-y-10">
            {Object.entries(content.images).map((img) => (
              <AssetCard cId={content.id} d={img} key={img[0]} />
            ))}
          </ul>
          <div>
            <h1 className="font-headline text-2xl font-bold mt-5 mb-3">ที่เกี่ยวข้อง</h1>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.items.slice(0, 8).map((item) => (
                <Card d={item} key={item.id} layout="v" option={{ country, locale }} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ItemPage

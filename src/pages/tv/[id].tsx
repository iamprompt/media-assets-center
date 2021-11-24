import type { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType, NextPage } from 'next'
import Layout from '../../components/common/layout'
import { APPLE_TV_API, getImageUrl, stringDefault } from '../../utils/helpers'
import Image from 'next/image'
import Card from '../../components/card'
import AssetCard from '../../components/assetcard'
import REGIONS from '../../utils/constant/region'
import axios from 'axios'
import { ResponseProps } from '../../@types/api/common'
import { ProductResultResponse } from '../../@types/api/atv-product'
import dayjs from 'dayjs'

export const getServerSideProps = async ({ params, query }: GetServerSidePropsContext) => {
  const id = stringDefault(query?.id, '')
  const country = stringDefault(query?.country, 'TH')
  const locale = stringDefault(query?.locale, Object.keys(REGIONS[country.toUpperCase()].langs)[0])

  try {
    const {
      data: { payload },
    } = await axios.get<ResponseProps<ProductResultResponse>>('/api/product', {
      params: {
        cId: id,
        country: country,
        locale: locale,
      },
    })
    return { props: { data: payload, country: country, locale: locale } }
  } catch (err) {
    console.log(err)
  }
}

const ItemPage: NextPage<{
  data: ProductResultResponse
  country: string
  locale: string
}> = ({ data: { id, result }, country, locale }) => {
  return (
    <Layout>
      <div>
        <div className="aspect-h-9 aspect-w-16 rounded-b-xl">
          <Image src={getImageUrl(result.images.coverArt16X9)} alt="" layout="fill" className="rounded-b-xl" />
        </div>

        <div className="px-5 mb-20">
          <div className="mt-12 space-y-1">
            <h1 className="font-headline text-5xl font-bold mb-5">{result.title}</h1>
            {result.releaseDate && (
              <h2>วันวางจำหน่าย: {dayjs(result.releaseDate).format('dddd DD MMM BBBB HH:mm น.')}</h2>
            )}
            {result.duration && <h2>ความยาว: {dayjs.duration(result.duration * 1000).format('HH:mm:ss')}</h2>}
          </div>
          <div>
            <h1 className="font-headline text-2xl font-bold mt-5 mb-3">Assets</h1>
            <ul className="space-y-10">
              {Object.entries(result.images).map((img) => (
                <AssetCard cId={result.id} d={img} key={img[0]} />
              ))}
            </ul>
          </div>
          <div>
            <h1 className="font-headline text-2xl font-bold mt-5 mb-3">ที่เกี่ยวข้อง</h1>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {Object.entries(result.related || {})
                .slice(0, 8)
                .map(([id, item]) => (
                  // @ts-expect-error
                  <Card cId={id} d={item} key={id} layout="v" option={{ country, locale }} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ItemPage

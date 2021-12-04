import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Layout from '../../../components/common/layout'
import { stringDefault } from '../../../utils/helpers'
import axios from 'axios'
import { ResponseProps } from '../../../@types/api/common'
import dayjs from 'dayjs'

import SEO from '../../../components/common/seo'
import { DmcItem } from '../../../@types/platforms/disney-plus/DmcItem'
import { ImageType } from '../../../utils/platforms/disney-plus/constant'

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const id = stringDefault(query?.id, '')
  const region = stringDefault(query?.region, 'SG')
  const locale = stringDefault(query?.locale, 'en-US')
  const contentType = stringDefault(query?.contentType, '')

  if (id === '' || !['DmcVideo', 'DmcSeries'].includes(contentType)) return { notFound: true }

  try {
    const {
      data: { payload },
    } = await axios.get<ResponseProps<DmcItem>>(`/api/disney-plus/${contentType}/${id}`, {
      params: {
        region: region,
        locale: locale,
      },
    })
    return { props: { data: payload } }
  } catch (err) {
    console.log(err)
  }

  return { notFound: true }
}

const ItemPage: NextPage<{
  data: DmcItem
}> = ({ data }) => {
  const progType = data.type === 'DmcVideo' ? 'program' : 'series'

  // console.log(data)

  const downloadFile = async (url: string, fileName: string) => {
    const { data: blobData } = await axios.get(url, { responseType: 'blob' })
    const blobURL = URL.createObjectURL(blobData)
    const a = document.createElement('a')
    a.href = blobURL
    a.setAttribute('style', 'display: none')
    if (fileName) a.setAttribute('download', fileName)

    document.body.appendChild(a)
    a.click()
  }

  return (
    <SEO>
      <Layout>
        <div>
          <div className="aspect-h-9 aspect-w-16 rounded-b-xl">
            <img
              src={`${data.image.tile[1.78][progType].default.url}/scale?width=900`}
              alt={data.text.title.full[progType].default.content}
              className="rounded-b-xl object-cover"
            />
          </div>

          <div className="px-5 mb-20 space-y-10">
            <div className="mt-12 space-y-5">
              <h1 className="font-headline text-5xl font-bold">{data.text.title.full[progType].default.content}</h1>
              {(data.releases?.[0].releaseDate || data.mediaMetadata?.runtimeMillis) && (
                <div>
                  {data.releases[0].releaseDate && (
                    <h2>
                      <span className="font-bold">วันวางจำหน่าย:</span>{' '}
                      {dayjs(data.releases[0].releaseDate, 'YYYY-MM-DD').format('dddd DD MMM BBBB')}
                    </h2>
                  )}
                  {data.mediaMetadata?.runtimeMillis && (
                    <h2>
                      <span className="font-bold">ความยาว:</span>{' '}
                      {dayjs.duration(data.mediaMetadata.runtimeMillis).format('HH:mm:ss')}
                    </h2>
                  )}
                </div>
              )}
              {data.text.description.full[progType].default.content && (
                <h2>{data.text.description.full[progType].default.content}</h2>
              )}
            </div>
            <div>
              <h1 className="font-headline text-2xl font-bold mt-5 mb-5">Assets</h1>
              <div className="space-y-10">
                {Object.entries(data.image).map(([type, imgs]) => {
                  const k = type as keyof typeof ImageType
                  return (
                    <div key={type}>
                      <h2 className="font-bold text-xl mb-8">{ImageType[k]}</h2>
                      <ul className="space-y-10">
                        {Object.entries(imgs).map(([ratio, img]) => (
                          <li
                            key={`${type}_${ratio}`}
                            className={`w-full flex flex-col items-center md:items-start md:flex-row gap-4`}
                          >
                            <div className="w-full md:w-1/3">
                              <div>
                                <p className="font-headline font-medium text-lg">สัดส่วน {ratio}</p>
                                <p className="font-text">
                                  ขนาด {img[progType].default.masterWidth} x {img[progType].default.masterHeight} พิกเซล
                                </p>
                              </div>
                              <div className="mt-3 flex flex-row gap-5 flex-wrap">
                                <button
                                  onClick={() =>
                                    downloadFile(
                                      img[progType].default.url,
                                      `${data.text.title.slug[progType].default.content}-${type}_${ratio}.jpg`
                                    )
                                  }
                                  className="bg-green-600 py-2 px-3 rounded-full text-white"
                                >
                                  JPG
                                </button>
                                <button
                                  onClick={() =>
                                    downloadFile(
                                      img[progType].default.url,
                                      `${data.text.title.slug[progType].default.content}-${type}_${ratio}.png`
                                    )
                                  }
                                  className="bg-green-600 py-2 px-3 rounded-full text-white"
                                >
                                  PNG
                                </button>
                              </div>
                            </div>

                            <div className="col-span-1 md:col-span-2 rounded-xl w-full md:w-2/3 text-center">
                              <img
                                className="rounded-xl object-contain max-h-96 max-w-full mx-auto"
                                src={`${img[progType].default.url}/scale?width=640&aspectRatio=${ratio}&format=png`}
                                alt={`${type}_${ratio}`}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
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

export default ItemPage

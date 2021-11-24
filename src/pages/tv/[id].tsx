import type { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType, NextPage } from 'next'
import Layout from '../../components/common/layout'
import { APPLE_TV_API, getImageUrl, stringDefault } from '../../utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
import Card from '../../components/card'
import AssetCard from '../../components/assetcard'
import REGIONS from '../../utils/constant/region'
import axios from 'axios'
import { ResponseProps } from '../../@types/api/common'
import { ProductResultResponse } from '../../@types/api/atv-product'
import dayjs from 'dayjs'

import WatchOnAppleTVBadge from '../../assets/watch-on-apple-tv.svg'
import SEO from '../../components/common/seo'

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
    <SEO
      title={result.title}
      description={result.description}
      image={getImageUrl(result.images.coverArt16X9, { ext: 'jpg', width: 1920 })}
    >
      <Layout>
        <div>
          <div className="aspect-h-9 aspect-w-16 rounded-b-xl">
            <Image src={getImageUrl(result.images.coverArt16X9)} alt="" layout="fill" className="rounded-b-xl" />
          </div>

          <div className="px-5 mb-20 space-y-10">
            <div className="mt-12 space-y-5">
              <h1 className="font-headline text-5xl font-bold">{result.title}</h1>
              {(result.releaseDate || result.duration) && (
                <div>
                  {result.releaseDate && (
                    <h2>
                      <span className="font-bold">วันวางจำหน่าย:</span>{' '}
                      {dayjs(result.releaseDate).format('dddd DD MMM BBBB HH:mm น.')}
                    </h2>
                  )}
                  {result.duration && (
                    <h2>
                      <span className="font-bold">ความยาว:</span>{' '}
                      {dayjs.duration(result.duration * 1000).format('HH:mm:ss')}
                    </h2>
                  )}
                </div>
              )}
              {result.description && <h2>{result.description}</h2>}
              <Link href={result.url} passHref={true}>
                <a className="text-white py-2 px-5 bg-black hover:bg-gray-900 inline-flex items-center space-x-2 rounded-xl border-2 border-gray-300">
                  <div className="w-8 h-8">
                    <svg viewBox="0 0 630 630" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M346.076 0.00100135H283.02L196.74 0.00424381H193.386C186.991 0.00424381 180.598 0.00699088 174.205 0.0459906C167.877 0.0847402 161.552 0.158242 155.225 0.32849C141.381 0.501228 127.569 1.717 113.907 3.96546C100.249 6.30372 87.0159 10.666 74.6449 16.9084C49.7802 29.58 29.567 49.8003 16.9041 74.6694C10.6599 87.053 6.29719 100.299 3.95997 113.969C1.71461 127.632 0.500527 141.444 0.328002 155.288C0.157253 161.617 0.0842518 167.946 0.0457521 174.275C-0.000247474 181.79 0.00300405 189.304 0.00300405 196.819L0 283.132V345.964L0.00275371 432.278C0.00275371 439.793 -0.000498489 447.307 0.0450011 454.822C0.0835008 461.152 0.156503 467.48 0.327751 473.808C0.499739 487.659 1.71483 501.476 3.96272 515.144C6.29971 528.806 10.6602 542.044 16.9004 554.421C29.5619 579.291 49.7743 599.512 74.6386 612.185C87.0161 618.431 100.256 622.796 113.922 625.134C127.579 627.381 141.386 628.595 155.225 628.768C161.551 628.939 167.877 629.012 174.205 629.051C180.773 629.09 187.341 629.093 193.909 629.093H196.74L283.02 629.096H346.076L432.356 629.092H435.56C442.004 629.092 448.447 629.09 454.891 629.051C461.219 629.012 467.544 628.939 473.87 628.768C487.715 628.595 501.527 627.38 515.189 625.131C528.847 622.793 542.08 618.431 554.45 612.189C579.316 599.517 599.53 579.297 612.192 554.427C618.437 542.043 622.799 528.798 625.136 515.127C627.382 501.465 628.596 487.653 628.768 473.808C628.939 467.48 629.012 461.151 629.05 454.821C629.096 447.306 629.093 439.792 629.093 432.278L629.095 345.963V283.132L629.092 196.818C629.092 189.303 629.096 181.788 629.05 174.274C629.012 167.944 628.939 161.615 628.767 155.287C628.595 141.437 627.38 127.62 625.133 113.952C622.795 100.29 618.435 87.0517 612.195 74.6749C599.533 49.8051 579.321 29.5839 554.457 16.9111C542.079 10.6646 528.839 6.29991 515.173 3.96121C501.516 1.71494 487.71 0.500347 473.87 0.327739C467.545 0.156741 461.218 0.0840011 454.891 0.0452515C448.314 0.0052518 441.736 0.00274179 435.159 0.00274179H432.356L346.076 0L346.076 0.00100135Z"
                        fill="#C8C8C8"
                      />
                      <path
                        d="M345.373 14.0625L431.653 14.065H434.457L454.119 14.1073C460.369 14.1455 466.616 14.217 472.864 14.386C486.137 14.5492 499.38 15.7058 512.481 17.846C525.06 19.9968 537.249 24.0078 548.648 29.7471C571.392 41.3406 589.882 59.8385 601.465 82.5884C607.199 93.9871 611.207 106.175 613.357 118.752C615.499 131.864 616.656 145.118 616.818 158.402C616.988 164.652 617.06 170.901 617.097 177.152C617.14 184.145 617.14 191.138 617.139 198.131V199.627L617.142 285.941V348.775L617.14 435.09V436.48C617.14 443.508 617.14 450.536 617.097 457.566C617.059 463.817 616.987 470.068 616.819 476.316C616.656 489.595 615.5 502.844 613.36 515.951C611.21 528.535 607.201 540.73 601.463 552.135C589.879 574.885 571.388 593.382 548.643 604.974C537.25 610.71 525.068 614.719 512.495 616.87C499.39 619.012 486.142 620.17 472.864 620.333C466.616 620.502 460.368 620.573 454.12 620.612L434.857 620.653H431.652L345.373 620.657H282.318L196.037 620.654H193.207L173.572 620.612C167.322 620.573 161.075 620.502 154.826 620.333C141.553 620.17 128.311 619.013 115.21 616.873C102.631 614.722 90.4414 610.712 79.0428 604.973C56.2978 593.38 37.8081 574.882 26.225 552.132C20.4906 540.733 16.4829 528.545 14.3333 515.967C12.1916 502.855 11.0344 489.602 10.8716 476.317C10.7024 470.067 10.6306 463.817 10.5926 457.567C10.5501 450.545 10.5504 443.523 10.5506 436.501V435.091L10.5474 348.775V285.944L10.5496 199.629V198.233C10.5496 191.207 10.5496 184.181 10.5921 177.154C10.6301 170.903 10.7019 164.652 10.8706 158.404C11.034 145.125 12.1902 131.876 14.3293 118.769C16.4794 106.185 20.4891 93.9897 26.227 82.5847C37.8112 59.8354 56.3014 41.3385 79.0465 29.7461C90.4391 24.01 102.622 20.0007 115.194 17.8497C128.299 15.7073 141.547 14.5496 154.825 14.3862C161.073 14.2177 167.321 14.1458 173.57 14.1075L192.682 14.066H196.037L282.318 14.0625H345.374"
                        fill="url(#paint0_linear_592_46)"
                      />
                      <path
                        d="M181.403 242.11C180.985 235.782 181.833 229.434 183.896 223.437C185.959 217.439 189.196 211.913 193.419 207.181C201.931 197.292 213.937 191.078 226.926 189.84C227.874 203.014 223.67 216.042 215.199 226.177C211.168 231.25 206.022 235.326 200.161 238.089C194.301 240.853 187.882 242.229 181.403 242.11V242.11ZM243.776 310.389C243.896 301.707 246.205 293.195 250.49 285.643C254.775 278.091 260.897 271.743 268.288 267.187C263.567 260.492 257.367 254.974 250.169 251.06C242.972 247.147 234.97 244.943 226.783 244.62C208.117 243.509 192.249 255.214 183.335 255.214C174.422 255.214 160.768 245.181 146.005 245.452C136.403 245.696 127.032 248.447 118.823 253.434C110.614 258.42 103.853 265.468 99.2115 273.877C79.1571 308.443 93.9205 359.715 113.422 387.868C122.892 401.795 134.307 417.128 149.347 416.579C163.555 416.023 169.127 407.379 186.4 407.379C203.659 407.379 208.675 416.579 223.718 416.301C239.318 416.024 249.07 402.365 258.539 388.426C265.256 378.551 270.508 367.756 274.132 356.377C265.17 352.463 257.534 346.037 252.147 337.876C246.76 329.715 243.852 320.168 243.776 310.389V310.389ZM505.865 256.087L466.435 383.581H465.679L426.248 256.087H392.976L449.193 414.735H482.617L538.534 256.087H505.865ZM345.647 218.204H314.149V256.064H290.827V281.052H314.149V373.271C314.149 403.862 326.414 415.975 357.912 415.975C363.948 416.039 369.978 415.583 375.935 414.61V389.473C372.316 389.921 368.676 390.175 365.029 390.232C351.705 390.232 345.647 383.87 345.647 370.092V281.052H376.084V256.064H345.647V218.204Z"
                        fill="#F9F9F9"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_592_46"
                          x1="313.845"
                          y1="616.029"
                          x2="313.845"
                          y2="14.2055"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#111111" />
                          <stop offset="1" stopColor="#333333" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="text-2xl select-none">
                    <span className="text-sm font-light">ดูได้ทาง</span> Apple TV
                  </div>
                </a>
              </Link>
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
              <h1 className="font-headline text-2xl font-bold mt-5 mb-3">ตัวอย่าง</h1>
              <div className="inline-block w-full aspect-h-9 aspect-w-16 mt-3">
                <iframe
                  src={`https://embed.tv.apple.com/${country}/movie/${result.id}?countryCode=${country}`}
                  frameBorder="0"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                  allow="autoplay *; encrypted-media *;"
                  className="rounded-xl bg-transparent"
                ></iframe>
              </div>
            </div>
            <div>
              <h1 className="font-headline text-2xl font-bold mb-3">ที่เกี่ยวข้อง</h1>
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
    </SEO>
  )
}

export default ItemPage

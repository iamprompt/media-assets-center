import axios from 'axios'
import { NextPage } from 'next'
import { ImageDetails } from '../@types/atv-response-common'
import { ImageType } from '../utils/constant/constant'
import { getImageUrl } from '../utils/platforms/apple-tv'

const AssetCard: NextPage<{ d: [string, ImageDetails]; cId: string }> = ({ d: [key, img], cId }) => {
  const k = key as keyof typeof ImageType

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
    <li className={`w-full flex flex-col items-center md:items-start md:flex-row gap-4`}>
      <div className="w-full md:w-1/3">
        <div>
          <p className="font-headline font-medium text-lg">{ImageType[k]}</p>
          <p className="font-text">
            ขนาด {img.width} x {img.height} พิกเซล
          </p>
        </div>
        <div className="mt-3 flex flex-row gap-5 flex-wrap">
          <button
            onClick={() => downloadFile(getImageUrl(img, { ext: 'jpg' }), `${cId}-${key}.jpg`)}
            className="bg-green-600 py-2 px-3 rounded-full text-white"
          >
            JPG
          </button>
          <button
            onClick={() => downloadFile(getImageUrl(img, { ext: 'png' }), `${cId}-${key}.png`)}
            className="bg-green-600 py-2 px-3 rounded-full text-white"
          >
            PNG
          </button>
          {img.supportsLayeredImage && (
            <button
              onClick={() => downloadFile(getImageUrl(img, { ext: 'lsr' }), `${cId}-${key}.zip`)}
              className="bg-green-600 py-2 px-3 rounded-full text-white"
            >
              LSR
            </button>
          )}
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 rounded-xl w-full md:w-2/3 text-center">
        <img
          className="rounded-xl object-contain max-h-96 max-w-full mx-auto"
          src={getImageUrl(img, { ext: 'webp', width: 640 })}
          alt={key}
        />
      </div>
    </li>
  )
}

export default AssetCard

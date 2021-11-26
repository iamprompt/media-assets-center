import { saveAs } from 'file-saver'
import { NextPage } from 'next'
import { ImageDetails } from '../../@types/atv-response-common'
import { ImageType } from '../../utils/apple-tv/constant'
import { getImageUrl } from '../../utils/apple-tv/helpers'

const AssetCard: NextPage<{ d: [string, ImageDetails]; cId: string }> = ({ d: [key, img], cId }) => {
  const k = key as keyof typeof ImageType

  return (
    <li className={`w-full max-h-96 flex flex-col items-center md:items-start md:flex-row gap-4`}>
      <div className="w-full md:w-1/3">
        <div>
          <p className="font-headline font-medium text-lg">{ImageType[k]}</p>
          <p className="font-text">
            ขนาด {img.width} x {img.height} พิกเซล
          </p>
        </div>
        <div className="mt-3 flex flex-row gap-5 flex-wrap">
          <button
            className="bg-green-600 py-2 px-3 rounded-full text-white"
            onClick={() => saveAs(getImageUrl(img, { ext: 'jpg' }), `${cId}-${key}.jpg`)}
          >
            JPG
          </button>
          <button
            className="bg-green-600 py-2 px-3 rounded-full text-white"
            onClick={() => saveAs(getImageUrl(img, { ext: 'png' }), `${cId}-${key}.png`)}
          >
            PNG
          </button>
          {img.supportsLayeredImage && (
            <button
              className="bg-green-600 py-2 px-3 rounded-full text-white"
              onClick={() => saveAs(getImageUrl(img, { ext: 'lsr' }), `${cId}-${key}.zip`)}
            >
              LSR
            </button>
          )}
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 flex justify-center max-h-64 w-full md:h-full md:w-2/3">
        <img className="object-contain" src={getImageUrl(img, { ext: 'webp', width: 640 })} alt={key} />
      </div>
    </li>
  )
}

export default AssetCard

import { saveAs } from 'file-saver'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ImageDetails } from '../@types/atv-response-common'
import { ShelfItem, TMovie } from '../@types/atv-search-response'
import { ImageType } from '../utils/constant'
import { getImageUrl } from '../utils/helpers'

const AssetCard: NextPage<{ d: [string, ImageDetails]; cId: string }> = ({ d: [key, img], cId }) => {
  const k = key as keyof typeof ImageType

  return (
    <li className={`w-full h-96 grid grid-cols-3`}>
      <div className="col-span-1">
        <div>
          <p className="font-headline font-medium text-lg">{ImageType[k]}</p>
          <p className="font-text">
            ขนาด {img.width} x {img.height} พิกเซล
          </p>
        </div>
        <div className="mt-3 flex gap-3 flex-wrap">
          <button
            className="bg-green-600 py-2 px-3 rounded-full text-white"
            onClick={() => saveAs(getImageUrl(img, { ext: 'jpg' }), `${cId}-${key}.jpg`)}
          >
            ดาวน์โหลด
          </button>

          {img.supportsLayeredImage && (
            <button
              className="bg-green-600 py-2 px-3 rounded-full text-white"
              onClick={() => saveAs(getImageUrl(img, { ext: 'lsr' }), `${cId}-${key}.zip`)}
            >
              ดาวน์โหลดเลเยอร์
            </button>
          )}
        </div>
      </div>

      <div className="relative col-span-2 flex">
        <Image
          className="rounded-xl"
          src={getImageUrl(img, { ext: 'webp', width: 640 })}
          alt={key}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </li>
  )
}

export default AssetCard
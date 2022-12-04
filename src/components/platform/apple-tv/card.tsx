import { NextPage } from 'next'
import Link from 'next/link'
import { SearchItem } from '../../../@types/platforms/apple-tv/api/atv-search'
import { getImageUrl } from '../../../utils/platforms/apple-tv/helpers'

type Props = {
  cId: string
  d: SearchItem
  layout?: 'h' | 'v'
  option?: { locale?: string; country?: string }
}

const Card: NextPage<Props> = ({ cId, d, layout = 'h', option: { locale = 'th-TH', country = 'TH' } = {} }) => {
  const imagePath = layout === 'h' ? d.images.shelfImage : d.images.transitionImage

  return (
    <Link
      href={`/apple-tv/detail/${cId}?country=${country}&locale=${locale}`}
      className={`w-full relative rounded-xl shadow-md ${
        layout === 'h' ? `aspect-h-9 aspect-w-16` : `aspect-w-2 aspect-h-3`
      }`}
    >
      <img
        className="rounded-xl object-cover"
        src={
          imagePath
            ? getImageUrl(imagePath, {
                ext: 'webp',
                width: 640,
              })
            : ''
        }
        alt={cId}
      />
      <div className="text-white w-full h-full absolute inset-0 z-10 from-black/80 to-black/0 bg-gradient-to-t rounded-xl bg-opacity-0 opacity-0 hover:bg-opacity-70 hover:opacity-100 transition-all group flex flex-col justify-end p-3">
        {/* <div className="absolute inset-0 m-3">
            <div className="bg-red-900 inline-block text-sm px-3 py-1 rounded-full">{d.type}</div>
          </div> */}
        <h1 className="font-bold font-headline text-right">{d.title}</h1>
      </div>
    </Link>
  )
}

export default Card

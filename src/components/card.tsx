import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { TMovie } from '../@types/atv-search-response'
import { getImageUrl } from '../utils/helpers'

const Card: NextPage<{ d: TMovie; layout?: 'h' | 'v'; option?: { locale?: string; country?: string } }> = ({
  d,
  layout = 'h',
  option: { locale = 'th-TH', country = 'TH' } = {},
}) => {
  return (
    <Link href={`/tv/${d.id}?country=${country}&locale=${locale}`} passHref={true}>
      <a
        className={`w-full relative rounded-xl shadow-md ${
          layout === 'h' ? `aspect-h-9 aspect-w-16` : `aspect-w-2 aspect-h-3`
        }`}
      >
        <Image
          className="rounded-xl"
          src={getImageUrl(layout === 'h' ? d.images.coverArt16X9 : d.images.coverArt, { ext: 'webp', width: 640 })}
          alt={d.id}
          layout="fill"
          blurDataURL={getImageUrl(layout === 'h' ? d.images.coverArt16X9 : d.images.coverArt, {
            ext: 'jpg',
            width: 100,
          })}
          placeholder="blur"
        />
        <div className="text-white w-full h-full absolute inset-0 z-10 from-black/80 to-black/0 bg-gradient-to-t rounded-xl bg-opacity-0 opacity-0 hover:bg-opacity-70 hover:opacity-100 transition-all group flex flex-col justify-end p-3">
          <div className="absolute inset-0 m-3">
            <div className="bg-red-900 inline-block text-sm px-3 py-1 rounded-full">{d.type}</div>
          </div>
          <h1 className="font-bold font-headline text-right">{d.title}</h1>
        </div>
      </a>
    </Link>
  )
}

export default Card

import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ShelfItem, TMovie } from '../@types/atv-search-response'
import { getImageUrl } from '../utils/helpers'

const Card: NextPage<{ d: TMovie; layout?: 'h' | 'v' }> = ({ d, layout = 'h' }) => {
  return (
    <li
      className={`w-full relative rounded-xl shadow-md ${
        layout === 'h' ? `aspect-h-9 aspect-w-16` : `aspect-w-2 aspect-h-3`
      }`}
    >
      <Link href={`/tv/${d.id}`} passHref={true}>
        <a>
          <div className="text-white w-full h-full absolute inset-0 z-10 from-black/80 to-black/0 bg-gradient-to-t rounded-xl bg-opacity-0 opacity-0 hover:bg-opacity-70 hover:opacity-100 transition-all group flex flex-col justify-end p-3">
            <div className="absolute inset-0 m-3">
              <div className="bg-red-900 inline-block text-sm px-3 py-1 rounded-full">{d.type}</div>
            </div>
            <h1 className="font-bold font-headline text-right">{d.title}</h1>
          </div>

          <Image
            className="rounded-xl"
            src={getImageUrl(layout === 'h' ? d.images.coverArt16X9 : d.images.coverArt, { ext: 'webp', width: 640 })}
            alt={d.id}
            layout="fill"
          />
        </a>
      </Link>
    </li>
  )
}

export default Card
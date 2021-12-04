import { NextPage } from 'next'
import { LandingItem } from '../../../@types/platforms/disney-plus/api/landing-response'

type Props = {
  d: LandingItem
}

const Card: NextPage<Props> = ({ d }) => {
  return (
    // <Link href={`/apple-tv/detail/${cId}?country=${country}&locale=${locale}`} passHref={true}>
    <a className={`w-full relative rounded-xl shadow-md aspect-h-9 aspect-w-16`}>
      <img
        className="rounded-xl object-cover"
        src={`${d.image.url}/badging?width=800&aspectRatio=1.78&format=jpeg&label=disneyplusoriginal`}
        alt={d.name}
      />
      <div className="text-white w-full h-full absolute inset-0 z-10 from-black/80 to-black/0 bg-gradient-to-t rounded-xl bg-opacity-0 opacity-0 hover:bg-opacity-70 hover:opacity-100 transition-all group flex flex-col justify-end p-3">
        <h1 className="font-bold font-headline text-right">{d.name}</h1>
      </div>
    </a>
    // </Link>
  )
}

export default Card

import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SearchResultResponse } from '../../../@types/platforms/apple-tv/api/atv-search'
import { ResponseProps } from '../../../@types/api/common'
import { APPLE_TV_API } from '../../../utils/platforms/apple-tv/helpers'

const SearchAPI = async (req: NextApiRequest, res: NextApiResponse<ResponseProps<SearchResultResponse | string>>) => {
  const {
    query: { country, query, locale },
  } = req

  console.log(country, query, locale)
  const {
    data: {
      data: {
        q,
        canvas: { shelves },
      },
    },
  } = await APPLE_TV_API.SEARCH_MEDIA({
    country: (country as string) || 'th',
    query: query as string,
    locale: (locale as string) || 'th-TH',
  })

  const payload: SearchResultResponse = {
    q,
    result: {},
  }

  for (const shelf of shelves) {
    if (!['uts.col.search.MV', 'uts.col.search.SH'].includes(shelf.id)) continue

    payload.result[shelf.id] = {
      title: shelf.title,
      items: {},
    }

    for (const item of shelf.items) {
      payload.result[shelf.id].items[item.id] = {
        title: item.title,
        type: item.type,
        description: item.description,
        releaseDate: item.releaseDate,
        duration: item.duration,
        images: {},
      }

      for (const [type, image] of Object.entries(item.images)) {
        if (!image.width && !image.height) continue
        payload.result[shelf.id].items[item.id].images[type] = {
          width: image.width,
          height: image.height,
          url: image.url,
          supportsLayeredImage: image.supportsLayeredImage,
        }
      }
    }
  }

  return res.status(200).json({ success: true, payload })
}

export default SearchAPI

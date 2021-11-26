import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SearchResultResponse } from '../../../@types/api/atv-search'
import { ResponseProps } from '../../../@types/api/common'
import { APPLE_TV_API } from '../../../utils/apple-tv/helpers'
import { HOTSTAR_API } from '../../../utils/disneyplus-hotstar/helpers'

const SearchAPI = async (req: NextApiRequest, res: NextApiResponse<ResponseProps<SearchResultResponse | string>>) => {
  const {
    query: { country, query, size, offset },
  } = req

  try {
    const { data } = await HOTSTAR_API.SEARCH_MEDIA({
      country: (country as string) || 'th',
      query: query as string,
      size: parseInt(size as string) || 100,
      offset: parseInt(offset as string) || 0,
    })

    console.log(data)

    // const payload: SearchResultResponse = {
    //   q,
    //   result: {},
    // }

    // for (const shelf of shelves) {
    //   if (!['uts.col.search.MV', 'uts.col.search.SH'].includes(shelf.id)) continue

    //   payload.result[shelf.id] = {
    //     title: shelf.title,
    //     items: {},
    //   }

    //   for (const item of shelf.items) {
    //     payload.result[shelf.id].items[item.id] = {
    //       title: item.title,
    //       type: item.type,
    //       description: item.description,
    //       releaseDate: item.releaseDate,
    //       duration: item.duration,
    //       images: {},
    //     }

    //     for (const [type, image] of Object.entries(item.images)) {
    //       if (!image.width && !image.height) continue
    //       payload.result[shelf.id].items[item.id].images[type] = {
    //         width: image.width,
    //         height: image.height,
    //         url: image.url,
    //         supportsLayeredImage: image.supportsLayeredImage,
    //       }
    //     }
    //   }
    // }

    res.status(200).json({ success: true, payload: data })
  } catch (err) {
    if (axios.isAxiosError(err)) res.status(err?.response?.status || 400).json({ success: false, payload: err.message })
  }
}

export default SearchAPI

import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ProductResultResponse } from '../../../@types/platforms/apple-tv/api/atv-product'
import { ResponseProps } from '../../../@types/api/common'
import { ImagesFormat } from '../../../utils/api/helpers'
import { APPLE_TV_API } from '../../../utils/platforms/apple-tv/helpers'

const ProductAPI = async (req: NextApiRequest, res: NextApiResponse<ResponseProps<ProductResultResponse | string>>) => {
  const {
    query: { country, cId, locale },
  } = req

  // console.log(country, cId, locale)

  if (Array.isArray(cId) || Array.isArray(country) || Array.isArray(locale))
    return res.status(400).json({ success: false, payload: 'Invalid query' })

  try {
    const {
      data: {
        data: { content, related, roles, trailers },
      },
    } = await APPLE_TV_API.GET_MEDIA_INFO({
      cId: cId,
      country: country || 'th',
      locale: locale || 'th-TH',
    })

    // console.log(content, related, roles, trailers)

    const payload: ProductResultResponse = {
      id: cId,
      result: {
        id: content.id,
        type: content.type,
        title: content.title,
        description: content.description,
        releaseDate: content.releaseDate,
        images: ImagesFormat(content.images),
        duration: content.duration,
        url: content.url,
      },
    }

    if (roles) {
      for (const role of roles) {
        if (!payload.result.roles) payload.result.roles = []
        payload.result.roles.push({
          type: role.type,
          roleTitle: role.roleTitle,
          characterName: role.characterName,
          images: ImagesFormat(role.images),
          personName: role.personName,
          personId: role.personId,
          url: role.url,
        })
      }
    }

    if (related) {
      for (const relatedItem of related.items) {
        if (!payload.result.related) payload.result.related = {}
        payload.result.related[relatedItem.id] = {
          title: relatedItem.title,
          images: ImagesFormat(relatedItem.images, ['coverArt', 'coverArt16X9']),
        }
      }
    }

    // if (trailers) {
    //   for (const trailer of trailers) {
    //     if (!payload.result.trailers) payload.result.trailers = []
    //     payload.result.trailers.push({
    //       title: trailer.title,
    //       hlsUrl: trailer.assets.hlsUrl,
    //       duration: trailer.duration,
    //     })
    //   }
    // }

    // console.log(payload)

    res.status(200).json({ success: true, payload })
  } catch (err) {
    if (axios.isAxiosError(err)) res.status(err?.response?.status || 400).json({ success: false, payload: err.message })
  }
}

export default ProductAPI

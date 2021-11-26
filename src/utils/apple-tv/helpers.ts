import axios from 'axios'
import { AppleMediaResponse, ImageDetails } from '../../@types/atv-response-common'
import { APPLE_MEDIA_BASE_URL, APPLE_TV_API_ENDPOINTS } from './constant'

export const APPLE_MEDIA_INSTANCE = axios.create({
  baseURL: APPLE_MEDIA_BASE_URL,
})

type Options = {
  country?: string
  locale?: string
}

export const APPLE_TV_API = {
  SEARCH_MEDIA: ({
    country = 'th',
    query,
    entityShow = '',
    locale = 'th-TH',
  }: Options & { query: string; entityShow?: string }) =>
    APPLE_MEDIA_INSTANCE.get<AppleMediaResponse<'searchTV'>>(APPLE_TV_API_ENDPOINTS.SEARCH_MEDIA(country), {
      params: {
        q: query,
        locale: locale,
        entityShow: entityShow,
      },
    }),
  GET_MEDIA_INFO: ({ country = 'th', cId, locale = 'th-TH' }: Options & { cId: string }) =>
    APPLE_MEDIA_INSTANCE.get<AppleMediaResponse<'getTV'>>(`${APPLE_TV_API_ENDPOINTS.GET_MEDIA_INFO(country)}/${cId}`, {
      params: {
        locale: locale,
      },
    }),
}

type ImageOption = {
  ext?: string
  width?: number
  height?: number
}

export const getImageUrl = (img: ImageDetails, { ext = 'jpg', width, height }: ImageOption = {}) => {
  const ratio = img.width / img.height
  if (width) height = Math.round(width / ratio)
  if (height) width = Math.round(height * ratio)

  return img.url
    .replace('{w}', `${width ? width : img.width}`)
    .replace('{h}', `${height ? height : img.height}`)
    .replace('{c}', '')
    .replace('{f}', `${ext}`)
}

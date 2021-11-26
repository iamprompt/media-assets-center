import axios from 'axios'
import { HOTSTAR_API_ENDPOINTS, HOTSTAR_BASE_URL } from './constant'

export const HOTSTAR_INSTANCE = axios.create({
  baseURL: HOTSTAR_BASE_URL,
})

type Options = {
  country?: string
  size?: number
  offset?: number
}

export const HOTSTAR_API = {
  SEARCH_MEDIA: ({ country = 'th', query, size = 100, offset = 0 }: Options & { query: string }) =>
    HOTSTAR_INSTANCE.get(HOTSTAR_API_ENDPOINTS.SEARCH_MEDIA, {
      params: {
        q: query,
        size,
        offset,
      },
      headers: {
        'x-country-code': country,
        'x-client-code': 'LR',
        'x-platform-code': 'PCTV',
      },
    }),
  // GET_MEDIA_INFO: ({ country = 'th', cId, locale = 'th-TH' }: Options & { cId: string }) =>
  //   APPLE_MEDIA_INSTANCE.get<AppleMediaResponse<'getTV'>>(`${APPLE_TV_API_ENDPOINTS.GET_MEDIA_INFO(country)}/${cId}`, {
  //     params: {
  //       locale: locale,
  //     },
  //   }),
}

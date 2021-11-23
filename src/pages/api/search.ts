import type { NextApiRequest, NextApiResponse } from 'next'
import { SearchResponse } from '../../@types/atv-search-response'
import { APPLE_TV_API } from '../../utils/helpers'

const SearchAPI = async (req: NextApiRequest, res: NextApiResponse<SearchResponse>) => {
  const {
    query: { country, query, locale },
  } = req

  const {
    data: { data: response },
  } = await APPLE_TV_API.SEARCH_MEDIA({
    country: (country as string) || 'th',
    query: query as string,
    locale: (locale as string) || 'th-TH',
  })
  res.status(200).json(response)
}

export default SearchAPI
